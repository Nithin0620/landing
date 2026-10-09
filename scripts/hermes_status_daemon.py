#!/usr/bin/env python3
"""
Hermes Live Status & System Telemetry Bridge Daemon
Zero LLM Cost - pushes lightweight system stats and agent context to Cloudflare KV.
"""

import os
import sys
import time
import json
import argparse
import subprocess
from datetime import datetime, timezone
import psutil
import requests

CPU_HISTORY_SIZE = 10
cpu_history = []

def get_system_uptime():
    """Returns human-readable system uptime."""
    boot_time = psutil.boot_time()
    uptime_seconds = int(time.time() - boot_time)
    days = uptime_seconds // 86400
    hours = (uptime_seconds % 86400) // 3600
    mins = (uptime_seconds % 3600) // 60
    if days > 0:
        return f"{days}d {hours}h"
    return f"{hours}h {mins}m"

def get_battery_info():
    """Returns battery percentage and charging status."""
    battery = psutil.sensors_battery()
    if battery is None:
        return {"battery": 100, "is_charging": True}
    return {
        "battery": round(battery.percent),
        "is_charging": battery.power_plugged if battery.power_plugged is not None else True
    }

def get_media_info():
    """Detects currently playing media via playerctl if available."""
    try:
        title = subprocess.check_output(
            ["playerctl", "metadata", "title"],
            stderr=subprocess.DEVNULL,
            timeout=1
        ).decode().strip()
        artist = subprocess.check_output(
            ["playerctl", "metadata", "artist"],
            stderr=subprocess.DEVNULL,
            timeout=1
        ).decode().strip()
        if title:
            return f"{title} - {artist}" if artist else title
    except Exception:
        pass
    return None

def get_git_context():
    """Detects current working git project & branch."""
    try:
        branch = subprocess.check_output(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            stderr=subprocess.DEVNULL,
            timeout=1
        ).decode().strip()
        repo = os.path.basename(os.getcwd())
        return {"project": repo, "branch": branch}
    except Exception:
        return {"project": "Workspace", "branch": "main"}

def get_hermes_status():
    """
    Reads active task from local Hermes status file (~/.hermes/status.json or ./hermes_task.json),
    environment variables, or active workspace context.
    """
    # 1. Check local status file
    status_paths = [
        os.path.expanduser("~/.hermes/status.json"),
        os.path.abspath("hermes_task.json"),
    ]
    for path in status_paths:
        if os.path.exists(path):
            try:
                with open(path, "r") as f:
                    data = json.load(f)
                    return data.get("task"), data.get("category", "Development"), data.get("agent_model", "Hermes 3")
            except Exception:
                pass

    # 2. Check environment variables
    env_task = os.environ.get("HERMES_CURRENT_TASK")
    if env_task:
        return env_task, os.environ.get("HERMES_CATEGORY", "Development"), "Hermes"

    # 3. Default workspace context
    git_info = get_git_context()
    return f"Active on {git_info['project']} ({git_info['branch']})", "Coding", "Hermes 3 / Local"

def collect_telemetry(custom_task=None, custom_category=None):
    """Gathers all telemetry and state into a single JSON object."""
    global cpu_history
    
    # 1. CPU
    cpu_percent = psutil.cpu_percent(interval=0.5)
    cpu_history.append(round(cpu_percent, 1))
    if len(cpu_history) > CPU_HISTORY_SIZE:
        cpu_history.pop(0)

    # 2. RAM
    mem = psutil.virtual_memory()
    ram_used_gb = round(mem.used / (1024 ** 3), 1)
    ram_total_gb = round(mem.total / (1024 ** 3), 1)

    # 3. Battery & Uptime
    battery_info = get_battery_info()
    uptime = get_system_uptime()

    # 4. Context & Media
    git_info = get_git_context()
    media = get_media_info()

    # 5. Hermes Task
    task_desc, category, agent_model = get_hermes_status()
    if custom_task:
        task_desc = custom_task
    if custom_category:
        category = custom_category

    payload = {
        "task": task_desc,
        "category": category,
        "state": "active",
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "hardware": {
            "cpu_percent": cpu_percent,
            "cpu_history": cpu_history if len(cpu_history) >= 2 else [cpu_percent, cpu_percent],
            "ram_used_gb": ram_used_gb,
            "ram_total_gb": ram_total_gb,
            "battery": battery_info["battery"],
            "is_charging": battery_info["is_charging"],
            "uptime": uptime
        },
        "agent": {
            "name": "Hermes",
            "model": agent_model,
            "tasks_today": 6
        },
        "context": {
            "project": git_info["project"],
            "branch": git_info["branch"],
            "music": media or "Focus Flow"
        }
    }
    return payload

def load_dotenv():
    """Auto-loads environment variables from .env files if present."""
    env_paths = [
        os.path.join(os.path.dirname(__file__), ".env"),
        os.path.join(os.path.dirname(__file__), "..", ".env"),
        os.path.expanduser("~/.hermes/.env")
    ]
    for p in env_paths:
        if os.path.exists(p):
            try:
                with open(p, "r") as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith("#") and "=" in line:
                            k, v = line.split("=", 1)
                            if k.strip() not in os.environ:
                                os.environ[k.strip()] = v.strip().strip("'\"")
            except Exception:
                pass

DEFAULT_ENDPOINT = "https://landing-live-status.nithin30302.workers.dev"
DEFAULT_AUTH_SECRET = "hermes_secret_landing_2026"

def main():
    load_dotenv()
    parser = argparse.ArgumentParser(description="Hermes Live Status & Telemetry Daemon")
    parser.add_argument("--dry-run", action="store_true", help="Print telemetry without sending")
    parser.add_argument("--interval", type=int, default=30, help="Push interval in seconds (default: 30)")
    parser.add_argument("--task", type=str, default=None, help="Override current task description")
    parser.add_argument("--category", type=str, default=None, help="Override category (e.g., Frontend, AI, Research)")
    parser.add_argument("--endpoint", type=str, default=os.environ.get("CLOUDFLARE_WORKER_URL", DEFAULT_ENDPOINT), help="Cloudflare Worker endpoint URL")
    parser.add_argument("--token", type=str, default=os.environ.get("AUTH_SECRET", DEFAULT_AUTH_SECRET), help="Bearer authentication token")
    args = parser.parse_args()

    print(f"🚀 Hermes Status Daemon started (Interval: {args.interval}s)")
    if args.dry_run:
        print("🔍 Running in DRY-RUN mode (no HTTP requests sent)")

    try:
        while True:
            payload = collect_telemetry(custom_task=args.task, custom_category=args.category)

            if args.dry_run:
                print("\n[Telemetry Snapshot]:")
                print(json.dumps(payload, indent=2))
                time.sleep(args.interval)
                continue

            if not args.endpoint:
                print("⚠️ No endpoint provided. Set CLOUDFLARE_WORKER_URL or pass --endpoint. Printing payload:")
                print(json.dumps(payload, indent=2))
                time.sleep(args.interval)
                continue

            url = f"{args.endpoint.rstrip('/')}/api/status"
            headers = {"Content-Type": "application/json"}
            if args.token:
                headers["Authorization"] = f"Bearer {args.token}"

            try:
                resp = requests.put(url, json=payload, headers=headers, timeout=5)
                if resp.status_code == 200:
                    print(f"[{datetime.now().strftime('%H:%M:%S')}] ✅ Status synced: {payload['task'][:40]}... (CPU: {payload['hardware']['cpu_percent']}%)")
                else:
                    print(f"[{datetime.now().strftime('%H:%M:%S')}] ❌ Sync failed: HTTP {resp.status_code} - {resp.text}")
            except Exception as e:
                print(f"[{datetime.now().strftime('%H:%M:%S')}] ⚠️ Network error: {e}")

            time.sleep(args.interval)

    except KeyboardInterrupt:
        print("\n👋 Daemon stopped.")

if __name__ == "__main__":
    main()
