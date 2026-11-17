'use client';

import { usePathname } from 'next/navigation';
import TransparencyConsole from './TransparencyConsole';

/** Keep homepage and Contact content before the complementary console in DOM
 * and focus order. Other routes retain their existing placement. */
export default function PageTransparency({ position }: { position: 'before' | 'after' }) {
  const pathname = usePathname();
  const contentFirst = pathname === '/' || pathname === '/contact' || pathname === '/privacy';
  return (position === 'after') === contentFirst ? <TransparencyConsole /> : null;
}
