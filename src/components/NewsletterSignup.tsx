'use client';

import { useState } from 'react';

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'hero';
  className?: string;
}

export default function NewsletterSignup({ variant = 'default', className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.message || "You're subscribed!");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        {status === 'success' ? (
          <div className="flex items-center gap-2 text-green-400 font-condensed text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-[#444444] border border-[#444444] focus:border-[#F5A623] text-white placeholder-[#8A8A8A] text-sm font-condensed px-3 py-2 rounded outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#F5A623] hover:bg-[#F7B84B] disabled:opacity-60 text-white font-condensed font-bold text-xs tracking-widest uppercase px-4 py-2 rounded transition-colors whitespace-nowrap"
            >
              {status === 'loading' ? '…' : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-xs font-condensed mt-1">{message}</p>
        )}
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div id="newsletter" className={`bg-[#F5A623] rounded-2xl p-8 md:p-12 relative overflow-hidden ${className}`}>
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)'
          }} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white font-condensed font-bold text-xs tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            🏀 Free Newsletter
          </span>
          <h2 className="font-display text-white text-4xl md:text-5xl lg:text-6xl tracking-wider mb-3 leading-none">
            STAY IN THE GAME
          </h2>
          <p className="text-white/80 font-condensed text-lg mb-8 leading-relaxed">
            Daily college basketball coverage, bracket projections, transfer portal news, and insider analysis — straight to your inbox. Free forever.
          </p>

          {status === 'success' ? (
            <div className="bg-white/20 rounded-lg p-6 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-white font-condensed font-bold text-xl">{message}</p>
              <p className="text-white/70 font-condensed text-sm mt-1">Welcome to the Field of 68 family.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-white text-[#1C1C1C] placeholder-[#8A8A8A] font-condensed text-base px-5 py-4 rounded-lg outline-none border-2 border-transparent focus:border-[#D4891A] transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#1C1C1C] hover:bg-[#444444] disabled:opacity-60 text-white font-display text-xl tracking-widest uppercase px-8 py-4 rounded-lg transition-colors whitespace-nowrap shadow-lg"
              >
                {status === 'loading' ? 'Sending…' : 'Subscribe Free'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-white/70 text-sm font-condensed mt-3">{message}</p>
          )}
          <p className="text-white/50 text-xs font-condensed mt-4">
            No spam. Unsubscribe anytime. Join thousands of college hoops fans.
          </p>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div id="newsletter" className={`bg-[#383838] border border-[#444444] rounded-xl p-6 md:p-8 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🏀</span>
            <span className="text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase">Free Newsletter</span>
          </div>
          <h3 className="font-display text-white text-3xl md:text-4xl tracking-wider leading-none mb-2">
            THE DAILY BREAKDOWN
          </h3>
          <p className="text-[#8A8A8A] font-condensed text-sm leading-relaxed">
            College basketball news, analysis, and bracket projections every day. Free.
          </p>
        </div>

        <div className="md:w-96">
          {status === 'success' ? (
            <div className="text-center py-4">
              <p className="text-green-400 font-condensed font-bold text-lg">✓ {message}</p>
              <p className="text-[#8A8A8A] text-sm font-condensed mt-1">Thanks for subscribing!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-[#444444] border border-[#444444] focus:border-[#F5A623] text-white placeholder-[#8A8A8A] font-condensed px-4 py-3 rounded-lg outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#F5A623] hover:bg-[#F7B84B] disabled:opacity-60 text-white font-display text-xl tracking-widest uppercase py-3 rounded-lg transition-colors"
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe Free'}
              </button>
              {status === 'error' && (
                <p className="text-red-400 text-xs font-condensed text-center">{message}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
