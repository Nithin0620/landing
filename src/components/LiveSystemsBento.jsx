import React, { useState } from 'react';
import { ArrowUpRight, Layers, Cpu } from 'lucide-react';
import CaseStudyCockpit from './CaseStudyCockpit';

const SPANS = [
  'sm:col-span-2 md:col-span-2 md:row-span-2',
  'sm:col-span-2 md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'sm:col-span-2 md:col-span-2',
  'sm:col-span-2 md:col-span-2',
  'md:col-span-1',
  'sm:col-span-2 md:col-span-2',
  'md:col-span-1',
  'sm:col-span-2 md:col-span-2',
  'sm:col-span-2 md:col-span-2',
  'sm:col-span-2 md:col-span-2',
  'sm:col-span-2 md:col-span-2',
];

const ORDER = [
  'personal',
  'workflow',
  'infra-xray',
  'satellite-super-resolution',
  'studynotion',
  'bloggr',
  'benchley',
  'web2mcp',
  'memolm',
  'keyzen',
  'pulse',
  'issuepilot',
  'splitwise',
];

function initials(title) {
  return title
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function screenshotSrc(project) {
  return project.screenshot || `/screenshots/${project.id}.jpg`;
}

function TilePreview({ project, large = false, showMeta = true }) {
  const accent = project.accent || '#6FFF00';
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="grid-bg absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${accent}40, transparent 60%), linear-gradient(135deg, #0b1226, #050a1c)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-grotesk uppercase leading-none transition-transform duration-500 group-hover:scale-110"
          style={{ color: `${accent}55`, fontSize: large ? '104px' : '60px' }}
        >
          {initials(project.title)}
        </span>
      </div>

      {!failed && (
        <img
          src={screenshotSrc(project)}
          alt={`${project.title} screenshot`}
          loading="lazy"
          draggable={false}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {showMeta && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#010828]/85 via-[#010828]/10 to-transparent" />
      )}

      <div className="tile-scan pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      {showMeta && (
        <>
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-2 py-1 backdrop-blur-sm">
            <span className={`h-1.5 w-1.5 rounded-full ${project.statusColor}`} />
            <span className="font-mono text-[8px] uppercase tracking-wider text-white/70">
              {project.status}
            </span>
          </div>

          <div className="absolute inset-x-3 bottom-3 truncate rounded-md border border-white/10 bg-black/30 px-2 py-1 font-mono text-[9px] text-white/50 backdrop-blur-sm">
            {project.subdomain}
          </div>
        </>
      )}
    </div>
  );
}

function TileFooter({ project, onOpen }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">
        {project.badge}
      </span>
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/80 transition-all duration-200 group-hover:border-neon group-hover:bg-neon group-hover:text-black"
        aria-hidden="true"
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </div>
  );
}

export default function LiveSystemsBento({ domains }) {
  const [selected, setSelected] = useState(null);

  const orderedDomains = [
    ...ORDER.map((id) => domains.find((project) => project.id === id)).filter(Boolean),
    ...domains.filter((project) => !ORDER.includes(project.id)),
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[230px] md:grid-cols-4">
        {orderedDomains.map((project, index) => {
          const span = SPANS[index] || 'md:col-span-1';
          const isHero = index === 0;
          const isWide = !isHero && span.includes('md:col-span-2');
          const accent = project.accent || '#6FFF00';

          const base = `group relative overflow-hidden rounded-[24px] border border-white/[0.18] bg-[#010828]/65 text-left shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-[#010828]/85 focus-visible:border-neon focus-visible:outline-none ${span}`;

          if (isHero) {
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelected(project)}
                aria-label={`Open case study for ${project.title}`}
                className={`${base} flex min-h-[460px] flex-col`}
              >
                <div className="relative min-h-[210px] flex-1 overflow-hidden border-b border-white/10">
                  <TilePreview project={project} large />
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-neon">
                    <Layers className="h-3.5 w-3.5" />
                    Featured system
                  </div>
                  <div>
                    <h3 className="font-grotesk text-[26px] uppercase leading-tight text-white transition-colors duration-200 group-hover:text-neon sm:text-[32px]">
                      {project.title}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/70">
                      {project.category}
                    </p>
                  </div>
                  <p className="line-clamp-2 font-mono text-[11px] leading-relaxed text-white/85">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-[9px] text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-[9px] text-white/65">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                  <TileFooter project={project} />
                </div>
              </button>
            );
          }

          if (isWide) {
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelected(project)}
                aria-label={`Open case study for ${project.title}`}
                className={`${base} flex min-h-[190px]`}
              >
                <div className="relative hidden w-2/5 shrink-0 overflow-hidden border-r border-white/10 sm:block">
                  <TilePreview project={project} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: accent }}
                    />
                    {project.category}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-grotesk text-[22px] uppercase leading-tight text-white transition-colors duration-200 group-hover:text-neon sm:text-[26px]">
                      {project.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 font-mono text-[10.5px] leading-relaxed text-white/80">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-white/60">
                      <Cpu className="h-3 w-3" />
                      {project.stack.length} tools ·{' '}
                      {project.architecture.layers.reduce((sum, layer) => sum + layer.nodes.length, 0)}{' '}
                      nodes
                    </span>
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/80 transition-all duration-200 group-hover:border-neon group-hover:bg-neon group-hover:text-black"
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </button>
            );
          }

          return (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelected(project)}
              aria-label={`Open case study for ${project.title}`}
              className={`${base} flex min-h-[230px] flex-col`}
            >
              <div className="relative min-h-[104px] flex-1 overflow-hidden border-b border-white/10">
                <TilePreview project={project} showMeta={false} />
                <span className="absolute left-2.5 top-2.5 rounded-full border border-white/15 bg-black/40 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-white/75 backdrop-blur-sm">
                  {project.category}
                </span>
              </div>
              <div className="flex flex-col gap-2 p-3.5">
                <div>
                  <h3 className="font-grotesk text-[19px] uppercase leading-tight text-white transition-colors duration-200 group-hover:text-neon">
                    {project.title}
                  </h3>
                  <p className="mt-0.5 truncate font-mono text-[9px] uppercase tracking-wider text-neon/80">
                    {project.subdomain}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-white/60">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${project.statusColor}`}
                    />
                    {project.status}
                  </span>
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/80 transition-all duration-200 group-hover:border-neon group-hover:bg-neon group-hover:text-black"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <CaseStudyCockpit
          key={selected.id}
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
