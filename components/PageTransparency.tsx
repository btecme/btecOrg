'use client';

import { usePathname } from 'next/navigation';
import TransparencyConsole from './TransparencyConsole';

/** Contact is focused on the inquiry form; disclosures remain on Privacy.
 * Other routes retain their existing console placement and state. */
export default function PageTransparency({ position }: { position: 'before' | 'after' }) {
  const pathname = usePathname();
  if (pathname === '/contact') return null;
  const contentFirst = pathname === '/' || pathname === '/privacy';
  return (position === 'after') === contentFirst ? <TransparencyConsole /> : null;
}
