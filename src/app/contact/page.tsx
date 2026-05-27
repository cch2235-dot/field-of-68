'use client';

import { useState } from 'react';

const AD_OPTIONS = [
  { id: 'youtube', label: 'YouTube Sponsorship', desc: 'Host-read integrations on our 75K subscriber channel' },
  { id: 'newsletter', label: 'Newsletter Sponsorship', desc: 'Placement in The Field of 68 Daily newsletter' },
  { id: 'podcast', label: 'Podcast Sponsorship', desc: 'Host-read ads on After Dark and all shows' },
  { id: 'social', label: 'Social Media Integration', desc: 'Branded content across Instagram (49K), X (154K) & TikTok' },
  { id: 'event', label: 'Live Show Sponsorship', desc: 'Branding around After Dark live events' },
  { id: 'custom', label: 'Custom Partnership', desc: 'Tell us what you have in mind' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', budget: '', message: '', interests: [] as string[],
  });

  function toggleInterest(id: string) {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="mb-10 max-w-2xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider leading-none">ADVERTISE WITH US</h1>
        </div>
        <p className="text-[#8A8A8A] font-condensed text-xl leading-relaxed mt-3">
          Reach the most passionate college basketball audience on the internet. Let's build something together.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Reach stats */}
        <div className="lg:col-span-1">
          <div className="bg-[#111111] border border-[#1A1A1A] rounded-xl p-6 mb-6">
            <h3 className="font-display text-white text-2xl tracking-wider mb-5">OUR REACH</h3>
            {[
              { stat: '75K+', label: 'YouTube Subscribers' },
              { stat: '154K+', label: 'X / Twitter Followers' },
              { stat: '49K+', label: 'Instagram Followers' },
              { stat: '1,400+', label: 'After Dark Episodes' },
              { stat: 'Daily', label: 'Newsletter Publication' },
            ].map(({ stat, label }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-[#1A1A1A] last:border-0">
                <span className="text-[#8A8A8A] font-condensed text-sm">{label}</span>
                <span className="font-display text-[#F5A623] text-xl tracking-wider">{stat}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#2B2B2B] border border-[#F5A623]/30 rounded-xl p-5">
            <h4 className="font-condensed font-bold text-white text-sm tracking-wider uppercase mb-2">Direct Contact</h4>
            <p className="text-[#8A8A8A] font-condensed text-sm mb-3">Prefer to reach out directly?</p>
            <a href="mailto:thefieldof68@gmail.com"
              className="text-[#F5A623] hover:text-[#FFBE4D] font-condensed font-bold text-sm transition-colors">
              thefieldof68@gmail.com
            </a>
          </div>
        </div>

        {/* Right: Contact form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-[#111111] border border-[#1A1A1A] rounded-xl p-12 text-center">
              <div className="text-5xl mb-4">🏀</div>
              <h3 className="font-display text-white text-3xl tracking-wider mb-3">WE GOT YOUR MESSAGE</h3>
              <p className="text-[#8A8A8A] font-condensed text-lg mb-6">
                Thanks for reaching out! Our team will be in touch within 1–2 business days.
              </p>
              <button onClick={() => setSubmitted(false)} className="text-[#F5A623] font-condensed font-bold text-sm hover:underline">
                Send another message
              </button>
            </div>
          ) : (
            <div className="bg-[#111111] border border-[#1A1A1A] rounded-xl p-6 md:p-8">
              <h3 className="font-display text-white text-2xl tracking-wider mb-6">GET PARTNERSHIP INFO</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-condensed text-[#8A8A8A] text-xs tracking-widest uppercase mb-2">Your Name *</label>
                    <input type="text" required value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#F5A623] text-white font-condensed px-4 py-3 rounded-lg outline-none transition-colors text-sm"
                      placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block font-condensed text-[#8A8A8A] text-xs tracking-widest uppercase mb-2">Company / Brand *</label>
                    <input type="text" required value={formData.company}
                      onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                      className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#F5A623] text-white font-condensed px-4 py-3 rounded-lg outline-none transition-colors text-sm"
                      placeholder="Your brand" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-condensed text-[#8A8A8A] text-xs tracking-widest uppercase mb-2">Email Address *</label>
                    <input type="email" required value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#F5A623] text-white font-condensed px-4 py-3 rounded-lg outline-none transition-colors text-sm"
                      placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="block font-condensed text-[#8A8A8A] text-xs tracking-widest uppercase mb-2">Monthly Budget</label>
                    <select value={formData.budget}
                      onChange={e => setFormData(p => ({ ...p, budget: e.target.value }))}
                      className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#F5A623] text-white font-condensed px-4 py-3 rounded-lg outline-none transition-colors text-sm">
                      <option value="">Select range</option>
                      <option value="under5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 – $10,000</option>
                      <option value="10k-25k">$10,000 – $25,000</option>
                      <option value="25k-50k">$25,000 – $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-condensed text-[#8A8A8A] text-xs tracking-widest uppercase mb-3">Interested In</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {AD_OPTIONS.map(opt => (
                      <button key={opt.id} type="button" onClick={() => toggleInterest(opt.id)}
                        className={`text-left px-4 py-3 rounded-lg border transition-all ${
                          formData.interests.includes(opt.id)
                            ? 'border-[#F5A623] bg-[#F5A623]/10'
                            : 'border-[#2E2E2E] bg-[#1A1A1A] hover:border-[#F5A623]/40'
                        }`}>
                        <div className="font-condensed font-bold text-white text-xs mb-0.5">{opt.label}</div>
                        <div className="font-condensed text-[#8A8A8A] text-xs">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-condensed text-[#8A8A8A] text-xs tracking-widest uppercase mb-2">Tell Us About Your Goals</label>
                  <textarea rows={4} value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#F5A623] text-white font-condensed px-4 py-3 rounded-lg outline-none transition-colors text-sm resize-none"
                    placeholder="What are you looking to accomplish?" />
                </div>
                <button type="submit"
                  className="w-full bg-[#F5A623] hover:bg-[#FFBE4D] text-black font-display text-xl tracking-widest uppercase py-4 rounded-lg transition-colors">
                  Send Partnership Inquiry
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
