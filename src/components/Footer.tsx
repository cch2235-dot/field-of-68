import Link from 'next/link';

const SHOWS = [
  { name: 'After Dark', href: '/shows' },
  { name: 'Goodman & Hummel', href: '/shows' },
  { name: 'A-10 Insider', href: '/shows' },
  { name: 'WCC Insider', href: '/shows' },
  { name: 'The Ground Floor', href: '/shows' },
  { name: 'Fielding the 68', href: '/shows' },
];

const SOCIALS = [
  { name: 'YouTube', href: 'https://www.youtube.com/@TheFieldOf68', icon: 'YT' },
  { name: 'Twitter / X', href: 'https://twitter.com/TheFieldOf68', icon: 'X' },
  { name: 'Instagram', href: 'https://www.instagram.com/fieldof68', icon: 'IG' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@fieldof68', icon: 'TT' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1C] border-t border-[#444444] mt-16">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img src="/logo.png" alt="Field of 68 Media Network" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-[#8A8A8A] text-sm leading-relaxed mb-6">
              The premier college basketball media network. Breaking news, analysis, shows, and everything March Madness.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={name}
                  className="w-9 h-9 rounded bg-[#444444] hover:bg-[#F5A623] flex items-center justify-center text-xs font-bold text-[#C4C4C4] hover:text-white transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-condensed font-bold text-white tracking-widest uppercase text-sm mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/videos', label: 'Videos' },
                { href: '/social', label: 'Social Feed' },
                { href: '/articles', label: 'Articles' },
                { href: '/shows', label: 'Shows' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Advertise With Us' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[#8A8A8A] hover:text-[#F5A623] text-sm transition-colors font-condensed">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shows */}
          <div>
            <h4 className="font-condensed font-bold text-white tracking-widest uppercase text-sm mb-4">Shows</h4>
            <ul className="space-y-2">
              {SHOWS.map(({ name, href }) => (
                <li key={name}>
                  <Link href={href} className="text-[#8A8A8A] hover:text-[#F5A623] text-sm transition-colors font-condensed">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-condensed font-bold text-white tracking-widest uppercase text-sm mb-4">Stay In The Loop</h4>
            <p className="text-[#8A8A8A] text-sm mb-4 leading-relaxed">
              Get daily college basketball coverage delivered to your inbox.
            </p>
            <a
              href="#newsletter"
              className="block w-full text-center bg-[#F5A623] hover:bg-[#F7B84B] text-white font-condensed font-bold tracking-widest uppercase text-sm py-3 rounded transition-colors"
            >
              Subscribe Free
            </a>
            <p className="text-[#8A8A8A] text-xs mt-3 text-center">
              Join thousands of college hoops fans.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#444444]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#8A8A8A] text-xs font-condensed">
            © {new Date().getFullYear()} The Field of 68. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/about" className="text-[#8A8A8A] hover:text-white text-xs font-condensed transition-colors">About</Link>
            <Link href="/contact" className="text-[#8A8A8A] hover:text-white text-xs font-condensed transition-colors">Contact</Link>
            <a href="https://twitter.com/TheFieldOf68" target="_blank" rel="noopener noreferrer" className="text-[#8A8A8A] hover:text-white text-xs font-condensed transition-colors">@TheFieldOf68</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
