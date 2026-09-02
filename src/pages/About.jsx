import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="relative z-10 pt-28 sm:pt-36">
      {/* HERO */}
      <section className="relative w-full py-16 sm:py-24">
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-[800px]">
            <div className="flex items-center space-x-2 text-neon text-glow-neon font-mono text-xs uppercase tracking-widest mb-4 font-semibold">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span>About</span>
            </div>
            <h1 className="font-grotesk text-[42px] sm:text-[64px] md:text-[80px] lg:text-[96px] uppercase leading-[1.02] text-white text-glow tracking-tight">
              WORK DIRECTLY<br />
              WITH THE <span className="text-neon text-glow-neon">DEV.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="relative w-full py-16 sm:py-24">
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-grotesk text-[28px] sm:text-[34px] uppercase text-white text-glow mb-6">
                NO SALES TEAM. NO COMPLICATED PROCESS.
              </h2>
              <div className="space-y-4 font-mono text-[14px] text-white/70 leading-relaxed">
                <p>
                  You work directly with the developer. No account managers, no handoffs, no miscommunication.
                  When you message me, you get me.
                </p>
                <p>
                  I keep things simple: clear scope, honest timelines, and actual development — not slides and meetings.
                </p>
                <p>
                  Whether it's a business website, an automation that saves you hours, or a custom tool for your team — I build things that work.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="liquid-glass rounded-[24px] p-7">
                <span className="font-mono text-[11px] uppercase tracking-widest text-neon text-glow-neon font-bold block mb-3">Stack</span>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'Python', 'Go', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Tailwind', 'FastAPI'].map((t) => (
                    <span key={t} className="font-mono text-[12px] px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="liquid-glass rounded-[24px] p-7">
                <span className="font-mono text-[11px] uppercase tracking-widest text-neon text-glow-neon font-bold block mb-3">Connect</span>
                <div className="flex flex-col space-y-3">
                  <a href="mailto:nithin@ssh.net.in" className="font-mono text-[14px] text-white/70 hover:text-neon transition-colors">nithin@ssh.net.in</a>
                  <a href="https://github.com/Nithin0620" target="_blank" rel="noreferrer" className="font-mono text-[14px] text-white/70 hover:text-neon transition-colors">github.com/Nithin0620</a>
                  <a href="https://www.linkedin.com/in/k-s-nithin/" target="_blank" rel="noreferrer" className="font-mono text-[14px] text-white/70 hover:text-neon transition-colors">linkedin.com/in/k-s-nithin</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full py-20 sm:py-28 border-t border-white/15">
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="font-grotesk text-[32px] sm:text-[48px] md:text-[60px] uppercase leading-tight text-white text-glow mb-6">
            HAVE A PROJECT?
          </h2>
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
