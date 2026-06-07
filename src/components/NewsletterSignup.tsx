'use client';
import { useState } from 'react';
interface Props { variant?: 'default' | 'compact' | 'hero'; className?: string; }
export default function NewsletterSignup({ variant = 'default', className = '' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (data.success) { setStatus('success'); setMessage(data.message || "You're subscribed!"); setEmail(''); }
      else { setStatus('error'); setMessage(data.message || 'Something went wrong.'); }
    } catch { setStatus('error'); setMessage('Something went wrong. Please try again.'); }
  }
  if (variant === 'hero') {
    return (
      <div id="newsletter" className={`bg-[#F5A623] rounded-2xl p-8 md:p-12 relative overflow-hidden ${className}`}>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="font-display text-black text-4xl md:text-5xl lg:text-6xl tracking-wider mb-3 leading-none">STAY IN THE GAME</h2>
          <p className="text-black/70 font-condensed text-lg mb-2 leading-relaxed">Daily college basketball coverage — transfer portal, recruiting, coaching carousel, and more.</p>
          <p className="text-black/60 font-condensed text-sm mb-8">Subscribe to The Field of 68 Daily for $4.99/mo.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <a href="https://fieldof68.beehiiv.com/upgrade" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center bg-[#2B2B2B] hover:bg-[#1A1A1A] text-white font-display text-xl tracking-widest uppercase px-8 py-4 rounded-lg transition-colors">
              Subscribe — $4.99/mo
            </a>
            <a href="https://fieldof68.beehiiv.com/subscribe" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center bg-white/20 hover:bg-white/30 text-black font-condensed font-bold text-sm tracking-widest uppercase px-6 py-4 rounded-lg transition-colors whitespace-nowrap">
              Free Preview
            </a>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div id="newsletter" className={`bg-[#111111] border border-[#1A1A1A] rounded-xl p-6 md:p-8 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <span className="text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase">The Field of 68 Daily — $4.99/mo</span>
          <h3 className="font-display text-white text-3xl md:text-4xl tracking-wider leading-none mb-2 mt-1">THE DAILY BREAKDOWN</h3>
          <p className="text-[#8A8A8A] font-condensed text-sm leading-relaxed">College basketball news, analysis, and bracket projections every day.</p>
        </div>
        <div className="md:w-72">
          <a href="https://fieldof68.beehiiv.com/upgrade" target="_blank" rel="noopener noreferrer"
            className="block w-full text-center bg-[#F5A623] hover:bg-[#FFBE4D] text-black font-display text-xl tracking-widest uppercase py-3 rounded-lg transition-colors">
            Subscribe — $4.99/mo
          </a>
        </div>
      </div>
    </div>
  );
}
