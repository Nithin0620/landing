import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ExternalLink,
  Play,
  Star,
  GitFork,
  Layers,
  Cpu,
  ChevronRight,
  Loader2,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import ArchitectureDiagram, { KIND_COLORS, KIND_LABELS } from './ArchitectureDiagram';

const REPO_TTL = 6 * 60 * 60 * 1000;

function parseRepo(url) {
  try {
    const parts = new URL(url).pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1] };
  } catch {
    return null;
  }
}

function initials(title) {
  return title
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function Stat({ label, value, accent }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">{label}</div>
      <div
        className={`mt-1 font-mono text-[13px] font-bold ${accent ? 'text-neon' : 'text-white'}`}
      >
        {value}
      </div>
    </div>
  );
}

const PREVIEW_WIDTH = 1440;
const PREVIEW_HEIGHT = 810;

function Preview({ project, showIframe, onLoadIframe, maximized, onToggleMaximize }) {
  const accent = project.accent || '#6FFF00';
  const viewportRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const updateScale = () => {
      if (el.clientWidth > 0) setScale(el.clientWidth / PREVIEW_WIDTH);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/15">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-rose-400/70" />
        <span className="h-2 w-2 rounded-full bg-amber-400/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        <span className="ml-2 flex-1 truncate rounded-md border border-white/10 bg-[#020617]/60 px-2 py-0.5 font-mono text-[10px] text-white/50">
          {project.subdomain}
        </span>
        <button
          type="button"
          onClick={onToggleMaximize}
          aria-label={maximized ? 'Restore preview' : 'Maximize preview'}
          className="flex h-6 items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 font-mono text-[9px] uppercase tracking-wider text-white/60 transition-colors duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white"
        >
          {maximized ? (
            <Minimize2 className="h-3 w-3" />
          ) : (
            <Maximize2 className="h-3 w-3" />
          )}
          <span className="hidden sm:inline">{maximized ? 'Restore' : 'Expand'}</span>
        </button>
        <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          live
        </span>
      </div>

      <div ref={viewportRef} className="relative aspect-video overflow-hidden">
        <div
          className="grid-bg absolute inset-0"
          style={{
            background: `radial-gradient(circle at 25% 15%, ${accent}33, transparent 55%), linear-gradient(135deg, #0b1226, #050a1c)`,
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <span
            className="font-grotesk text-6xl uppercase leading-none"
            style={{ color: `${accent}55` }}
          >
            {initials(project.title)}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            {project.category}
          </span>
        </div>

        {!imageFailed && (
          <img
            src={project.screenshot || `/screenshots/${project.id}.jpg`}
            alt={`${project.title} screenshot`}
            loading="lazy"
            draggable={false}
            onError={() => setImageFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        )}

        {showIframe ? (
          <iframe
            src={project.url}
            title={`${project.title} live preview`}
            loading="lazy"
            referrerPolicy="no-referrer"
            style={{
              width: PREVIEW_WIDTH,
              height: PREVIEW_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
            className="absolute left-0 top-0 border-0 bg-white"
          />
        ) : (
          <button
            type="button"
            onClick={onLoadIframe}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#020617]/40 transition-colors duration-200 hover:bg-[#020617]/20"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-200 group-hover:scale-110 group-hover:border-neon group-hover:bg-neon group-hover:text-black">
              <Play className="h-5 w-5 translate-x-[1px]" fill="currentColor" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
              Load live preview
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function Expandable({ open, onClose, maxWidth, scroll = false, children }) {
  const [rendered, setRendered] = useState(open);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (open) {
      setRendered(true);
      setLeaving(false);
      return;
    }

    if (!rendered) return;
    setLeaving(true);
    const timer = setTimeout(() => {
      setRendered(false);
      setLeaving(false);
    }, 220);
    return () => clearTimeout(timer);
  }, [open, rendered]);

  const expanded = rendered;

  const wrapperClasses = expanded
    ? `focus-overlay fixed inset-0 z-[110] flex items-center justify-center bg-[#010828]/95 p-3 backdrop-blur-md sm:p-6 ${
        leaving
          ? 'animate-[overlayOut_200ms_ease-in_forwards]'
          : 'animate-[overlayIn_200ms_ease-out_forwards]'
      }`
    : '';

  const innerClasses = expanded
    ? `focus-panel ${scroll ? 'max-h-[88vh] overflow-y-auto' : ''} w-full ${
        leaving
          ? 'animate-[panelOut_200ms_ease-in_forwards]'
          : 'animate-[panelIn_200ms_ease-out_forwards]'
      }`
    : '';

  return (
    <div
      className={wrapperClasses}
      onClick={
        expanded
          ? (event) => {
              if (event.target === event.currentTarget) onClose();
            }
          : undefined
      }
    >
      <div
        className={innerClasses}
        style={expanded ? { maxWidth } : undefined}
        onClick={expanded ? (event) => event.stopPropagation() : undefined}
      >
        {children}
      </div>
    </div>
  );
}

export default function CaseStudyCockpit({ project, onClose }) {
  const [tab, setTab] = useState('overview');
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [highlightTech, setHighlightTech] = useState(null);
  const [showIframe, setShowIframe] = useState(false);
  const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);
  const [isArchitectureMaximized, setIsArchitectureMaximized] = useState(false);
  const [repoStats, setRepoStats] = useState(null);
  const [repoError, setRepoError] = useState(false);
  const closeRef = useRef(null);

  const nodes = project.architecture.layers.flatMap((layer) => layer.nodes);
  const activeNode = nodes.find((node) => node.id === activeNodeId) || null;
  const accent = project.accent || '#6FFF00';

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      if (isPreviewMaximized) {
        setIsPreviewMaximized(false);
        return;
      }
      if (isArchitectureMaximized) {
        setIsArchitectureMaximized(false);
        return;
      }
      onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, isPreviewMaximized, isArchitectureMaximized]);

  useEffect(() => {
    setRepoStats(null);
    setRepoError(false);

    if (!project.repo) return;
    const parsed = parseRepo(project.repo);
    if (!parsed) return;

    const cacheKey = `ghstats:${parsed.owner}/${parsed.repo}`;
    try {
      const raw = localStorage.getItem(cacheKey);
      if (raw) {
        const { at, data } = JSON.parse(raw);
        if (Date.now() - at < REPO_TTL) {
          setRepoStats(data);
          return;
        }
      }
    } catch {
      /* ignore cache errors */
    }

    let cancelled = false;

    const load = async () => {
      try {
        const [repoRes, langRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`),
          fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/languages`),
        ]);

        if (!repoRes.ok) throw new Error('GitHub request failed');
        const repoData = await repoRes.json();
        const langData = langRes.ok ? await langRes.json() : {};
        const language =
          Object.entries(langData).sort((a, b) => b[1] - a[1])[0]?.[0] || repoData.language;

        const data = {
          stars: repoData.stargazers_count ?? 0,
          forks: repoData.forks_count ?? 0,
          language: language || 'Code',
        };

        if (!cancelled) setRepoStats(data);
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), data }));
        } catch {
          /* ignore quota errors */
        }
      } catch {
        if (!cancelled) setRepoError(true);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [project.repo]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'stack', label: 'Stack' },
  ];

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-5">
      <div
        className="absolute inset-0 bg-[#010828]/85 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cockpit-title"
        className="animate-slideUpFade relative flex max-h-[95vh] w-full max-w-[1360px] flex-col overflow-hidden rounded-[26px] border border-white/15 bg-[#050a1c] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
      >
        <div
          className="pointer-events-none absolute -top-32 left-1/3 h-64 w-[28rem] rounded-full opacity-20 blur-3xl"
          style={{ background: accent }}
        />

        {/* Header */}
        <header className="relative z-10 flex flex-wrap items-start justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neon">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              <span className="truncate">{project.category}</span>
            </div>
            <h2
              id="cockpit-title"
              className="mt-1 font-grotesk text-2xl uppercase leading-tight text-white sm:text-3xl"
            >
              {project.title}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-white/50">
              <span className="text-neon/70">{project.subdomain}</span>
              <span className="text-emerald-300">● {project.status}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-neon/40 bg-neon/10 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-neon transition-colors duration-200 hover:bg-neon hover:text-black sm:px-4"
            >
              Open live
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Body */}
        <div className="relative z-10 overflow-y-auto">
          <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-6">
            {/* Left: tabbed content */}
            <div className="min-w-0">
              <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
                {tabs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setTab(item.id);
                      setActiveNodeId(null);
                      setHighlightTech(null);
                    }}
                    className={`rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors duration-200 sm:text-[11px] ${
                      tab === item.id
                        ? 'bg-neon text-black'
                        : 'text-white/55 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {tab === 'overview' && (
                <div className="space-y-4">
                  <Expandable
                    open={isPreviewMaximized}
                    onClose={() => setIsPreviewMaximized(false)}
                    maxWidth="min(94vw, calc(82vh * 16 / 9))"
                  >
                    <Preview
                      project={project}
                      showIframe={showIframe}
                      onLoadIframe={() => setShowIframe(true)}
                      maximized={isPreviewMaximized}
                      onToggleMaximize={() => setIsPreviewMaximized((value) => !value)}
                    />
                  </Expandable>

                  <p className="font-mono text-[12px] leading-relaxed text-white/80 sm:text-[13px]">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    <Stat label="Status" value={project.status} accent />
                    <Stat label="Stack" value={`${project.stack.length} tools`} />
                    <Stat label="Services" value={`${nodes.length} nodes`} />
                    {project.repo ? (
                      <Stat
                        label="Stars"
                        value={
                          repoStats ? repoStats.stars : repoError ? 'n/a' : '…'
                        }
                      />
                    ) : (
                      <Stat label="Access" value="Live" />
                    )}
                  </div>

                  {project.repo && (
                    <div className="flex flex-wrap items-center gap-2">
                      {repoError ? (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                          GitHub stats unavailable
                        </span>
                      ) : repoStats ? (
                        <>
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-white/70">
                            <Star className="h-3 w-3 text-amber-300" />
                            {repoStats.stars}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-white/70">
                            <GitFork className="h-3 w-3 text-cyan-300" />
                            {repoStats.forks}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-white/70">
                            <Cpu className="h-3 w-3 text-neon" />
                            {repoStats.language}
                          </span>
                        </>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Loading GitHub stats
                        </span>
                      )}
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-neon/80 transition-colors hover:text-neon"
                      >
                        Repository
                        <ChevronRight className="h-3 w-3" />
                      </a>
                    </div>
                  )}

                  <p className="font-mono text-[10px] leading-relaxed text-white/35">
                    Live previews can be blocked by sites that set frame protections — use “Open
                    live” if the panel stays blank.
                  </p>
                </div>
              )}

              {tab === 'challenges' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    <Layers className="h-3.5 w-3.5 text-neon" />
                    Hover a challenge to trace it in the architecture
                  </div>
                  {nodes.map((node) => {
                    const color = KIND_COLORS[node.kind] || KIND_COLORS.external;
                    const isActive = activeNodeId === node.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onMouseEnter={() => setActiveNodeId(node.id)}
                        onMouseLeave={() => setActiveNodeId(null)}
                        onFocus={() => setActiveNodeId(node.id)}
                        onBlur={() => setActiveNodeId(null)}
                        className={`block w-full rounded-2xl border p-3.5 text-left transition-all duration-200 ${
                          isActive
                            ? 'border-white/30 bg-white/[0.06]'
                            : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                            {node.label}
                          </span>
                          <span
                            className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
                            style={{ borderColor: `${color}66`, color }}
                          >
                            {node.tech}
                          </span>
                        </div>
                        <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-white/60">
                          {node.detail}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}

              {tab === 'stack' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    <Cpu className="h-3.5 w-3.5 text-neon" />
                    Hover a technology to highlight where it lives
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => {
                      const related = nodes.filter(
                        (node) => String(node.tech).toLowerCase() === tech.toLowerCase()
                      );
                      const isActive =
                        highlightTech?.toLowerCase() === tech.toLowerCase() ||
                        activeNode?.tech?.toLowerCase() === tech.toLowerCase();

                      return (
                        <button
                          key={tech}
                          type="button"
                          onMouseEnter={() => setHighlightTech(tech)}
                          onMouseLeave={() => setHighlightTech(null)}
                          onFocus={() => setHighlightTech(tech)}
                          onBlur={() => setHighlightTech(null)}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all duration-200 ${
                            isActive
                              ? 'border-neon bg-neon text-black'
                              : 'border-white/15 bg-white/5 text-white/70 hover:border-white/35 hover:text-white'
                          }`}
                        >
                          {tech}
                          {related.length > 0 && (
                            <span
                              className={`rounded-full px-1.5 text-[9px] ${
                                isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-white/50'
                              }`}
                            >
                              {related.length}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <p className="font-mono text-[10px] leading-relaxed text-white/35">
                    A count means the technology appears as a node in the architecture map.
                  </p>
                </div>
              )}
            </div>

            {/* Right: always-visible architecture */}
            <div className="min-w-0 lg:sticky lg:top-0 lg:self-start">
              <Expandable
                open={isArchitectureMaximized}
                onClose={() => setIsArchitectureMaximized(false)}
                maxWidth="min(94vw, 1100px)"
                scroll
              >
                <div
                  className={`rounded-2xl border border-white/12 p-3.5 sm:p-4 ${
                    isArchitectureMaximized ? 'bg-[#050a1c]' : 'bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-neon">
                        System Architecture
                      </div>
                      <div className="font-grotesk text-lg uppercase leading-tight text-white">
                        Live map
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/50">
                        {nodes.length} nodes
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsArchitectureMaximized((value) => !value)}
                        aria-label={
                          isArchitectureMaximized
                            ? 'Restore architecture'
                            : 'Maximize architecture'
                        }
                        className="flex h-7 items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 font-mono text-[9px] uppercase tracking-wider text-white/60 transition-colors duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white"
                      >
                        {isArchitectureMaximized ? (
                          <Minimize2 className="h-3 w-3" />
                        ) : (
                          <Maximize2 className="h-3 w-3" />
                        )}
                        <span className="hidden sm:inline">
                          {isArchitectureMaximized ? 'Restore' : 'Expand'}
                        </span>
                      </button>
                    </div>
                  </div>

                <div className="grid-bg relative mt-3 overflow-x-auto rounded-xl border border-white/10 bg-[#020617]/50 p-1.5">
                  <ArchitectureDiagram
                    architecture={project.architecture}
                    activeNodeId={activeNodeId}
                    highlightTech={highlightTech}
                    onHoverNode={setActiveNodeId}
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
                  {KIND_LABELS.map((item) => (
                    <span
                      key={item.kind}
                      className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-white/40"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: KIND_COLORS[item.kind] }}
                      />
                      {item.label}
                    </span>
                  ))}
                </div>

                <div className="mt-3 min-h-[92px] rounded-xl border border-white/10 bg-[#020617]/60 p-3">
                  {activeNode ? (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                          {activeNode.label}
                        </span>
                        <span
                          className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
                          style={{
                            borderColor: `${KIND_COLORS[activeNode.kind] || '#94a3b8'}66`,
                            color: KIND_COLORS[activeNode.kind] || '#94a3b8',
                          }}
                        >
                          {activeNode.tech}
                        </span>
                      </div>
                      <p className="mt-1.5 font-mono text-[10.5px] leading-relaxed text-white/60">
                        {activeNode.detail}
                      </p>
                    </>
                  ) : (
                    <p className="font-mono text-[10.5px] leading-relaxed text-white/35">
                      Hover a node, a challenge, or a tech chip to trace how the system fits
                      together.
                    </p>
                  )}
                </div>
                </div>
              </Expandable>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
