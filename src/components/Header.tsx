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
      {/* Breaking news ticker */}
      <div className="bg-[#2B2B2B] text-[#F5A623] text-xs font-condensed font-semibold tracking-widest py-1.5 overflow-hidden border-b border-[#F5A623]/20">
        <div className="ticker-wrap">
          <div className="ticker-content">
            <span className="mx-8">🏀 THE FIELD OF 68 — WHERE COLLEGE BASKETBALL HAPPENS</span>
            <span className="mx-8">▸ AFTER DARK BACK EVERY NIGHT WHEN THE SEASON STARTS</span>
            <span className="mx-8">▸ TRANSFER PORTAL COVERAGE ALL OFFSEASON LONG</span>
            <span className="mx-8">▸ SUBSCRIBE TO THE FIELD OF 68 DAILY NEWSLETTER — FREE</span>
            <span className="mx-8">▸ FOLLOW @THEFIELDOF68 ON X, INSTAGRAM & TIKTOK</span>
            <span className="mx-8">🏀 THE FIELD OF 68 — WHERE COLLEGE BASKETBALL HAPPENS</span>
            <span className="mx-8">▸ AFTER DARK BACK EVERY NIGHT WHEN THE SEASON STARTS</span>
            <span className="mx-8">▸ TRANSFER PORTAL COVERAGE ALL OFFSEASON LONG</span>
            <span className="mx-8">▸ SUBSCRIBE TO THE FIELD OF 68 DAILY NEWSLETTER — FREE</span>
            <span className="mx-8">▸ FOLLOW @THEFIELDOF68 ON X, INSTAGRAM & TIKTOK</span>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.8)]' : 'bg-[#0A0A0A]'
      } border-b border-[#2B2B2B]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 group">
              <Image
                src="/logo.png"
                alt="Field of 68 Media Network"
                width={160}
                height={64}
                className="h-12 md:h-14 w-auto object-contain group-hover:opacity-90 transition-opacity"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const active = pathname === href || (href !== '/' && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-3 py-2 font-condensed font-semibold text-sm tracking-wider uppercase transition-colors relative group ${
                      active ? 'text-[#F5A623]' : 'text-[#C4C4C4] hover:text-white'
                    } ${label === 'Advertise'
                      ? '!text-[#F5A623] border border-[#F5A623] rounded px-4 hover:bg-[#F5A623] hover:!text-black ml-2'
                      : ''}`}
                  >
                    {label}
                    {label !== 'Advertise' && (
                      <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-[#F5A623] transform transition-transform origin-left ${
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`} />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] border-t border-[#2B2B2B]' : 'max-h-0'
        } bg-[#111111]`}>
          <nav className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link key={href} href={href}
                  className={`px-4 py-3 font-condensed font-semibold text-base tracking-widest uppercase rounded transition-colors ${
                    active ? 'text-[#F5A623] bg-[#1A1A1A]' : 'text-[#C4C4C4] hover:text-white hover:bg-[#1A1A1A]'
                  }`}>
                  {label}
                </Link>
              );
            })}
            <div className="mt-3 pt-3 border-t border-[#242424] flex gap-4">
              <a href="https://www.youtube.com/@TheFieldOf68" target="_blank" rel="noopener noreferrer" className="text-[#8A8A8A] hover:text-[#FF0000] transition-colors text-sm font-condensed">YouTube</a>
              <a href="https://twitter.com/TheFieldOf68" target="_blank" rel="noopener noreferrer" className="text-[#8A8A8A] hover:text-white transition-colors text-sm font-condensed">X / Twitter</a>
              <a href="https://www.instagram.com/fieldof68" target="_blank" rel="noopener noreferrer" className="text-[#8A8A8A] hover:text-pink-400 transition-colors text-sm font-condensed">Instagram</a>
              <a href="https://www.tiktok.com/@fieldof68" target="_blank" rel="noopener noreferrer" className="text-[#8A8A8A] hover:text-[#69C9D0] transition-colors text-sm font-condensed">TikTok</a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
