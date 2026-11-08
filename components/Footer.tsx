'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const email = pathname?.startsWith('/show') ? 'hello@theshowdata.com' : 'hello@b-tec.org';
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="footer-main">
          <div className="footer-brand"><Link href="/" aria-label="b-tec home"><Image src="/b-tecLogo-Transparency.png" alt="b-tec" width={160} height={64} className="footer-logo" /></Link><p>Adding Value.<br />Building Trust.</p><a href={`mailto:${email}`}>{email} <span aria-hidden="true">↗</span></a></div>
          <div><h2>Products</h2><Link href="/base">BASE</Link><Link href="/bdf">BDF</Link><Link href="/osp">OSP</Link><Link href="/show">SHOW</Link></div>
          <div><h2>Practice</h2><Link href="/services">Services</Link><Link href="/services/websites-domains">Websites &amp; Domains</Link><Link href="/alignment">Alignment</Link><Link href="/first-principles">First Principles</Link><Link href="/contact">Contact</Link></div>
          <div><h2>Explore</h2><Link href="/about">About b-tec</Link><Link href="/research">Research</Link><Link href="/blog">Blog</Link></div>
        </div>
        <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} btec LLC. All rights reserved.</p><span>Human direction. Lasting value.</span></div>
      </div>
    </footer>
  );
}
