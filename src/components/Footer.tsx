import Link from 'next/link';
import Image from 'next/image';
export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1A1A1A] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image src="/logo.png" alt="Field of 68 Media Network" width={140} height={56} className="h-14 w-auto object-contain" />
            </Link>
            <p className="text-[#8A8A8A] text-sm leading-relaxed mb-6">The premier college basketball media network. Breaking news, analysis, shows, and everything March Madness.</p>
            <div className="flex gap-3">
              {[
                { name: 'YT', href: 'https://youtube.com/@TheFieldOf68', hover: 'hover:bg-[#FF0000]' },
                { name: 'X', href: 'https://twitter.com/TheFieldOf68', hover: 'hover:bg-white hover:text-black' },
                { name: 'IG', href: 'https://instagram.com/fieldof68', hover: 'hover:bg-pink-500' },
              ].map(({ name, href, hover }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                  className={`w-9 h-9 rounded bg-[#1A1A1A] ${hover} flex items-center justify-center text-xs font-bold text-[#C4C4C4] hover:text-white transition-all duration-200`}>
                  {name}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-condensed font-bold text-white tracking-widest uppercase text-sm mb-4">Explore</h4>
            <ul className="space-y-2">
              {[['/', 'Home'],['/videos','Videos'],['/social','Social Feed'],['/articles','Articles'],['/shows','Shows'],['/about','About'],['/contact','Advertise']].map(([href, label]) => (
                <li key={href}><Link href={href} className="text-[#8A8A8A] hover:text-[#F5A623] text-sm transition-colors font-condensed">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-condensed font-bold text-white tracking-widest uppercase text-sm mb-4">Shows</h4>
            <ul className="space-y-2">
              {['After Dark','GHM Podcast','Shooters Shoot!','A-10 Insider','Mountain West Insider','WCC Insider','ACC Insider','Ground Floor'].map(name => (
                <li key={name}><Link href="/shows" className="text-[#8A8A8A] hover:text-[#F5A623] text-sm transition-colors font-condensed">{name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-condensed font-bold text-white tracking-widest uppercase text-sm mb-4">The Daily Newsletter</h4>
            <p className="text-[#8A8A8A] text-sm mb-4 leading-relaxed">Daily college basketball coverage — transfer portal, recruiting, coaching carousel. $4.99/mo.</p>
            <a href="https://fieldof68.beehiiv.com/upgrade" target="_blank" rel="noopener noreferrer"
              className="block w-full text-center bg-[#F5A623] hover:bg-[#FFBE4D] text-black font-condensed font-bold tracking-widest uppercase text-sm py-3 rounded transition-colors">
              Subscribe — $4.99/mo
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#8A8A8A] text-xs font-condensed">© {new Date().getFullYear()} The Field of 68 Media Network. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/about" className="text-[#8A8A8A] hover:text-white text-xs font-condensed transition-colors">About</Link>
            <Link href="/contact" className="text-[#8A8A8A] hover:text-white text-xs font-condensed transition-colors">Contact</Link>
            <a href="mailto:thefieldof68@gmail.com" className="text-[#8A8A8A] hover:text-white text-xs font-condensed transition-colors">thefieldof68@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
