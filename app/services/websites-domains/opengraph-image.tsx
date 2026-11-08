import { ImageResponse } from 'next/og';

export const alt = 'Your website. Your domain. Handled. Professional websites from $400. One-time build; ongoing services quoted separately.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(<div style={{ display: 'flex', width: '100%', height: '100%', background: '#080e13', color: '#edf4f7', padding: '60px', fontFamily: 'sans-serif', flexDirection: 'column', borderTop: '10px solid #00d4ff' }}><div style={{ display: 'flex', justifyContent: 'space-between', color: '#00d4ff', fontSize: 24 }}><span>b-tec</span><span>Websites &amp; Domains</span></div><div style={{ display: 'flex', marginTop: 44, gap: 70, alignItems: 'center' }}><div style={{ display: 'flex', flexDirection: 'column', fontSize: 72, letterSpacing: -4, lineHeight: 1.07 }}><span>Your website.</span><span>Your domain.</span><span style={{ color: '#00d4ff' }}>Handled.</span></div><div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid #386276', paddingLeft: 45, maxWidth: 400 }}><span style={{ fontSize: 26 }}>Professional websites from</span><span style={{ fontSize: 94, marginTop: 10 }}>$400</span><span style={{ fontSize: 22, lineHeight: 1.5, color: '#a1b3bf' }}>One-time build; ongoing services quoted separately.</span></div></div><div style={{ display: 'flex', marginTop: 'auto', paddingTop: 26, borderTop: '1px solid #386276', fontSize: 23, justifyContent: 'space-between' }}><span>Inform → Sell → Operate</span><span>One trusted contact.</span></div></div>, size);
}
