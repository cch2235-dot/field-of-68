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
          {/* Logo — dark version for gold bar */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/logo-nav.png"
              alt="Field of 68"
              width={140}
              height={56}
              className="h-11 w-auto object-contain"
              priority
            />
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
                  className="font-condensed font-bold text-xs tracking-widest uppercase px-3 py-2 rounded transition-colors text-[#1A1A1A] hover:bg-black/10">
                  {label}
                </a>
              );
              return (
                <Link key={href} href={href}
                  className={`font-condensed font-bold text-xs tracking-widest uppercase px-3 py-2 rounded transition-colors ${
                    active ? 'text-[#1A1A1A] bg-black/10' : 'text-[#1A1A1A] hover:bg-black/10'
                  }`}>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2" aria-label="Menu">
            <div className="flex flex-col gap-1.5">
              <span className="block w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300" style={{ transform: isOpen ? 'translateY(8px) rotate(45deg)' : '' }} />
              <span className="block w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300" style={{ opacity: isOpen ? 0 : 1 }} />
              <span className="block w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300" style={{ transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : '' }} />
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
                className="font-condensed font-bold text-sm tracking-widest uppercase px-3 py-3 text-[#1A1A1A] hover:bg-black/10 rounded transition-colors">
                {label}
              </a>
            ) : (
              <Link key={href} href={href}
                className="font-condensed font-bold text-sm tracking-widest uppercase px-3 py-3 text-[#1A1A1A] hover:bg-black/10 rounded transition-colors">
                {label}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
