import React, { useState, useEffect, useRef } from 'react';
import { 
  MailIcon, 
  TwitterIcon, 
  GithubIcon, 
  ChevronRightIcon 
} from './components/Icons';

export default function App() {
  const heroVideoRef = useRef(null);
  const fixedBgVideoRef = useRef(null);
  const ctaVideoRef = useRef(null);
  const [copiedSsh, setCopiedSsh] = useState(false);

  useEffect(() => {
    const playVideos = async () => {
      const vids = [heroVideoRef.current, fixedBgVideoRef.current, ctaVideoRef.current];
      for (const v of vids) {
        if (v) {
          try {
            v.defaultMuted = true;
            v.muted = true;
            await v.play();
          } catch (err) {
            console.warn('Video autoplay deferred:', err);
          }
        }
      }
    };
    playVideos();
  }, []);

  const handleCopySsh = () => {
    navigator.clipboard.writeText('ssh guest@ssh.net.in');
    setCopiedSsh(true);
    setTimeout(() => setCopiedSsh(false), 2500);
  };

  // 1. Primary Services / Subdomains
  const services = [
    {
      id: 'personal',
      title: 'Nithin Personal',
      category: 'Profile & Bio',
      subdomain: 'me.ssh.net.in',
      url: 'https://me.ssh.net.in',
      status: 'Online',
      statusColor: 'bg-emerald-400',
      description: 'Personal portfolio, engineering background, career logs, and featured technical writings.',
      badge: 'Primary Hub'
    },
    {
      id: 'wtc',
      title: 'WTC Project',
      category: 'Flagship Platform',
      subdomain: 'wtc.ssh.net.in',
      url: 'https://wtc.ssh.net.in',
      status: 'Active',
      statusColor: 'bg-emerald-400',
      description: 'Dedicated web portal and production deployment for the WTC application ecosystem.',
      badge: 'Production'
    },
    {
      id: 'infra',
      title: 'Infra & Metrics',
      category: 'Cloud Services',
      subdomain: 'status.ssh.net.in',
      url: 'https://status.ssh.net.in',
      status: 'Operational',
      statusColor: 'bg-emerald-400',
      description: 'Edge routing, uptime telemetry, DNS analytics, and global Cloudflare edge status.',
      badge: 'Live Status'
    }
  ];

  // 2. Featured Projects
  const projects = [
    {
      id: 1,
      title: 'Cloudflare Edge Proxy',
      category: 'Network & DevOps',
      description: 'Dynamic subdomain router with automated SSL termination and geo-distributed caching layer.',
      tags: ['Cloudflare', 'DNS', 'Workers', 'SSL'],
      badge: 'v1.4',
      link: 'https://github.com'
    },
    {
      id: 2,
      title: 'WTC Core Engine',
      category: 'Full-Stack Web',
      description: 'High throughput application backend designed with modular microservices and event queues.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
      badge: 'Core',
      link: 'https://github.com'
    },
    {
      id: 3,
      title: 'CLI Developer Tooling',
      category: 'Command Line',
      description: 'Lightweight command line utilities for instant remote diagnostics and SSH configuration management.',
      tags: ['Go', 'Bash', 'SSH', 'Linux'],
      badge: 'Open Source',
      link: 'https://github.com'
    }
  ];

  // 3. Lab / Experiments & Playground
  const labExperiments = [
    {
      id: 'exp-1',
      title: 'Shader & Canvas Sandbox',
      tag: 'WebGL / UI',
      desc: 'Interactive generative space visualizer and liquid glass distortion shaders.',
      status: 'Experimental',
      statusBadge: 'text-amber-300 bg-amber-400/10 border-amber-400/20'
    },
    {
      id: 'exp-2',
      title: 'Micro REST / Graph Gateways',
      tag: 'APIs & Backend',
      desc: 'Edge-rendered serverless functions for real-time latency ping and telemetry probes.',
      status: 'In Development',
      statusBadge: 'text-sky-300 bg-sky-400/10 border-sky-400/20'
    },
    {
      id: 'exp-3',
      title: 'Automated Tunnel Daemons',
      tag: 'Networking',
      desc: 'Zero-trust tunneling scripts prepared for future homelab and node ingestion.',
      status: 'Prototype',
      statusBadge: 'text-purple-300 bg-purple-400/10 border-purple-400/20'
    },
    {
      id: 'exp-4',
      title: 'Terminal Web Emulator',
      tag: 'Interactive CLI',
      desc: 'Browser-based SSH terminal emulator allowing visitors to browse projects via CLI.',
      status: 'Beta Preview',
      statusBadge: 'text-neon bg-neon/10 border-neon/20'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#010828] text-cream selection:bg-neon selection:text-black">
      {/* 
        ========================================================================
        STATIONARY PARALLAX VIDEO BACKGROUND FOR SCREENS 2, 3, AND 4
        Hardware-accelerated fixed layer with zero-cost repaints
        ========================================================================
      */}
      <div 
        className="fixed inset-0 pointer-events-none overflow-hidden" 
        style={{ transform: 'translateZ(0)', zIndex: 0 }}
      >
        <video
          ref={fixedBgVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-80"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4"
        />
        {/* Subtle Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#010828]/50 via-transparent to-[#010828]/70" />
      </div>

      {/* SECTION 1: HERO (Independent video covering hero section with rounded bottom) */}
      <section className="relative w-full min-h-screen rounded-b-[32px] overflow-hidden flex flex-col justify-between z-10 bg-[#010828]">
        {/* Hero Background Video */}
        <video
          ref={heroVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover -z-10 pointer-events-none"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4"
        />

        {/* Top Header */}
        <header className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 sm:pt-10 flex items-center justify-between z-20">
          {/* Hostname Brand */}
          <a href="#" className="flex items-center space-x-2 group">
            <span className="w-2.5 h-2.5 rounded-full bg-neon animate-pulse" />
            <span className="font-grotesk text-[18px] sm:text-[20px] uppercase tracking-wider text-cream group-hover:text-neon transition-colors duration-300">
              ssh.net.in
            </span>
          </a>

          {/* Navigation Bar */}
          <nav className="hidden lg:block liquid-glass rounded-[28px] px-[48px] py-[20px]">
            <ul className="flex items-center space-x-10">
              {[
                { name: 'Services', href: '#services' },
                { name: 'Projects', href: '#projects' },
                { name: 'Lab & Sandbox', href: '#lab' },
                { name: 'Connect', href: '#links' }
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="font-grotesk text-[13px] uppercase tracking-wider text-cream hover:text-neon transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Top-Right Social Icons */}
          <div className="hidden lg:flex flex-col space-y-3">
            <a
              href="mailto:contact@ssh.net.in"
              className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-cream hover:bg-white/10 hover:text-neon transition-colors duration-200"
              aria-label="Email"
              title="Email"
            >
              <MailIcon className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-cream hover:bg-white/10 hover:text-neon transition-colors duration-200"
              aria-label="GitHub"
              title="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-cream hover:bg-white/10 hover:text-neon transition-colors duration-200"
              aria-label="Twitter / X"
              title="Twitter / X"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
          </div>

          <div className="lg:hidden w-6" />
        </header>

        {/* Hero Content */}
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16 my-auto py-16 sm:py-24 z-10 flex flex-col justify-center">
          <div className="relative max-w-[880px] lg:ml-24">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-neon animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-cream/80">
                Root Domain & Portal
              </span>
            </div>

            <h1 className="font-grotesk text-[42px] sm:text-[64px] md:text-[80px] lg:text-[96px] uppercase leading-[1.02] text-cream tracking-tight">
              NITHIN'S<br />
              INTERNET
            </h1>

            {/* Cursive Accent */}
            <span className="font-condiment text-neon absolute right-2 sm:right-12 md:right-24 bottom-[4.5rem] sm:bottom-[3.5rem] text-[28px] sm:text-[42px] md:text-[54px] lg:text-[62px] -rotate-2 mix-blend-exclusion opacity-95 pointer-events-none select-none">
              ssh.net.in
            </span>

            {/* Sub-tagline */}
            <p className="font-mono text-[14px] sm:text-[18px] uppercase tracking-widest text-cream/90 mt-4">
              Projects <span className="text-neon">·</span> Infrastructure <span className="text-neon">·</span> Experiments
            </p>

            {/* Interactive Terminal Quick-SSH Box */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-[480px]">
              <div 
                onClick={handleCopySsh}
                className="liquid-glass rounded-[16px] px-4 py-3 flex items-center justify-between border border-white/10 hover:border-neon/40 cursor-pointer transition-colors duration-200 group flex-1"
                title="Click to copy command"
              >
                <div className="flex items-center space-x-2 font-mono text-[13px] sm:text-[14px] text-cream">
                  <span className="text-neon">$</span>
                  <span>ssh guest@ssh.net.in</span>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-neon group-hover:underline ml-3 whitespace-nowrap">
                  {copiedSsh ? 'Copied! ✓' : 'Copy'}
                </span>
              </div>

              <a 
                href="#services"
                className="liquid-glass rounded-[16px] px-6 py-3 flex items-center justify-center font-grotesk text-[14px] uppercase tracking-wider text-cream hover:bg-neon hover:text-black transition-colors duration-200 whitespace-nowrap"
              >
                Explore Nodes ↓
              </a>
            </div>
          </div>

          {/* Mobile Social Icons */}
          <div className="flex lg:hidden items-center justify-center space-x-4 mt-12 sm:mt-16">
            <a
              href="mailto:contact@ssh.net.in"
              className="liquid-glass w-[52px] h-[52px] rounded-[1rem] flex items-center justify-center text-cream hover:bg-white/10 hover:text-neon transition-colors duration-200"
              aria-label="Email"
            >
              <MailIcon className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass w-[52px] h-[52px] rounded-[1rem] flex items-center justify-center text-cream hover:bg-white/10 hover:text-neon transition-colors duration-200"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass w-[52px] h-[52px] rounded-[1rem] flex items-center justify-center text-cream hover:bg-white/10 hover:text-neon transition-colors duration-200"
              aria-label="Twitter"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="h-6 sm:h-10" />
      </section>

      {/* 
        ========================================================================
        SCROLLABLE SECTIONS 2, 3, AND 4 (Scrolls seamlessly over fixed background)
        ========================================================================
      */}
      <div className="relative z-10">
        {/* SECTION 2: 🟢 ACTIVE SERVICES & SUBDOMAINS */}
        <section id="services" className="relative w-full py-24 sm:py-32 lg:py-36">
          <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16 relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-18">
              <div>
                <div className="flex items-center space-x-2 text-neon font-mono text-xs uppercase tracking-widest mb-3">
                  <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                  <span>Primary Subdomains</span>
                </div>
                <h2 className="font-grotesk text-[36px] sm:text-[48px] md:text-[58px] lg:text-[68px] uppercase leading-tight text-cream">
                  Hosted Services
                </h2>
              </div>

              <div className="font-mono text-[13px] sm:text-[14px] uppercase text-cream/90 max-w-[340px] leading-relaxed">
                Access active production subdomains and dedicated services deployed on the network.
              </div>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="liquid-glass rounded-[32px] p-7 sm:p-9 flex flex-col justify-between hover:bg-white/10 transition-colors duration-200 group"
                >
                  <div>
                    {/* Top Bar: Subdomain & Status */}
                    <div className="flex items-center justify-between pb-6 border-b border-white/10">
                      <span className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-neon font-semibold">
                        {srv.subdomain}
                      </span>
                      <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                        <span className={`w-2 h-2 rounded-full ${srv.statusColor} animate-pulse`} />
                        <span className="font-mono text-[11px] text-emerald-300 uppercase tracking-wider font-medium">{srv.status}</span>
                      </div>
                    </div>

                    {/* Title & Category */}
                    <div className="pt-7">
                      <span className="font-mono text-xs uppercase tracking-widest text-neon/90 block mb-1.5 font-medium">
                        {srv.category}
                      </span>
                      <h3 className="font-grotesk text-[28px] sm:text-[32px] uppercase text-cream group-hover:text-neon transition-colors duration-200">
                        {srv.title}
                      </h3>
                      <p className="font-mono text-[13px] sm:text-[14px] text-cream/90 mt-3.5 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase text-cream/70 tracking-wider">
                      {srv.badge}
                    </span>
                    <a
                      href={srv.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-[48px] h-[48px] rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-105 transition-transform duration-200 text-white"
                      aria-label={`Open ${srv.title}`}
                    >
                      <ChevronRightIcon className="w-5 h-5 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: 🚀 PROJECTS */}
        <section id="projects" className="relative w-full py-24 sm:py-32 lg:py-36 border-t border-white/10">
          <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16 relative">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20">
              <div>
                <h2 className="font-grotesk text-[36px] sm:text-[48px] md:text-[58px] lg:text-[68px] uppercase leading-tight text-cream">
                  Featured
                </h2>
                <div className="flex items-center ml-8 sm:ml-16 md:ml-24 lg:ml-32 mt-[-4px] sm:mt-[-8px]">
                  <span className="font-condiment text-neon text-[38px] sm:text-[50px] md:text-[62px] lg:text-[72px] mr-3 -rotate-1 select-none">
                    Code
                  </span>
                  <span className="font-grotesk text-[36px] sm:text-[48px] md:text-[58px] lg:text-[68px] uppercase text-cream">
                    Projects
                  </span>
                </div>
              </div>

              {/* SEE ALL PROJECTS button */}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex flex-col self-start md:self-end cursor-pointer group"
              >
                <div className="flex items-center space-x-2 sm:space-x-3 text-cream group-hover:text-neon transition-colors duration-200">
                  <span className="font-grotesk text-[32px] sm:text-[44px] md:text-[52px] lg:text-[60px] leading-none">
                    SEE
                  </span>
                  <div className="flex flex-col font-grotesk text-[20px] sm:text-[26px] md:text-[30px] lg:text-[36px] leading-[0.9]">
                    <span>ALL</span>
                    <span>PROJECTS</span>
                  </div>
                </div>
                <div className="w-full h-[6px] sm:h-[8px] lg:h-[10px] bg-neon mt-2 rounded-full" />
              </a>
            </div>

            {/* Projects Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="liquid-glass rounded-[32px] p-7 sm:p-8 hover:bg-white/10 transition-colors duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-neon uppercase tracking-wider font-medium">
                        {proj.category}
                      </span>
                      <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-white/10 border border-white/15 text-cream/90">
                        {proj.badge}
                      </span>
                    </div>

                    <h3 className="font-grotesk text-[26px] sm:text-[30px] uppercase text-cream group-hover:text-neon transition-colors duration-200">
                      {proj.title}
                    </h3>

                    <p className="font-mono text-[13px] sm:text-[14px] text-cream/85 mt-3.5 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] px-3 py-1 rounded-full bg-white/10 border border-white/15 text-cream/90"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Link Bar */}
                  <div className="liquid-glass rounded-[20px] px-5 py-3.5 mt-8 flex items-center justify-between border border-white/10">
                    <span className="font-mono text-[12px] text-cream/80 uppercase tracking-wider">
                      Repository
                    </span>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-105 transition-transform duration-200 text-white"
                      aria-label={`Open repository for ${proj.title}`}
                    >
                      <ChevronRightIcon className="w-5 h-5 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: 🧪 LAB / EXPERIMENTS & PLAYGROUND */}
        <section id="lab" className="relative w-full py-24 sm:py-32 lg:py-36 border-t border-white/10">
          <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-18">
              <div>
                <div className="flex items-center space-x-2 text-neon font-mono text-xs uppercase tracking-widest mb-3">
                  <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                  <span>Playground & Sandboxes</span>
                </div>
                <h2 className="font-grotesk text-[36px] sm:text-[48px] md:text-[58px] lg:text-[68px] uppercase leading-tight text-cream">
                  Lab Experiments
                </h2>
              </div>
              <div className="font-mono text-[13px] sm:text-[14px] uppercase text-cream/90 max-w-[360px] leading-relaxed">
                Micro-tools, interface demos, protocol tests, and engineering prototypes in active experimentation.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {labExperiments.map((item) => (
                <div 
                  key={item.id}
                  className="liquid-glass rounded-[28px] p-7 flex flex-col justify-between hover:bg-white/10 transition-colors duration-200 border border-white/15 hover:border-neon/40 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] text-cream/80 uppercase font-medium">
                        {item.tag}
                      </span>
                      <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full border ${item.statusBadge}`}>
                        {item.status}
                      </span>
                    </div>

                    <h3 className="font-grotesk text-[22px] sm:text-[24px] uppercase text-cream group-hover:text-neon transition-colors duration-200 mb-3">
                      {item.title}
                    </h3>

                    <p className="font-mono text-[12px] sm:text-[13px] text-cream/85 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-cream/70 font-mono text-xs group-hover:text-neon transition-colors duration-200">
                    <span>ssh.net.in/lab</span>
                    <span className="text-neon text-[16px]">↗</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 5: CTA / CONNECT & TERMINAL FOOTER (Own video and opaque dark bg) */}
      <section id="links" className="relative w-full bg-[#010828] overflow-hidden z-10">
        {/* Full-width Video displaying at native aspect ratio */}
        <video
          ref={ctaVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-auto block"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4"
        />

        {/* Text Content */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-end px-6 sm:px-12 lg:pr-[18%] lg:pl-[15%]">
          <div className="relative pointer-events-auto text-left">
            {/* Small 'Connect' cursive text */}
            <span className="font-condiment text-neon text-[20px] sm:text-[36px] md:text-[52px] lg:text-[72px] absolute -top-4 sm:-top-8 md:-top-12 lg:-top-16 left-0 -rotate-1 mix-blend-exclusion pointer-events-none select-none">
              Get in touch
            </span>

            {/* Heading in Anton */}
            <h2 className="font-grotesk text-[18px] sm:text-[32px] md:text-[48px] lg:text-[64px] uppercase leading-[1.08] text-cream tracking-tight">
              <span className="block mb-2 sm:mb-4 md:mb-8 lg:mb-10">
                CONNECT TO NODE.
              </span>
              <span className="block">EXPLORE SUBDOMAINS.</span>
              <span className="block">BUILD WITH NITHIN.</span>
              <span className="block text-neon">FOLLOW THE SIGNAL.</span>
            </h2>
          </div>
        </div>

        {/* Bottom-left Social Icons Container */}
        <div className="absolute left-[6%] sm:left-[8%] bottom-[8%] sm:bottom-[12%] lg:bottom-[18%] z-20">
          <div className="liquid-glass rounded-[0.5rem] sm:rounded-[0.875rem] lg:rounded-[1.25rem] flex flex-col overflow-hidden border border-white/10 shadow-2xl">
            <a
              href="mailto:contact@ssh.net.in"
              className="w-[14vw] sm:w-[14.375rem] md:w-[10.78125rem] lg:w-[16.77rem] h-[36px] sm:h-[48px] md:h-[52px] lg:h-[56px] flex items-center justify-center text-cream hover:bg-white/10 hover:text-neon transition-colors duration-200 border-b border-white/10"
              aria-label="Email"
              title="Email: contact@ssh.net.in"
            >
              <MailIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-[14vw] sm:w-[14.375rem] md:w-[10.78125rem] lg:w-[16.77rem] h-[36px] sm:h-[48px] md:h-[52px] lg:h-[56px] flex items-center justify-center text-cream hover:bg-white/10 hover:text-neon transition-colors duration-200 border-b border-white/10"
              aria-label="GitHub"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-[14vw] sm:w-[14.375rem] md:w-[10.78125rem] lg:w-[16.77rem] h-[36px] sm:h-[48px] md:h-[52px] lg:h-[56px] flex items-center justify-center text-cream hover:bg-white/10 hover:text-neon transition-colors duration-200"
              aria-label="Twitter / X"
              title="Twitter / X"
            >
              <TwitterIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER BAR */}
      <footer className="w-full bg-[#010517] py-8 border-t border-white/5 z-20 relative">
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-cream/60">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>ssh.net.in · Root Node Operational</span>
          </div>
          <div>
            © {new Date().getFullYear()} Nithin. All subdomains routed via Cloudflare Edge.
          </div>
        </div>
      </footer>
    </div>
  );
}
