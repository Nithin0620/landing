import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MailIcon, LinkedInIcon, GithubIcon } from './Icons';

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
  ];

  const fixedBgVideoRef = useRef(null);

  useEffect(() => {
    if (fixedBgVideoRef.current) {
      fixedBgVideoRef.current.defaultMuted = true;
      fixedBgVideoRef.current.muted = true;
      fixedBgVideoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#010828] text-white selection:bg-neon selection:text-black">
      {/* FIXED PARALLAX BACKGROUND */}
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

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-16 py-5">
        <div className="max-w-[1831px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2.5 group">
            <span className="w-2.5 h-2.5 rounded-full bg-neon animate-pulse" />
            <span className="font-grotesk text-[18px] sm:text-[20px] uppercase tracking-wider text-white text-glow group-hover:text-neon transition-colors duration-200">
              ssh.net.in
            </span>
          </Link>

          <nav className="hidden lg:block liquid-glass rounded-[28px] px-[48px] py-[20px]">
            <ul className="flex items-center space-x-10">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`font-grotesk text-[13px] uppercase tracking-wider transition-colors duration-200 ${
                      location.pathname === item.path ? 'text-neon text-glow-neon' : 'text-white hover:text-neon'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/start"
                  className="font-grotesk text-[13px] uppercase tracking-wider px-5 py-2 rounded-full bg-neon text-black hover:bg-white transition-colors duration-200 font-semibold"
                >
                  Start a Project
                </Link>
              </li>
            </ul>
          </nav>

          <div className="hidden lg:flex flex-col space-y-3">
            <a
              href="mailto:nithin@ssh.net.in"
              className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-white hover:bg-white/20 hover:text-neon transition-colors duration-200"
              aria-label="Email"
            >
              <MailIcon className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Nithin0620"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-white hover:bg-white/20 hover:text-neon transition-colors duration-200"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/k-s-nithin/"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-white hover:bg-white/20 hover:text-neon transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden liquid-glass w-[52px] h-[52px] rounded-[1rem] flex items-center justify-center text-white"
            aria-label="Menu"
          >
            <div className="flex flex-col space-y-1.5">
              <span className={`block w-5 h-[2px] bg-white transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
              <span className={`block w-5 h-[2px] bg-white transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[2px] bg-white transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden liquid-glass rounded-[24px] mt-4 p-6 flex flex-col space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-grotesk text-[15px] uppercase tracking-wider py-2 ${
                  location.pathname === item.path ? 'text-neon text-glow-neon' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/start"
              className="font-grotesk text-[15px] uppercase tracking-wider py-2 text-neon text-glow-neon font-semibold"
            >
              Start a Project
            </Link>
            <div className="flex space-x-4 pt-2 border-t border-white/15">
              <a href="mailto:nithin@ssh.net.in" className="text-white hover:text-neon"><MailIcon className="w-5 h-5" /></a>
              <a href="https://github.com/Nithin0620" target="_blank" rel="noreferrer" className="text-white hover:text-neon"><GithubIcon className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/in/k-s-nithin/" target="_blank" rel="noreferrer" className="text-white hover:text-neon"><LinkedInIcon className="w-5 h-5" /></a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main>{children}</main>

      {/* FOOTER */}
      <footer className="w-full bg-[#010517] py-10 border-t border-white/10 relative z-10">
        <div className="max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <Link to="/" className="flex items-center space-x-2.5 mb-4">
                <span className="w-2 h-2 rounded-full bg-neon" />
                <span className="font-grotesk text-[16px] uppercase tracking-wider text-white text-glow">ssh.net.in</span>
              </Link>
              <p className="font-mono text-[13px] text-white/60 max-w-[320px] leading-relaxed">
                Web · Automation · Cloud · Software<br />
                A small digital workshop by Nithin.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-neon text-glow-neon font-bold block mb-3">Navigate</span>
                <div className="flex flex-col space-y-2">
                  <Link to="/services" className="font-mono text-[13px] text-white/70 hover:text-neon transition-colors">Services</Link>
                  <Link to="/work" className="font-mono text-[13px] text-white/70 hover:text-neon transition-colors">Work</Link>
                  <Link to="/about" className="font-mono text-[13px] text-white/70 hover:text-neon transition-colors">About</Link>
                </div>
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-neon text-glow-neon font-bold block mb-3">Connect</span>
                <div className="flex flex-col space-y-2">
                  <a href="mailto:nithin@ssh.net.in" className="font-mono text-[13px] text-white/70 hover:text-neon transition-colors">Email</a>
                  <a href="https://github.com/Nithin0620" target="_blank" rel="noreferrer" className="font-mono text-[13px] text-white/70 hover:text-neon transition-colors">GitHub</a>
                  <a href="https://www.linkedin.com/in/k-s-nithin/" target="_blank" rel="noreferrer" className="font-mono text-[13px] text-white/70 hover:text-neon transition-colors">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-[12px] text-white/50">ssh.net.in · Root Node Operational</span>
            </div>
            <span className="font-mono text-[12px] text-white/50">
              © {new Date().getFullYear()} Nithin. All subdomains routed via Cloudflare Edge.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
