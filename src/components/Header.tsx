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
  const pathname = usePathname();
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-[#F5A623] shadow-[0_2px_16px_rgba(0,0,0,0.25)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo — small, crisp, transparent PNG on gold */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/logo.png"
              alt="Field of 68"
              width={120}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href));
              if (label === 'Advertise') return (
                <Link key={href} href={href}
                  className="ml-3 font-condensed font-bold text-xs tracking-widest uppercase px-4 py-2 rounded-md bg-[#2B2B2B] text-white hover:bg-black transition-colors">
                  {label}
                </Link>
              );
              return (
                <Link key={href} href={href}
                  className={`font-condensed font-bold text-xs tracking-widest uppercase px-3 py-2 rounded transition-colors ${
                    active ? 'text-[#2B2B2B] bg-black/10' : 'text-[#2B2B2B] hover:bg-black/10'
                  }`}>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2" aria-label="Menu">
            <div className="w-5 h-0.5 bg-[#2B2B2B] mb-1.5 transition-all" style={{ transform: isOpen ? 'translateY(8px) rotate(45deg)' : '' }} />
            <div className="w-5 h-0.5 bg-[#2B2B2B] mb-1.5 transition-all" style={{ opacity: isOpen ? 0 : 1 }} />
            <div className="w-5 h-0.5 bg-[#2B2B2B] transition-all" style={{ transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : '' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden bg-[#F5A623] border-t border-black/10 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}
              className="font-condensed font-bold text-sm tracking-widest uppercase px-3 py-3 text-[#2B2B2B] hover:bg-black/10 rounded transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
