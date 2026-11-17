import type { Metadata } from 'next';
import Link from 'next/link';
import PreferenceReset from '@/components/PreferenceReset';

export const metadata: Metadata = { title: 'Privacy & Site Preferences | b-tec', description: 'How b-tec.org uses browser preferences, handles inquiries and loads site resources.' };

export default function Privacy() {
  return <article className="site-shell privacy-page">
    <header className="privacy-intro">
      <p className="eyebrow">Your browser. Your choices.</p>
      <h1>Privacy &amp;<br />Site Preferences</h1>
      <p>Here is what this site saves in your browser, where requests go, and how to change your preferences.</p>
      <a className="button-text" href="#data-console">Explore the Data console <span aria-hidden="true">↗</span></a>
    </header>
    <section aria-labelledby="browser-preferences">
      <p className="eyebrow">01 / On this device</p>
      <h2 id="browser-preferences">Browser preferences</h2>
      <p>The lower-right toolbar lets you change appearance and background motion independently. These choices are not submitted with inquiries or uploaded by the preference controls.</p>
      <dl className="privacy-preferences">
        <div><dt>Appearance</dt><dd>System follows your operating system, including changes while the page is open. Light or Dark saves an explicit override in localStorage under <code>btec-appearance</code>. Choose System to remove that override.</dd></div>
        <div><dt>Motion</dt><dd>Motion saves an on/off choice in localStorage under <code>btec-background-motion</code>. Toggle it in the toolbar or use the reset below to remove the saved choice. The site default is on; reduced motion suppresses automatic glitch bursts and nonessential CSS animation. The existing pointer/scroll effect remains available. On some small-screen browsers the background is static and Motion is hidden.</dd></div>
      </dl>
      <p>Saved choices have no automatic expiry in this site&apos;s code. They remain for this site in this browser profile until you change or reset them, clear site data, or your browser removes them. Private browsing and blocked storage may limit persistence. If storage is unavailable, the controls still work for the current page.</p>
      <PreferenceReset />
    </section>
    <section aria-labelledby="hosting-requests">
      <p className="eyebrow">02 / Loading the site</p>
      <h2 id="hosting-requests">Hosting requests and logs</h2>
      <p>Page and asset requests reach our hosting provider, Vercel. Requests can include your IP address, browser headers and the requested URL. We have not verified the host&apos;s logging settings or retention periods; the Data console cannot show those server-side records.</p>
      <p>The inspected site code contains no analytics SDK or advertising pixel. That does not describe everything a hosting provider, external service or browser extension may do. The Data console displays browser readings locally; it does not upload or save those readings or visit history.</p>
    </section>
    <section aria-labelledby="privacy-inquiries">
      <p className="eyebrow">03 / Starting a conversation</p>
      <h2 id="privacy-inquiries">Inquiries</h2>
      <p>Submitting the <Link href="/contact">Contact form</Link> sends your name, email, message and any company or service selection to Formspree to handle your inquiry. Formspree acceptance is not confirmation of delivery to our inbox. Provider-side routing, spam settings and retention periods are not verified here.</p>
      <p>The current form does not use the older <code>/api/contact</code> endpoint. That endpoint still logs submissions sent directly to it in the server console. Its logging behavior is unchanged; log access and retention have not been verified.</p>
    </section>
    <section aria-labelledby="external-resources">
      <p className="eyebrow">04 / Other services</p>
      <h2 id="external-resources">External resources and links</h2>
      <ul>
        <li><Link href="/base">BASE</Link> requests an Earth texture from <code>raw.githubusercontent.com</code>.</li>
        <li><Link href="/osp">OSP</Link> loads preview video from <code>media.b-tec.org</code>.</li>
        <li>The security feed requests <code>/api/security-feed</code> on this site. Our server retrieves public CISA vulnerability data; your browser does not contact CISA for that feed.</li>
        <li>Site fonts are served as site assets. Following an external link, including a payment, project or source link, sends a request to that destination. Those services have their own practices.</li>
      </ul>
      <p>External resource servers receive the corresponding network requests, which can include IP addresses and browser headers. Their settings and retention periods have not been verified. The <a href="#data-console">Data console</a> lists hostnames observed by this browser; its view is partial and excludes server-to-server traffic.</p>
    </section>
    <section aria-labelledby="privacy-questions">
      <p className="eyebrow">05 / Questions</p>
      <h2 id="privacy-questions">Let&apos;s talk</h2>
      <p>For questions about privacy or these preferences, email <a href="mailto:hello@b-tec.org">hello@b-tec.org</a>.</p>
    </section>
  </article>;
}
