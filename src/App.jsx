import React, { useState, useEffect, useRef } from 'react';
import { 
  MailIcon, 
  LinkedInIcon, 
  GithubIcon, 
  ChevronRightIcon 
} from './components/Icons';

export default function App() {
  const heroVideoRef = useRef(null);
  const fixedBgVideoRef = useRef(null);
  const ctaVideoRef = useRef(null);
  const [copiedSsh, setCopiedSsh] = useState(false);

  useEffect(() => {
    const vids = [heroVideoRef.current, fixedBgVideoRef.current, ctaVideoRef.current];
    vids.forEach(v => {
      if (v) {
        v.defaultMuted = true;
        v.muted = true;
        v.play().catch(() => {});
      }
    });
  }, []);

  const handleCopySsh = () => {
    navigator.clipboard.writeText('ssh guest@ssh.net.in');
    setCopiedSsh(true);
    setTimeout(() => setCopiedSsh(false), 2500);
  };

  // 1. Primary Active Hosted Subdomains
  const hostedDomains = [
    {
      id: 'personal',
      title: 'Nithin Personal',
      category: 'Profile & Portfolio',
      subdomain: 'nithin.ssh.net.in',
      url: 'https://nithin.ssh.net.in',
      status: 'Online',
      statusColor: 'bg-emerald-400',
      description: 'Personal portfolio, engineering background, career logs, and featured technical writings.',
      badge: 'Primary Node'
    },
    {
      id: 'infra-xray',
      title: 'Infra X-Ray',
      category: 'Civic Tech & Public Accountability',
      subdomain: 'infra-xray.ssh.net.in',
      url: 'https://infra-xray.ssh.net.in',
      status: 'Active',
      statusColor: 'bg-emerald-400',
      description: 'Public infrastructure review, government project auditing, and anti-corruption transparency platform.',
      badge: 'Civic Platform'
    },
    {
      id: 'satellite-super-resolution',
      title: 'Satellite Super-Resolution',
      category: 'Deep Learning & Earth Observation',
      subdomain: 'windows.ssh.net.in',
      url: 'https://windows.ssh.net.in/',
      status: 'Live Demo',
      statusColor: 'bg-emerald-400',
      description: 'AI-powered satellite image super-resolution reconstructing 10–20 m imagery to <4 m spatial resolution for fine-scale Earth observation and localized monitoring.',
      badge: 'Interactive AI'
    }
  ];

  // 2. Featured Projects from GitHub
  const projects = [
    {
      id: 1,
      title: 'Collabrative-code-base',
      category: 'AI & Collaborative Agent',
      description: 'Real-time multi-agent collaborative coding environment and workspace synchronization system.',
      tags: ['TypeScript', 'AI-Agent', 'WebSockets', 'React'],
      badge: 'Agentic AI',
      link: 'https://github.com/Nithin0620/Collabrative-code-base'
    },
    {
      id: 2,
      title: 'INFRA-XRAY',
      category: 'Civic Tech & Open Governance',
      description: 'Citizen audit portal for monitoring public infrastructure spending, project delivery, and corruption detection.',
      tags: ['CivicTech', 'OpenData', 'React', 'FastAPI'],
      badge: 'Civic Core',
      link: 'https://github.com/Nithin0620/INFRA-XRAY'
    },
    {
      id: 3,
      title: 'Bloggr',
      category: 'Full-Stack Platform',
      description: 'Modern developer publishing platform with markdown rendering, edge distribution, and custom domain routing.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
      badge: 'Full-Stack',
      link: 'https://github.com/Nithin0620/Bloggr'
    },
    {
      id: 4,
      title: 'repowise',
      category: 'Developer Tooling & Analytics',
      description: 'Intelligent GitHub repository analyzer providing architectural insights and code hygiene reports.',
      tags: ['Go', 'GitHub API', 'CLI', 'Docker'],
      badge: 'DevTool',
      link: 'https://github.com/Nithin0620/repowise'
    },
    {
      id: 5,
      title: 'AgentLog',
      category: 'Autonomous Systems',
      description: 'Telemetry logging daemon and event stream tracer designed for autonomous agent architectures.',
      tags: ['Python', 'AsyncIO', 'Telemetry', 'LLMs'],
      badge: 'Telemetry',
      link: 'https://github.com/Nithin0620/AgentLog'
    },
    {
      id: 6,
      title: 'Observal',
      category: 'Observability & Monitoring',
      description: 'Lightweight distributed server health monitor and heartbeat probe dashboard for VPS infrastructure.',
      tags: ['TypeScript', 'Monitoring', 'Edge', 'Prometheus'],
      badge: 'SysAdmin',
      link: 'https://github.com/Nithin0620/Observal'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#010828] text-white selection:bg-neon selection:text-black">
      {/* 
        ========================================================================
        STATIONARY PARALLAX VIDEO BACKGROUND FOR SCREENS 2 AND 3
        ========================================================================
      */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transform-gpu">
        <video
          ref={fixedBgVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-75"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010828]/60 via-[#010828]/40 to-[#010828]/70" />
      </div>

      {/* SECTION 1: HERO */}
      <section className="relative w-full min-h-screen rounded-b-[32px] overflow-hidden flex flex-col justify-between z-10 bg-[#010828]">
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
          <a href="#" className="flex items-center space-x-2.5 group">
            <span className="w-2.5 h-2.5 rounded-full bg-neon animate-pulse" />
            <span className="font-grotesk text-[18px] sm:text-[20px] uppercase tracking-wider text-white text-glow group-hover:text-neon transition-colors duration-200">
              ssh.net.in
            </span>
          </a>

          <nav className="hidden lg:block liquid-glass rounded-[28px] px-[48px] py-[20px]">
            <ul className="flex items-center space-x-10">
              {[
                { name: 'Hosted Domains', href: '#domains' },
                { name: 'Projects', href: '#projects' },
                { name: 'Connect', href: '#links' }
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="font-grotesk text-[13px] uppercase tracking-wider text-white hover:text-neon transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:flex flex-col space-y-3">
            <a
              href="mailto:nithin@ssh.net.in"
              className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-white hover:bg-white/20 hover:text-neon transition-colors duration-200"
              aria-label="Email"
              title="Email: nithin@ssh.net.in"
            >
              <MailIcon className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Nithin0620"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-white hover:bg-white/20 hover:text-neon transition-colors duration-200"
              aria-label="GitHub"
              title="GitHub: /Nithin0620"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/k-s-nithin/"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-white hover:bg-white/20 hover:text-neon transition-colors duration-200"
              aria-label="LinkedIn"
              title="LinkedIn: /in/k-s-nithin"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          </div>

          <div className="lg:hidden w-6" />
        </header>

        {/* Hero Content */}
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16 my-auto py-16 sm:py-24 z-10 flex flex-col justify-center">
          <div className="relative max-w-[880px] lg:ml-24">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-neon animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-white font-medium">
                Root Domain & Portal
              </span>
            </div>

            <h1 className="font-grotesk text-[42px] sm:text-[64px] md:text-[80px] lg:text-[96px] uppercase leading-[1.02] text-white text-glow tracking-tight">
              ORBIT<br />
              // NITHIN
            </h1>

            <span className="font-condiment text-neon text-glow-neon absolute right-2 sm:right-12 md:right-24 bottom-[4.5rem] sm:bottom-[3.5rem] text-[28px] sm:text-[42px] md:text-[54px] lg:text-[62px] -rotate-2 mix-blend-exclusion opacity-95 pointer-events-none select-none">
              ssh.net.in
            </span>

            <p className="font-mono text-[14px] sm:text-[18px] uppercase tracking-widest text-white mt-4 font-medium">
              Projects <span className="text-neon">·</span> Infrastructure <span className="text-neon">·</span> Experiments
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-[480px]">
              <div 
                onClick={handleCopySsh}
                className="liquid-glass rounded-[16px] px-4 py-3.5 flex items-center justify-between border border-white/20 hover:border-neon/60 cursor-pointer transition-colors duration-200 group flex-1"
                title="Click to copy command"
              >
                <div className="flex items-center space-x-2 font-mono text-[13px] sm:text-[14px] text-white font-semibold">
                  <span className="text-neon text-glow-neon">$</span>
                  <span>ssh guest@ssh.net.in</span>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-neon text-glow-neon group-hover:underline ml-3 whitespace-nowrap font-bold">
                  {copiedSsh ? 'Copied! ✓' : 'Copy'}
                </span>
              </div>

              <a 
                href="#domains"
                className="liquid-glass rounded-[16px] px-6 py-3.5 flex items-center justify-center font-grotesk text-[14px] uppercase tracking-wider text-white hover:bg-neon hover:text-black transition-colors duration-200 whitespace-nowrap font-semibold"
              >
                Explore Nodes ↓
              </a>
            </div>
          </div>

          <div className="flex lg:hidden items-center justify-center space-x-4 mt-12 sm:mt-16">
            <a
              href="mailto:nithin@ssh.net.in"
              className="liquid-glass w-[52px] h-[52px] rounded-[1rem] flex items-center justify-center text-white hover:bg-white/20 hover:text-neon transition-colors duration-200"
              aria-label="Email"
              title="Email: nithin@ssh.net.in"
            >
              <MailIcon className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Nithin0620"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass w-[52px] h-[52px] rounded-[1rem] flex items-center justify-center text-white hover:bg-white/20 hover:text-neon transition-colors duration-200"
              aria-label="GitHub"
              title="GitHub: /Nithin0620"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/k-s-nithin/"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass w-[52px] h-[52px] rounded-[1rem] flex items-center justify-center text-white hover:bg-white/20 hover:text-neon transition-colors duration-200"
              aria-label="LinkedIn"
              title="LinkedIn: /in/k-s-nithin"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="h-6 sm:h-10" />
      </section>

      {/* 
        ========================================================================
        SCROLLABLE SECTIONS 2 & 3
        ========================================================================
      */}
      <div className="relative z-10">
        {/* SECTION 2: 🟢 ACTIVE HOSTED SUBDOMAINS */}
        <section id="domains" className="relative w-full py-24 sm:py-32 lg:py-36">
          <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-18">
              <div>
                <div className="flex items-center space-x-2 text-neon text-glow-neon font-mono text-xs uppercase tracking-widest mb-3 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                  <span>Subdomain Network</span>
                </div>
                <h2 className="font-grotesk text-[36px] sm:text-[48px] md:text-[58px] lg:text-[68px] uppercase leading-tight text-white text-glow">
                  Hosted Domains
                </h2>
              </div>

              <div className="font-mono text-[13px] sm:text-[15px] uppercase text-white max-w-[360px] leading-relaxed font-medium">
                Access active production subdomains and deployed portals on the network.
              </div>
            </div>

            {/* 3-Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hostedDomains.map((srv) => (
                <div
                  key={srv.id}
                  className="liquid-glass rounded-[32px] p-8 sm:p-10 flex flex-col justify-between hover:border-white/40 hover:bg-[#010828]/85 transition-colors duration-200 group min-h-[300px]"
                >
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-white/20">
                      <span className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 text-neon text-glow-neon font-bold tracking-wider">
                        {srv.subdomain}
                      </span>
                      <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40">
                        <span className={`w-2 h-2 rounded-full ${srv.statusColor} animate-pulse`} />
                        <span className="font-mono text-[11px] text-emerald-300 uppercase tracking-wider font-bold">{srv.status}</span>
                      </div>
                    </div>

                    <div className="pt-7">
                      <span className="font-mono text-xs uppercase tracking-widest text-neon text-glow-neon block mb-2 font-bold">
                        {srv.category}
                      </span>
                      <h3 className="font-grotesk text-[28px] sm:text-[34px] uppercase text-white text-glow group-hover:text-neon transition-colors duration-200">
                        {srv.title}
                      </h3>
                      <p className="font-mono text-[14px] sm:text-[15px] text-white/95 mt-3.5 leading-relaxed font-normal">
                        {srv.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-8 mt-6 border-t border-white/20 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase text-white/80 tracking-wider font-semibold">
                      {srv.badge}
                    </span>
                    <a
                      href={srv.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 text-white"
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
        <section id="projects" className="relative w-full py-24 sm:py-32 lg:py-36 border-t border-white/15">
          <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20">
              <div>
                <h2 className="font-grotesk text-[36px] sm:text-[48px] md:text-[58px] lg:text-[68px] uppercase leading-tight text-white text-glow">
                  Featured
                </h2>
                <div className="flex items-center ml-8 sm:ml-16 md:ml-24 lg:ml-32 mt-[-4px] sm:mt-[-8px]">
                  <span className="font-condiment text-neon text-glow-neon text-[38px] sm:text-[50px] md:text-[62px] lg:text-[72px] mr-3 -rotate-1 select-none font-bold">
                    Code
                  </span>
                  <span className="font-grotesk text-[36px] sm:text-[48px] md:text-[58px] lg:text-[68px] uppercase text-white text-glow">
                    Projects
                  </span>
                </div>
              </div>

              <a 
                href="https://github.com/Nithin0620?tab=repositories" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex flex-col self-start md:self-end cursor-pointer group"
              >
                <div className="flex items-center space-x-2 sm:space-x-3 text-white group-hover:text-neon transition-colors duration-200">
                  <span className="font-grotesk text-[32px] sm:text-[44px] md:text-[52px] lg:text-[60px] leading-none text-glow">
                    SEE
                  </span>
                  <div className="flex flex-col font-grotesk text-[20px] sm:text-[26px] md:text-[30px] lg:text-[36px] leading-[0.9] text-glow">
                    <span>ALL</span>
                    <span>PROJECTS</span>
                  </div>
                </div>
                <div className="w-full h-[6px] sm:h-[8px] lg:h-[10px] bg-neon mt-2 rounded-full" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="liquid-glass rounded-[32px] p-7 sm:p-8 hover:border-white/40 hover:bg-[#010828]/85 transition-colors duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-neon text-glow-neon uppercase tracking-wider font-bold">
                        {proj.category}
                      </span>
                      <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-semibold">
                        {proj.badge}
                      </span>
                    </div>

                    <h3 className="font-grotesk text-[26px] sm:text-[30px] uppercase text-white text-glow group-hover:text-neon transition-colors duration-200">
                      {proj.title}
                    </h3>

                    <p className="font-mono text-[13px] sm:text-[14px] text-white/95 mt-3.5 leading-relaxed font-normal">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] px-3 py-1 rounded-full bg-white/10 border border-white/25 text-white font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="liquid-glass rounded-[20px] px-5 py-3.5 mt-8 flex items-center justify-between border border-white/20">
                    <span className="font-mono text-[12px] text-white uppercase tracking-wider font-semibold">
                      Repository
                    </span>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 text-white"
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
      </div>

      {/* SECTION 4: CTA / CONNECT & TERMINAL FOOTER */}
      <section id="links" className="relative w-full bg-[#010828] overflow-hidden z-10">
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

        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-end px-6 sm:px-12 lg:pr-[18%] lg:pl-[15%]">
          <div className="relative pointer-events-auto text-left">
            <span className="font-condiment text-neon text-glow-neon text-[20px] sm:text-[36px] md:text-[52px] lg:text-[72px] absolute -top-4 sm:-top-8 md:-top-12 lg:-top-16 left-0 -rotate-1 mix-blend-exclusion pointer-events-none select-none font-bold">
              Get in touch
            </span>

            <h2 className="font-grotesk text-[18px] sm:text-[32px] md:text-[48px] lg:text-[64px] uppercase leading-[1.08] text-white text-glow tracking-tight">
              <span className="block mb-2 sm:mb-4 md:mb-8 lg:mb-10">
                CONNECT TO NODE.
              </span>
              <span className="block">EXPLORE SUBDOMAINS.</span>
              <span className="block">BUILD WITH NITHIN.</span>
              <span className="block text-neon text-glow-neon">FOLLOW THE SIGNAL.</span>
            </h2>
          </div>
        </div>

        <div className="absolute left-[6%] sm:left-[8%] bottom-[8%] sm:bottom-[12%] lg:bottom-[18%] z-20">
          <div className="liquid-glass rounded-[0.5rem] sm:rounded-[0.875rem] lg:rounded-[1.25rem] flex flex-col overflow-hidden border border-white/20">
            <a
              href="mailto:nithin@ssh.net.in"
              className="w-[14vw] sm:w-[14.375rem] md:w-[10.78125rem] lg:w-[16.77rem] h-[36px] sm:h-[48px] md:h-[52px] lg:h-[56px] flex items-center justify-center text-white hover:bg-white/20 hover:text-neon transition-colors duration-200 border-b border-white/20"
              aria-label="Email"
              title="Email: nithin@ssh.net.in"
            >
              <MailIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://github.com/Nithin0620"
              target="_blank"
              rel="noreferrer"
              className="w-[14vw] sm:w-[14.375rem] md:w-[10.78125rem] lg:w-[16.77rem] h-[36px] sm:h-[48px] md:h-[52px] lg:h-[56px] flex items-center justify-center text-white hover:bg-white/20 hover:text-neon transition-colors duration-200 border-b border-white/20"
              aria-label="GitHub"
              title="GitHub: /Nithin0620"
            >
              <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/k-s-nithin/"
              target="_blank"
              rel="noreferrer"
              className="w-[14vw] sm:w-[14.375rem] md:w-[10.78125rem] lg:w-[16.77rem] h-[36px] sm:h-[48px] md:h-[52px] lg:h-[56px] flex items-center justify-center text-white hover:bg-white/20 hover:text-neon transition-colors duration-200"
              aria-label="LinkedIn"
              title="LinkedIn: /in/k-s-nithin"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER BAR */}
      <footer className="w-full bg-[#010517] py-8 border-t border-white/10 z-20 relative">
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/70 font-medium">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white">ssh.net.in · Root Node Operational</span>
          </div>
          <div>
            © {new Date().getFullYear()} Nithin. All subdomains routed via Cloudflare Edge.
          </div>
        </div>
      </footer>
    </div>
  );
}
