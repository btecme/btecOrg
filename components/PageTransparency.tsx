'use client';

import { usePathname } from 'next/navigation';
import TransparencyConsole from './TransparencyConsole';

/** Keep the homepage's complementary console after its content in DOM and focus
 * order. Other routes retain their existing before-content placement. */
export default function PageTransparency({ position }: { position: 'before' | 'after' }) {
  const home = usePathname() === '/';
  return (position === 'after') === home ? <TransparencyConsole /> : null;
}
