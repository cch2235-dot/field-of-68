'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/videos', label: 'Videos' },
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
    <>
      <div className="bg-[#F5A623] py-2.5 flex items-center justify-center">
        <Link href="/">
          <Image src="/logo.png" alt="Field of 68 Media Network" width={140} height={56} className="h-12 w-auto object-contain" priority />
        </Link>
      </div>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.8)]' : 'bg-[#0A0A0A]'} border-b border-[#2B2B2B]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center flex-shrink-0 group">
              <Image src="/logo.png" alt="Field of 68 Media Network" width={160} height={64} className="h-12 md:h-14 w-auto object-contain group-hover:opacity-90 transition-opacity" priority />
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const active = pathname === href || (href !== '/' && pathname.startsWith(href));
                return (
                  <Link key={href} href={href}
                    className={`px-3 py-2 font-condensed font-semibold text-sm tracking-wider uppercase transition-colors relative group ${active ? 'text-[#F5A623]' : 'text-[#C4C4C4] hover:text-white'} ${label === 'Advertise' ? '!text-[#F5A623] border border-[#F5A623] rounded px-4 hover:bg-[#F5A623] hover:!text-black ml-2' : ''}`}>
                    {label}
                    {label !== 'Advertise' && <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-[#F5A623] transform transition-transform origin-left ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />}
                  </Link>
                );
              })}
            </nav>
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5" aria-label="Toggle menu">
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] border-t border-[#2B2B2B]' : 'max-h-0'} bg-[#111111]`}>
          <nav className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href));
              return <Link key={href} href={href} className={`px-4 py-3 font-condensed font-semibold text-base tracking-widest uppercase rounded transition-colors ${active ? 'text-[#F5A623] bg-[#1A1A1A]' : 'text-[#C4C4C4] hover:text-white hover:bg-[#1A1A1A]'}`}>{label}</Link>;
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
