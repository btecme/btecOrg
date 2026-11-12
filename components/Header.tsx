"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
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
          { name: 'BDF', href: '/bdf' },
          { name: 'Open Storage Platform (OSP)', href: '/osp' },
          { name: 'SHOW', href: '/show' },
        ],
      },
      {
        heading: 'Services',
        links: [
          { name: 'Alignment', href: '/alignment' },
          { name: 'Websites & Domains', href: '/services/websites-domains' },
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
          { name: 'Standards', href: '/standards' },
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

function Chevron({ open }: { open: boolean }) {
  return <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ transform: open ? 'rotate(180deg)' : undefined }}><path d="m6 9 6 6 6-6" strokeWidth="1.5" /></svg>;
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [previousPath, setPreviousPath] = useState(pathname);
  if (previousPath !== pathname) {
    setPreviousPath(pathname);
    setMobileOpen(false);
    setMobileSection(null);
    setDropdown(null);
  }
  const closeMenus = () => { setMobileOpen(false); setDropdown(null); setMobileSection(null); };
  const cancelClose = () => { if (timer.current) clearTimeout(timer.current); };
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) { setDropdown(null); setMobileOpen(false); } };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const expanded = headerRef.current?.querySelector<HTMLButtonElement>('.nav-control[aria-expanded="true"]');
      if (expanded) expanded.focus();
      if (mobileOpen) toggleRef.current?.focus();
      setDropdown(null); setMobileOpen(false);
    };
    const wide = window.matchMedia('(min-width: 901px)');
    const resize = () => { setMobileOpen(false); setDropdown(null); };
    wide.addEventListener('change', resize);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { wide.removeEventListener('change', resize); document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [mobileOpen]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="site-shell header-frame">
        <Link href="/" className="header-brand" aria-label="b-tec home" onClick={closeMenus}><Image src="/b-tecLogo-Transparency.png" alt="b-tec" width={165} height={65} className="header-logo" priority /></Link>
        <nav className="desktop-navigation" aria-label="Main navigation">
          {navItems.map(item => {
            if (!isGroup(item)) return <Link key={item.name} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} className={`nav-control ${item.name === 'Contact' ? 'contact-link' : ''}`}>{item.name}{item.name === 'Contact' && <span aria-hidden="true">↗</span>}</Link>;
            const open = dropdown === item.name;
            const id = `desktop-${item.name.toLowerCase()}`;
            return <div key={item.name} className="nav-dropdown-wrap" onMouseEnter={() => { cancelClose(); setDropdown(item.name); }} onMouseLeave={() => { cancelClose(); timer.current = setTimeout(() => { if (!headerRef.current?.querySelector(`#${id}`)?.parentElement?.contains(document.activeElement)) setDropdown(null); }, 180); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setDropdown(null); }}>
              <button type="button" className={`nav-control ${groupHrefs(item).includes(pathname) ? 'is-active' : ''}`} aria-expanded={open} aria-controls={id} onClick={() => { cancelClose(); setDropdown(open ? null : item.name); }} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); setDropdown(item.name); requestAnimationFrame(() => document.getElementById(id)?.querySelector('a')?.focus()); } }}>{item.name}<Chevron open={open} /></button>
              {open && <div id={id} className="nav-dropdown"><div className="nav-dropdown-panel">{item.columns.map((col,index) => <div key={index}>{col.heading && <h2>{col.heading}</h2>}<ul>{col.links.map(link => <li key={link.href}><Link href={link.href} aria-current={pathname === link.href.split('#')[0] ? 'page' : undefined} onClick={closeMenus}>{link.name}</Link></li>)}</ul></div>)}</div></div>}
            </div>;
          })}
        </nav>
        <button ref={toggleRef} type="button" className="mobile-toggle" aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} onClick={() => setMobileOpen(!mobileOpen)}><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={mobileOpen ? 'm6 6 12 12M6 18 18 6' : 'M4 7h16M4 12h16M4 17h16'} /></svg></button>
      </div>
      {mobileOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{navItems.map(item => {
        if (!isGroup(item)) return <Link key={item.name} href={item.href} onClick={closeMenus} aria-current={pathname === item.href ? 'page' : undefined}>{item.name}</Link>;
        const open = mobileSection === item.name;
        return <div className="mobile-section" key={item.name}><button type="button" aria-expanded={open} aria-controls={`mobile-${item.name.toLowerCase()}`} onClick={() => setMobileSection(open ? null : item.name)}>{item.name}<Chevron open={open} /></button>{open && <div id={`mobile-${item.name.toLowerCase()}`} className="mobile-section-content">{item.columns.map((col,index) => <div key={index}>{col.heading && <h2>{col.heading}</h2>}{col.links.map(link => <Link key={link.href} href={link.href} onClick={closeMenus} aria-current={pathname === link.href.split('#')[0] ? 'page' : undefined}>{link.name}</Link>)}</div>)}</div>}</div>;
      })}</nav>}
    </header>
  );
}
