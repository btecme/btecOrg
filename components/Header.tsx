'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLink = { name: string; href: string };
type NavGroup = { name: string; columns: { heading: string; links: NavLink[] }[] };
type NavItem = NavLink | NavGroup;

function isGroup(item: NavItem): item is NavGroup {
  return (item as NavGroup).columns !== undefined;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Offerings',
    columns: [
      {
        heading: 'Products',
        links: [
          { name: 'BASE', href: '/base' },
          { name: 'Open Storage Platform (OSP)', href: '/osp' },
        ],
      },
      {
        heading: 'Services',
        links: [
          { name: 'Alignment', href: '/alignment' },
          { name: 'Cloud & IT Solutions', href: '/services#cloud-it-solutions' },
          { name: 'Security Consulting', href: '/services#security-consulting' },
          { name: 'Hardware Support', href: '/services#hardware-support' },
          { name: 'General Tech Consulting', href: '/services#general-tech-consulting' },
          { name: 'Design & Construction', href: '/services#design-construction' },
          { name: 'View All Services', href: '/services' },
        ],
      },
    ],
  },
  {
    name: 'About',
    columns: [
      {
        heading: '',
        links: [
          { name: 'About', href: '/about' },
          { name: 'First Principles', href: '/first-principles' },
        ],
      },
    ],
  },
  { name: 'Blog', href: '/blog' },
  { name: 'Research', href: '/research' },
  { name: 'Contact', href: '/contact' },
];

function groupHrefs(group: NavGroup): string[] {
  return group.columns.flatMap((c) => c.links.map((l) => l.href.split('#')[0]));
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset transient nav state when the route changes. Done during render
  // (React's documented pattern for "reset state on prop change") rather
  // than in an effect, so it doesn't trigger cascading-render lint errors.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
    setMobileOpenSection(null);
    setOpenDropdown(null);
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenDropdown(null);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="pb-4 hover:opacity-80 transition-opacity">
          <Image src="/b-tecLogo-Transparency.png" alt="b-tec logo" width={220} height={70} className="h-20 w-auto" priority />
        </Link>

        {/* Desktop Nav */}
        <nav ref={navRef} className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            if (!isGroup(item)) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-accent ${pathname === item.href ? 'text-accent' : 'text-foreground/80'
                    }`}
                >
                  {item.name}
                </Link>
              );
            }

            const isOpen = openDropdown === item.name;
            const isActive = groupHrefs(item).includes(pathname);

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => {
                  clearCloseTimer();
                  setOpenDropdown(item.name);
                }}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent ${isActive ? 'text-accent' : 'text-foreground/80'
                    }`}
                >
                  {item.name}
                  <svg
                    className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div
                    role="menu"
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                  >
                    <div className="flex gap-8 rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl p-6 min-w-[280px]">
                      {item.columns.map((col, i) => (
                        <div key={i} className="min-w-[160px]">
                          {col.heading && (
                            <p className="text-xs font-mono tracking-widest text-foreground/40 mb-3 uppercase">
                              {col.heading}
                            </p>
                          )}
                          <ul className="space-y-2">
                            {col.links.map((link) => (
                              <li key={link.name}>
                                <Link
                                  href={link.href}
                                  role="menuitem"
                                  className={`block text-sm transition-colors hover:text-accent whitespace-nowrap ${pathname === link.href.split('#')[0]
                                      ? 'text-accent'
                                      : 'text-foreground/80'
                                    }`}
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {link.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground hover:text-accent focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col space-y-1 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto">
          {navItems.map((item) => {
            if (!isGroup(item)) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`py-3 text-lg font-medium transition-colors hover:text-accent ${pathname === item.href ? 'text-accent' : 'text-foreground/80'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            }

            const sectionOpen = mobileOpenSection === item.name;

            return (
              <div key={item.name} className="border-b border-white/5 last:border-0">
                <button
                  type="button"
                  aria-expanded={sectionOpen}
                  onClick={() => setMobileOpenSection(sectionOpen ? null : item.name)}
                  className="w-full flex items-center justify-between py-3 text-lg font-medium text-foreground/80 hover:text-accent transition-colors"
                >
                  {item.name}
                  <svg
                    className={`w-4 h-4 transition-transform ${sectionOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {sectionOpen && (
                  <div className="pb-3 pl-4 space-y-4">
                    {item.columns.map((col, i) => (
                      <div key={i}>
                        {col.heading && (
                          <p className="text-xs font-mono tracking-widest text-foreground/40 mb-2 uppercase">
                            {col.heading}
                          </p>
                        )}
                        <ul className="space-y-2">
                          {col.links.map((link) => (
                            <li key={link.name}>
                              <Link
                                href={link.href}
                                className="block text-base text-foreground/70 hover:text-accent transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
}
