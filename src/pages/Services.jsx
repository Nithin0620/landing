import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: '🌐',
    title: 'Websites & Web Apps',
    description: 'Business websites, landing pages, dashboards, and custom web applications — built fast and built right.',
    items: ['Business websites', 'Landing pages', 'Dashboards', 'Custom web applications', 'E-commerce'],
  },
  {
    icon: '⚙️',
    title: 'Automation',
    description: 'Stop doing repetitive work. I build automations that save you hours every week.',
    items: ['Business process automation', 'API integrations', 'Data processing', 'Automated reports & workflows', 'Scheduled tasks'],
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    description: "Infrastructure that scales. Deployments that don't break at 3am.",
    items: ['AWS deployments', 'Docker containerization', 'CI/CD pipelines', 'Server & infrastructure setup', 'Monitoring'],
  },
  {
    icon: '🛠',
    title: 'Custom Development',
    description: "When off-the-shelf doesn't fit. Backend APIs, internal tools, databases — built for your specific needs.",
    items: ['Backend APIs', 'Internal tools', 'Database systems', 'Custom software', 'Integrations'],
  },
];

export default function Services() {
  return (
    <div className="relative z-10 pt-28 sm:pt-36">
      {/* HERO */}
      <section className="relative w-full py-16 sm:py-24">
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-[800px]">
            <div className="flex items-center space-x-2 text-neon text-glow-neon font-mono text-xs uppercase tracking-widest mb-4 font-semibold">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span>Services</span>
            </div>
            <h1 className="font-grotesk text-[42px] sm:text-[64px] md:text-[80px] lg:text-[96px] uppercase leading-[1.02] text-white text-glow tracking-tight">
              WHAT I<br /><span className="text-neon text-glow-neon">BUILD.</span>
            </h1>
            <p className="font-mono text-[14px] sm:text-[17px] text-white/80 mt-6 max-w-[520px] leading-relaxed">
              I help businesses turn ideas and repetitive work into simple, reliable digital solutions.
              No bloated agency process — just direct development.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="relative w-full py-16 sm:py-24">
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="liquid-glass rounded-[32px] p-8 sm:p-10 hover:border-white/40 hover:bg-[#010828]/85 transition-colors duration-200 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-4xl">{svc.icon}</span>
                </div>
                <h3 className="font-grotesk text-[28px] sm:text-[34px] uppercase text-white text-glow group-hover:text-neon transition-colors duration-200 mb-3">
                  {svc.title}
                </h3>
                <p className="font-mono text-[14px] text-white/70 mb-6 leading-relaxed">
                  {svc.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {svc.items.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon/60" />
                      <span className="font-mono text-[13px] text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative w-full py-16 sm:py-24 border-t border-white/15">
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center space-x-2 text-neon text-glow-neon font-mono text-xs uppercase tracking-widest mb-8 font-semibold">
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
            <span>How It Works</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Tell me what you need', desc: 'Send a message describing your project. No commitment.' },
              { step: '02', title: 'We discuss requirements', desc: "I understand what you're trying to achieve and suggest the simplest approach." },
              { step: '03', title: 'I build it', desc: 'Development, testing and deployment. You get updates along the way.' },
              { step: '04', title: 'You get the solution', desc: 'With documentation and support as agreed.' },
            ].map((item) => (
              <div key={item.step} className="liquid-glass rounded-[24px] p-7">
                <span className="font-grotesk text-[48px] text-neon text-glow-neon opacity-40">{item.step}</span>
                <h4 className="font-grotesk text-[18px] uppercase text-white text-glow mt-2 mb-3">{item.title}</h4>
                <p className="font-mono text-[13px] text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full py-20 sm:py-28 border-t border-white/15">
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="font-grotesk text-[32px] sm:text-[48px] md:text-[60px] uppercase leading-tight text-white text-glow mb-6">
            READY TO BUILD?
          </h2>
          <p className="font-mono text-[14px] text-white/70 max-w-[400px] mx-auto mb-8">
            Every project is different. Tell me what you need and I'll provide a clear scope and quote.
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
