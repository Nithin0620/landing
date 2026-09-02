import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '../components/Icons';

const projects = [
  {
    title: 'Bloggr',
    category: 'Full-Stack Platform',
    description: 'Modern developer publishing platform with markdown rendering, edge distribution, and custom domain routing.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    link: 'https://bloggr.ssh.net.in',
    github: 'https://github.com/Nithin0620/Bloggr',
  },
  {
    title: 'Infra X-Ray',
    category: 'Civic Tech',
    description: 'Citizen audit portal for monitoring public infrastructure spending, project delivery, and corruption detection.',
    tags: ['React', 'FastAPI', 'OpenData'],
    link: 'https://infra-xray.ssh.net.in',
    github: 'https://github.com/Nithin0620/INFRA-XRAY',
  },
  {
    title: 'StudyNotion',
    category: 'EdTech Platform',
    description: 'Comprehensive EdTech platform featuring interactive course management, student & instructor dashboards, video streaming, and secure payments.',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: 'https://studynotion.ssh.net.in',
  },
  {
    title: 'Satellite Super-Resolution',
    category: 'AI & Deep Learning',
    description: 'AI-powered satellite image super-resolution reconstructing 10–20m imagery to <4m spatial resolution for fine-scale Earth observation.',
    tags: ['Python', 'DeepLearning', 'ComputerVision'],
    link: 'https://windows.ssh.net.in',
  },
  {
    title: 'Collaborative Code Base',
    category: 'AI & Collaborative Agent',
    description: 'Real-time multi-agent collaborative coding environment and workspace synchronization system.',
    tags: ['TypeScript', 'AI-Agent', 'WebSockets', 'React'],
    github: 'https://github.com/Nithin0620/Collabrative-code-base',
  },
  {
    title: 'Repowise',
    category: 'Developer Tooling',
    description: 'Intelligent GitHub repository analyzer providing architectural insights and code hygiene reports.',
    tags: ['Go', 'GitHub API', 'CLI', 'Docker'],
    github: 'https://github.com/Nithin0620/repowise',
  },
];

export default function Work() {
  return (
    <div className="relative z-10 pt-28 sm:pt-36">
      {/* HERO */}
      <section className="relative w-full py-16 sm:py-24">
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-[800px]">
            <div className="flex items-center space-x-2 text-neon text-glow-neon font-mono text-xs uppercase tracking-widest mb-4 font-semibold">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span>Work</span>
            </div>
            <h1 className="font-grotesk text-[42px] sm:text-[64px] md:text-[80px] lg:text-[96px] uppercase leading-[1.02] text-white text-glow tracking-tight">
              REAL PROJECTS.<br />
              <span className="font-condiment text-neon text-glow-neon text-[38px] sm:text-[56px] md:text-[72px] lg:text-[88px] -rotate-1 select-none">
                Real
              </span>{' '}
              IMPLEMENTATIONS.
            </h1>
            <p className="font-mono text-[14px] sm:text-[17px] text-white/80 mt-6 max-w-[520px] leading-relaxed">
              Selected projects I've built — from full-stack platforms to AI tools and civic tech.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="relative w-full py-16 sm:py-24">
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <div
                key={proj.title}
                className="liquid-glass rounded-[32px] p-7 sm:p-8 hover:border-white/40 hover:bg-[#010828]/85 transition-colors duration-200 group flex flex-col justify-between min-h-[340px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-neon text-glow-neon uppercase tracking-wider font-bold">
                      {proj.category}
                    </span>
                  </div>
                  <h3 className="font-grotesk text-[26px] sm:text-[30px] uppercase text-white text-glow group-hover:text-neon transition-colors duration-200">
                    {proj.title}
                  </h3>
                  <p className="font-mono text-[13px] sm:text-[14px] text-white/95 mt-3.5 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5">
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
                <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between">
                  <span className="font-mono text-[12px] text-white/60 uppercase tracking-wider">View Project</span>
                  <div className="flex items-center space-x-3">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="liquid-glass w-[42px] h-[42px] rounded-full flex items-center justify-center hover:border-white/40 transition-colors text-white"
                        aria-label={`GitHub for ${proj.title}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      </a>
                    )}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 text-white"
                        aria-label={`Open ${proj.title}`}
                      >
                        <ChevronRightIcon className="w-5 h-5 stroke-[2.5]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full py-20 sm:py-28 border-t border-white/15">
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="font-grotesk text-[32px] sm:text-[48px] md:text-[60px] uppercase leading-tight text-white text-glow mb-6">
            LIKE WHAT YOU SEE?
          </h2>
          <p className="font-mono text-[14px] text-white/70 max-w-[400px] mx-auto mb-8">
            Let's talk about your project. I'll help you figure out the simplest approach.
          </p>
          <Link
            to="/start"
            className="inline-flex rounded-[16px] px-10 py-5 font-grotesk text-[16px] uppercase tracking-wider bg-neon text-black hover:bg-white transition-colors duration-200 font-semibold"
          >
            Start a Project →
          </Link>
        </div>
      </section>
    </div>
  );
}
