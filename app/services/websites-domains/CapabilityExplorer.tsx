const levels = [
  { id: 'inform', number: '01', name: 'Inform', outcome: 'Your business, clearly online.', price: 'From $400', detail: 'One-time build. A complete informational site for credibility, clear information and inquiries.', features: ['Fast, professional presentation', 'Clear next steps for your customers', 'CMS editing from wherever you are'] },
  { id: 'sell', number: '02', name: 'Sell', outcome: 'Your website takes orders.', price: 'Custom quote', detail: 'Give customers a way to browse and buy, and your business a clearer path from interest to order.', features: ['Product catalogs', 'Cart and checkout', 'Order workflows'] },
  { id: 'operate', number: '03', name: 'Operate', outcome: 'Your website helps run the business.', price: 'Custom quote', detail: 'Put the right information and actions in the right hands, without another spreadsheet handoff.', features: ['Managed accounts and roles', 'Private customer or member areas', 'Tailored workflows and integrations'] },
];

export default function CapabilityExplorer() {
  return <fieldset className="wd-explorer">
    <legend className="wd-selector-legend">Choose a level to explore an example. Every option is outlined below.</legend>
    {levels.map(level => <input key={level.id} type="radio" name="website-capability" id={`wd-${level.id}`} className="wd-choice" defaultChecked={level.id === 'inform'} aria-labelledby={`wd-${level.id}-name wd-${level.id}-outcome`} aria-describedby={`wd-${level.id}-detail`} />)}
    <div className="wd-levels">
      {levels.map(level => <label key={level.id} htmlFor={`wd-${level.id}`} className={`wd-level wd-level-${level.id}`}>
        <span className="wd-level-top"><span className="technical-note">{level.number} / Capability</span><span className="wd-radio-mark" aria-hidden="true" /></span>
        <span className="wd-level-name" id={`wd-${level.id}-name`}>{level.name}<span aria-hidden="true">↗</span></span>
        <span className="wd-level-outcome" id={`wd-${level.id}-outcome`}>{level.outcome}</span>
        <span className="wd-level-price">{level.price}</span>
        <span id={`wd-${level.id}-detail`} className="wd-level-detail">{level.detail}</span>
        <span className="wd-feature-list">{level.features.map(feature => <span key={feature}><span aria-hidden="true">+</span>{feature}</span>)}</span>
      </label>)}
    </div>
    <div className="wd-stage">
      <div className="wd-stage-notes">
        <p className="eyebrow">Same foundation. Different possibilities.</p>
        <div className="wd-scene-copy wd-scene-inform"><h3>Be found.<br />Be understood.</h3><p>Who you are, what you do and how to reach you. A clear, credible home for your business.</p><span className="wd-outcome-tag">Visitor → Inquiry</span></div>
        <div className="wd-scene-copy wd-scene-sell"><h3>Turn interest<br />into orders.</h3><p>A customer finds a product, checks out and gets their order moving. Commerce, scoped around how you sell.</p><span className="wd-outcome-tag">Visitor → Customer</span></div>
        <div className="wd-scene-copy wd-scene-operate"><h3>Less chasing.<br />More doing.</h3><p>A customer signs in to check a request. Your team updates its status. A database keeps those records connected.</p><span className="wd-outcome-tag">Customer → Connected workflow</span></div>
        <p className="wd-example-note">Illustrative possibilities, not client case studies or fixed packages.</p>
      </div>
      <div className="wd-demo" aria-hidden="true">
        <div className="wd-browser-bar"><span className="wd-browser-dots">● ● ●</span><span>Your website</span><span>↗</span></div>
        <div className="wd-demo-nav"><strong>Your business<span>.</span></strong><span className="wd-scene-inform">About / Services / Contact</span><span className="wd-scene-sell">Shop / Your order</span><span className="wd-scene-operate">Your workspace / Sign out</span></div>
        <div className="wd-screen wd-scene-inform"><span className="wd-mini-label">Local expertise. Real care.</span><h4>Good work.<br />Close to home.</h4><p>A clear introduction.<br />A reason to get in touch.</p><span className="wd-mock-action">Let’s talk <span>↗</span></span><div className="wd-mini-columns"><span>What we do<br /><i /><i /></span><span>Where to find us<br /><i /><i /></span></div></div>
        <div className="wd-screen wd-scene-sell"><span className="wd-mini-label">The collection</span><h4>Find it. Love it.<br />Order it.</h4><div className="wd-products"><div><span className="wd-object wd-object-one" /><span>Product one</span></div><div><span className="wd-object wd-object-two" /><span>Product two</span></div><div><span className="wd-object wd-object-three" /><span>Product three</span></div></div><div className="wd-order-line"><span>Catalog → Cart → Checkout</span><span>Order received ✓</span></div></div>
        <div className="wd-screen wd-scene-operate"><span className="wd-mini-label">Signed-in customer area</span><h4>Everything.<br />In its place.</h4><div className="wd-portal-stats"><span><b>Requests</b>Track progress</span><span><b>Documents</b>Find what you need</span></div><div className="wd-request"><span>Your service request</span><span>In progress</span></div><div className="wd-request"><span>Your shared documents</span><span>Ready to view</span></div><div className="wd-roles"><span>Customer access</span><span>Team access</span></div></div>
        <div className="wd-cms-strip"><span className="wd-cms-icon">✎</span><span><strong>Your content. Your control.</strong><br />CMS editing starts with Inform.</span><span>Included</span></div>
      </div>
    </div>
    <p className="wd-scope-note">Sell and Operate show examples of what can be scoped—not everything included in every build. Payment-provider and transaction fees are separate considerations. Hosting, domain services and care are quoted separately at every level.</p>
  </fieldset>;
}
