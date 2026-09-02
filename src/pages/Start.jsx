import React, { useState, useRef, useEffect } from 'react';

function CustomSelect({ label, name, value, onChange, options, placeholder, required }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <label className="font-mono text-[11px] uppercase tracking-widest text-neon text-glow-neon font-bold block mb-2">
        {label} {required && '*'}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full bg-white/5 border rounded-[12px] px-5 py-3.5 font-mono text-[14px] text-left transition-colors duration-200 flex items-center justify-between ${
          open ? 'border-neon/60 bg-white/8' : 'border-white/15'
        } ${selected ? 'text-white' : 'text-white/30'}`}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-4 h-4 text-white/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-2 liquid-glass rounded-[12px] border border-white/20 overflow-hidden py-1.5">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange({ target: { name, value: opt.value } });
                setOpen(false);
              }}
              className={`w-full px-5 py-3 font-mono text-[14px] text-left transition-colors duration-150 ${
                value === opt.value
                  ? 'text-neon bg-white/10'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      <input type="hidden" name={name} value={value} required={required} />
    </div>
  );
}

const serviceOptions = [
  { value: 'website', label: 'Website / Web App' },
  { value: 'automation', label: 'Automation' },
  { value: 'cloud', label: 'Cloud / DevOps' },
  { value: 'custom', label: 'Custom Development' },
  { value: 'other', label: 'Other / Not sure' },
];

const budgetOptions = [
  { value: 'under-10k', label: 'Under ₹10,000' },
  { value: '10k-25k', label: '₹10,000 – ₹25,000' },
  { value: '25k-50k', label: '₹25,000 – ₹50,000' },
  { value: '50k-1l', label: '₹50,000 – ₹1,00,000' },
  { value: '1l+', label: '₹1,00,000+' },
  { value: 'unsure', label: 'Not sure yet' },
];

const timelineOptions = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-2weeks', label: '1–2 weeks' },
  { value: '1month', label: 'Within a month' },
  { value: 'flexible', label: 'Flexible' },
];

export default function Start() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    service: '',
    description: '',
    budget: '',
    timeline: '',
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '648eea10-8a59-4105-b10c-5de130c5828d',
          subject: `New Project Enquiry from ${formData.name}`,
          from_name: formData.name,
          ...formData,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full bg-white/5 border border-white/15 rounded-[12px] px-5 py-3.5 font-mono text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-neon/60 focus:bg-white/8 transition-colors duration-200';

  return (
    <div className="relative z-10 pt-28 sm:pt-36">
      {/* HERO */}
      <section className="relative w-full py-16 sm:py-24">
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-[800px]">
            <div className="flex items-center space-x-2 text-neon text-glow-neon font-mono text-xs uppercase tracking-widest mb-4 font-semibold">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span>Start a Project</span>
            </div>
            <h1 className="font-grotesk text-[42px] sm:text-[64px] md:text-[80px] lg:text-[96px] uppercase leading-[1.02] text-white text-glow tracking-tight">
              TELL ME WHAT<br />
              YOU NEED<span className="text-neon text-glow-neon">.</span>
            </h1>
            <p className="font-mono text-[14px] sm:text-[17px] text-white/80 mt-6 max-w-[520px] leading-relaxed">
              Fill out the form below. I'll review it and get back to you with a clear scope and quote — no commitment.
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="relative w-full py-16 sm:py-24">
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-[680px]">
            {status === 'sent' ? (
              <div className="liquid-glass rounded-[32px] p-10 sm:p-14 text-center">
                <span className="text-5xl mb-6 block">✓</span>
                <h3 className="font-grotesk text-[28px] sm:text-[34px] uppercase text-white text-glow mb-4">
                  MESSAGE SENT
                </h3>
                <p className="font-mono text-[14px] text-white/70 leading-relaxed">
                  Thanks for reaching out. I'll review your project details and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="liquid-glass rounded-[32px] p-8 sm:p-10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-widest text-neon text-glow-neon font-bold block mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-widest text-neon text-glow-neon font-bold block mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-neon text-glow-neon font-bold block mb-2">Your Business</label>
                  <input
                    type="text"
                    name="business"
                    value={formData.business}
                    onChange={handleChange}
                    placeholder="Company or project name"
                    className={inputClass}
                  />
                </div>

                <CustomSelect
                  label="What do you need?"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  options={serviceOptions}
                  placeholder="Select a service"
                  required
                />

                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-neon text-glow-neon font-bold block mb-2">Describe your project *</label>
                  <textarea
                    name="description"
                    required
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="What are you trying to build? What problem does it solve?"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <CustomSelect
                    label="Approximate Budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    options={budgetOptions}
                    placeholder="Select range"
                  />
                  <CustomSelect
                    label="Timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    options={timelineOptions}
                    placeholder="Select timeline"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-[16px] px-8 py-4 font-grotesk text-[15px] uppercase tracking-wider bg-neon text-black hover:bg-white transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE →'}
                </button>

                {status === 'error' && (
                  <p className="font-mono text-[13px] text-red-400 text-center">
                    Something went wrong. Try again or email me directly at nithin@ssh.net.in
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* DIRECT CONTACT */}
      <section className="relative w-full py-16 sm:py-24 border-t border-white/15">
        <div className="w-full max-w-[1831px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <p className="font-mono text-[14px] text-white/50 mb-6">Prefer to reach out directly?</p>
          <div className="flex items-center justify-center space-x-6">
            <a
              href="mailto:nithin@ssh.net.in"
              className="liquid-glass rounded-[12px] px-6 py-3 font-mono text-[13px] text-white hover:text-neon hover:border-neon/40 transition-colors duration-200 border border-white/15"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/k-s-nithin/"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass rounded-[12px] px-6 py-3 font-mono text-[13px] text-white hover:text-neon hover:border-neon/40 transition-colors duration-200 border border-white/15"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Nithin0620"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass rounded-[12px] px-6 py-3 font-mono text-[13px] text-white hover:text-neon hover:border-neon/40 transition-colors duration-200 border border-white/15"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
