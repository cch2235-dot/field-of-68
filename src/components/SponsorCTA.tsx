import Link from 'next/link';
import Image from 'next/image';
interface Props { variant?: 'banner' | 'section'; className?: string; }
export default function SponsorCTA({ variant = 'section', className = '' }: Props) {
  if (variant === 'banner') {
    return (
      <div className={`bg-[#111111] border border-[#F5A623]/30 rounded-lg px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${className}`}>
        <div>
          <p className="text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase mb-0.5">Partnership Opportunity</p>
          <p className="text-white font-condensed font-semibold text-sm">Want to reach college basketball fans nationwide?</p>
        </div>
        <Link href="/contact" className="flex-shrink-0 bg-[#F5A623] hover:bg-[#FFBE4D] text-black font-condensed font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors whitespace-nowrap">Partner With Us</Link>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#111111] border border-[#1A1A1A] p-8 md:p-12 ${className}`}>
      <div className="absolute top-4 right-8 opacity-10 select-none pointer-events-none hidden lg:block">
        <Image src="/logo.png" alt="" width={200} height={80} className="w-48 h-auto" />
      </div>
      <div className="relative z-10 max-w-2xl">
        <span className="inline-block bg-[#F5A623]/20 text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">Partnerships & Advertising</span>
        <h2 className="font-display text-white text-4xl md:text-5xl tracking-wider leading-none mb-4">WANT TO PARTNER WITH THE FIELD OF 68?</h2>
        <p className="text-[#8A8A8A] font-condensed text-lg leading-relaxed mb-8 max-w-xl">Reach hundreds of thousands of passionate college basketball fans across YouTube, X/Twitter, and our newsletter. Tell your story where the conversation happens.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { stat: '75K+', label: 'YouTube Subscribers' },
            { stat: '154K+', label: 'X / Twitter Followers' },
            { stat: '49K+', label: 'Instagram Followers' },
            { stat: '800+', label: 'Newsletter Subscribers' },
          ].map(({ stat, label }) => (
            <div key={label} className="bg-[#1A1A1A] rounded-lg p-4 text-center">
              <div className="font-display text-[#F5A623] text-3xl tracking-wider leading-none mb-1">{stat}</div>
              <div className="text-[#8A8A8A] font-condensed text-xs uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#FFBE4D] text-black font-display text-xl tracking-widest uppercase px-8 py-4 rounded-lg transition-colors">
            Get Partnership Info
          </Link>
          <a href="mailto:thefieldof68@gmail.com" className="inline-flex items-center justify-center gap-2 bg-transparent border border-[#2E2E2E] hover:border-[#F5A623] text-[#C4C4C4] hover:text-white font-condensed font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-lg transition-all">
            thefieldof68@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
