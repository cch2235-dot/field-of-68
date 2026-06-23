'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/videos', label: 'Videos' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/teams', label: 'Teams' },
  { href: '/articles', label: 'Articles' },
  { href: '/shows', label: 'Shows' },
  { href: '/about', label: 'About' },
  { href: 'https://fieldof68.shop/', label: 'Shop', external: true },
  { href: '/contact', label: 'Advertise' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-[#F5A623] shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo — black bg box so it's always visible on gold */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <div className="bg-black rounded-lg px-2 py-1">
              <Image
                src="/logo.png"
                alt="Field of 68"
                width={120}
                height={48}
                className="h-9 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0">
            {NAV_LINKS.map(({ href, label, external }: any) => {
              const active = !external && (pathname === href || (href !== '/' && pathname.startsWith(href)));
              if (label === 'Advertise') return (
                <Link key={href} href={href}
                  className="ml-2 font-condensed font-bold text-xs tracking-widest uppercase px-4 py-2 rounded-md bg-[#2B2B2B] text-white hover:bg-black transition-colors">
                  {label}
                </Link>
              );
              if (external) return (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="font-condensed font-bold text-xs tracking-widest uppercase px-3 py-2 rounded transition-colors text-[#1A1A1A] hover:bg-black/15">
                  {label}
                </a>
              );
              return (
                <Link key={href} href={href}
                  className={`font-condensed font-bold text-xs tracking-widest uppercase px-3 py-2 rounded transition-colors ${
                    active ? 'text-[#1A1A1A] bg-black/15' : 'text-[#1A1A1A] hover:bg-black/15'
                  }`}>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2" aria-label="Menu">
            <div className="flex flex-col gap-1.5">
              <span className="block w-6 h-0.5 bg-[#1A1A1A]" style={{ transform: isOpen ? 'translateY(8px) rotate(45deg)' : '' }} />
              <span className="block w-6 h-0.5 bg-[#1A1A1A]" style={{ opacity: isOpen ? 0 : 1 }} />
              <span className="block w-6 h-0.5 bg-[#1A1A1A]" style={{ transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : '' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden bg-[#F5A623] border-t border-black/10 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label, external }: any) =>
            external ? (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                className="font-condensed font-bold text-sm tracking-widest uppercase px-3 py-3 text-[#1A1A1A] hover:bg-black/10 rounded">
                {label}
              </a>
            ) : (
              <Link key={href} href={href}
                className="font-condensed font-bold text-sm tracking-widest uppercase px-3 py-3 text-[#1A1A1A] hover:bg-black/10 rounded">
                {label}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
const NAV = [
  { href:'/', label:'Home' }, { href:'/videos', label:'Videos' },
  { href:'/rankings', label:'Rankings' }, { href:'/teams', label:'Teams' },
  { href:'/articles', label:'Articles' }, { href:'/shows', label:'Shows' },
  { href:'/about', label:'About' },
  { href:'https://fieldof68.shop/', label:'Shop', external:true },
  { href:'/contact', label:'Advertise' },
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => { setOpen(false); }, [path]);
  return (
    <header className="sticky top-0 z-50 bg-[#F5A623] shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/"><div className="bg-black rounded-lg px-2 py-1"><Image src="/logo.png" alt="Field of 68" width={120} height={48} className="h-9 w-auto" priority /></div></Link>
          <nav className="hidden lg:flex items-center">
            {NAV.map(({ href, label, external }: any) => {
              if (label === 'Advertise') return <Link key={href} href={href} className="ml-2 font-condensed font-bold text-xs tracking-widest uppercase px-4 py-2 rounded-md bg-[#2B2B2B] text-white hover:bg-black transition-colors">{label}</Link>;
              if (external) return <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="font-condensed font-bold text-xs tracking-widest uppercase px-3 py-2 rounded text-[#1A1A1A] hover:bg-black/15">{label}</a>;
              return <Link key={href} href={href} className="font-condensed font-bold text-xs tracking-widest uppercase px-3 py-2 rounded text-[#1A1A1A] hover:bg-black/15">{label}</Link>;
            })}
          </nav>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2">
            <div className="flex flex-col gap-1.5">
              <span className="block w-6 h-0.5 bg-[#1A1A1A]" style={{transform:open?'translateY(8px) rotate(45deg)':''}}/>
              <span className="block w-6 h-0.5 bg-[#1A1A1A]" style={{opacity:open?0:1}}/>
              <span className="block w-6 h-0.5 bg-[#1A1A1A]" style={{transform:open?'translateY(-8px) rotate(-45deg)':''}}/>
            </div>
          </button>
        </div>
      </div>
      <div className={`lg:hidden bg-[#F5A623] border-t border-black/10 overflow-hidden transition-all duration-300 ${open?'max-h-screen':'max-h-0'}`}>
        <div className="px-4 py-3 flex flex-col gap-1">
          {NAV.map(({ href, label, external }: any) =>
            external ? <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="font-condensed font-bold text-sm tracking-widest uppercase px-3 py-3 text-[#1A1A1A] hover:bg-black/10 rounded">{label}</a>
            : <Link key={href} href={href} className="font-condensed font-bold text-sm tracking-widest uppercase px-3 py-3 text-[#1A1A1A] hover:bg-black/10 rounded">{label}</Link>
          )}
        </div>
      </div>
    </header>
  );
}
