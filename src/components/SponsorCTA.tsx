import Link from 'next/link';

interface SponsorCTAProps {
  variant?: 'banner' | 'section';
  className?: string;
}

export default function SponsorCTA({ variant = 'section', className = '' }: SponsorCTAProps) {
  if (variant === 'banner') {
    return (
      <div className={`bg-[#383838] border border-[#F5A623]/30 rounded-lg px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${className}`}>
        <div>
          <p className="text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase mb-0.5">Partnership Opportunity</p>
          <p className="text-white font-condensed font-semibold text-sm">Want to reach college basketball fans nationwide?</p>
        </div>
        <Link
          href="/contact"
          className="flex-shrink-0 bg-[#F5A623] hover:bg-[#F7B84B] text-white font-condensed font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors whitespace-nowrap"
        >
          Partner With Us
        </Link>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#383838] border border-[#444444] p-8 md:p-12 ${className}`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
        <div className="font-display text-[#F5A623] text-[200px] leading-none select-none">68</div>
      </div>

      <div className="relative z-10 max-w-2xl">
        <span className="inline-block bg-[#F5A623]/20 text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">
          Partnerships & Advertising
        </span>
        <h2 className="font-display text-white text-4xl md:text-5xl tracking-wider leading-none mb-4">
          WANT TO PARTNER WITH THE FIELD OF 68?
        </h2>
        <p className="text-[#8A8A8A] font-condensed text-lg leading-relaxed mb-8 max-w-xl">
          Reach millions of passionate college basketball fans across YouTube, Instagram, TikTok, Twitter/X, and our newsletter. Tell your story where the conversation happens.
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { stat: '1M+', label: 'YouTube Views/Mo' },
            { stat: '154K+' },
            { stat: '49K+' },
            { stat: '#1 CBB Network' },
          ].map(({ stat, label }) => (
            <div key={label} className="bg-[#444444] rounded-lg p-4 text-center">
              <div className="font-display text-[#F5A623] text-3xl tracking-wider leading-none mb-1">{stat}</div>
              <div className="text-[#8A8A8A] font-condensed text-xs uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#F7B84B] text-white font-display text-xl tracking-widest uppercase px-8 py-4 rounded-lg transition-colors shadow-lg shadow-yellow-900/20"
          >
            Get Partnership Info
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="mailto:thefieldof68@gmail.com"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-[#444444] hover:border-[#F5A623] text-[#C4C4C4] hover:text-white font-condensed font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-lg transition-all"
          >
            Email Us Directly
          </a>
        </div>
      </div>
    </div>
  );
}
