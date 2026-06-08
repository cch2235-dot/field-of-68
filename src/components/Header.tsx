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
  { href: '/social', label: 'Social Feed' },
  { href: '/articles', label: 'Articles' },
  { href: '/shows', label: 'Shows' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Advertise' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 bg-[#F5A623] ${scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.3)]' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center flex-shrink-0 group">
            <Image
              src="/logo.png"
              alt="Field of 68 Media Network"
              width={160}
              height={64}
              className="h-12 md:h-14 w-auto object-contain group-hover:opacity-90 transition-opacity"
              style={{ mixBlendMode: 'multiply' }}
              priority
            />
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link key={href} href={href}
                  className={`px-3 py-2 font-condensed font-bold text-sm tracking-wider uppercase transition-colors rounded relative ${
                    label === 'Advertise'
                      ? 'bg-[#2B2B2B] text-white hover:bg-black px-5 ml-2'
                      : active
                      ? 'text-[#2B2B2B] bg-[#F5A623]/40'
                      : 'text-[#2B2B2B] hover:bg-black/10'
                  }`}>
                  {label}
                </Link>
              );
            })}
          </nav>
          <button onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu">
            <span className={`block w-6 h-0.5 bg-[#2B2B2B] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#2B2B2B] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#2B2B2B] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] border-t border-black/10' : 'max-h-0'} bg-[#F5A623]`}>
        <nav className="px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link key={href} href={href}
                className={`px-4 py-3 font-condensed font-bold text-base tracking-widest uppercase rounded transition-colors ${
                  active ? 'bg-black/10 text-[#2B2B2B]' : 'text-[#2B2B2B] hover:bg-black/10'
                }`}>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
