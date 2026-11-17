const { chromium, firefox } = require('/home/brian/.npm-global/lib/node_modules/openclaw/node_modules/playwright-core');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const base = process.env.REVIEW_URL || 'http://127.0.0.1:3141';
const out = '/tmp/btec-homepage-review';
const widths = [320,390,768,900,1024,1280,1440,1660];
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const results=[];
 for(const [name,engine] of [['chromium',chromium],['firefox',firefox]]){
  const browser=await engine.launch(name==='chromium'?{headless:true,executablePath:'/opt/google/chrome/chrome'}:{headless:true});
  try {
   const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
   await context.addInitScript(()=>localStorage.setItem('btec-background-motion','off'));
   const page=await context.newPage(); const errors=[]; page.on('pageerror',e=>{const detail={message:e.message,stack:e.stack,url:page.url()};errors.push(detail);fs.appendFileSync(out+'/error-details.jsonl',JSON.stringify(detail)+'\n');});
   await page.goto(base,{waitUntil:'domcontentloaded'});await page.waitForSelector('.homepage-candidate');await page.locator('.transparency-console button').waitFor();
   assert(await page.evaluate(()=>!!(document.querySelector('main').compareDocumentPosition(document.querySelector('.transparency-console')) & Node.DOCUMENT_POSITION_FOLLOWING)),'Homepage console follows main in DOM order');
   const structure=await page.locator('main').evaluate(root=>({headings:[...root.querySelectorAll('h1,h2,h3')].map(e=>({level:+e.tagName.slice(1),text:e.textContent})),links:[...root.querySelectorAll('a')].map(e=>e.getAttribute('href')),ids:[...root.querySelectorAll('[id]')].map(e=>e.id)}));
   assert.equal(structure.headings.filter(h=>h.level===1).length,1); for(let i=1;i<structure.headings.length;i++)assert(structure.headings[i].level<=structure.headings[i-1].level+1,'heading hierarchy');
   assert.equal(new Set(structure.ids).size,structure.ids.length); assert.equal(await page.title(),'IT Support, Technology Advisory & Property Services | b-tec');
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://www.b-tec.org/');
   assert((await page.locator('meta[name="description"]').getAttribute('content')).includes('property-owner services'));
   const documents=new Map();
   for(const href of new Set(structure.links)){
    const url=new URL(href,base);
    if(url.origin!==new URL(base).origin)continue;
    if(!documents.has(url.pathname)) { const r=await context.request.get(base+url.pathname); assert.equal(r.status(),200,href);documents.set(url.pathname,await r.text()); }
    if(url.hash)assert(await page.evaluate(({html,id})=>!!new DOMParser().parseFromString(html,'text/html').getElementById(id),{html:documents.get(url.pathname),id:url.hash.slice(1)}),'anchor '+href);
   }
   const homepageErrorsBeforeSmoke=errors.filter(e=>new URL(e.url).pathname==='/');
   assert.deepEqual(homepageErrorsBeforeSmoke,[]);
   const responsive=[];
   for(const width of widths){
    await page.setViewportSize({width,height:width<600?844:1000});
    await page.waitForFunction(()=>document.documentElement.scrollWidth<=innerWidth);
    const layout=await page.locator('.homepage-candidate').evaluate(root=>({overflow:[...root.querySelectorAll('*')].filter(e=>e.getBoundingClientRect().width&&e.getBoundingClientRect().right>innerWidth+1).map(e=>e.className),primaryBottom:root.querySelector('.hp-hero .button-primary').getBoundingClientRect().bottom,viewport:innerHeight}));
    assert.equal(layout.overflow.length,0,JSON.stringify({width,layout}));
    if(width<=390)assert(layout.primaryBottom<844,`Primary CTA below opening screen at ${width}: ${layout.primaryBottom}`);
    responsive.push({width,noOverflow:true,primaryBottom:Math.round(layout.primaryBottom)});
   }
   await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>window.scrollTo(0,0));
   await page.screenshot({path:`${out}/${name}-desktop.png`});await page.screenshot({path:`${out}/${name}-full-desktop.png`,fullPage:true});
   await page.setViewportSize({width:390,height:844});await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`${out}/${name}-mobile.png`});await page.screenshot({path:`${out}/${name}-full-mobile.png`,fullPage:true});
   // Actual keyboard traversal from skip link into homepage content.
   await page.goto(base,{waitUntil:'domcontentloaded'});await page.waitForSelector('.homepage-candidate');await page.keyboard.press('Tab');
   assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Skip to content');await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'main-content');
   await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('href')),'/contact');
   assert.notEqual(await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle),'none');
   await page.keyboard.press('Tab');await page.keyboard.press('Enter');await page.waitForFunction(()=>location.hash==='#services');
   const landing=await page.locator('#services').evaluate(e=>({top:e.getBoundingClientRect().top,header:document.querySelector('.site-header').getBoundingClientRect().bottom}));assert(landing.top>=landing.header-1,'anchor clears header');
   // Small-screen service entrances and all project paths.
   for(const id of ['business-it','modernization','property-owners']){await page.locator(`.hp-starting-points a[href="#${id}"]`).click();await page.waitForFunction(id=>location.hash==='#'+id,id);assert(await page.locator('#'+id).isVisible());}
   // The existing console deep link must reopen its hidden security section.
   await page.locator('.transparency-console button').click();assert.equal(await page.locator('.transparency-console').getAttribute('data-open'),'false');
   await page.locator('.hp-public-links a[href="#console-security"]').click();await page.waitForFunction(()=>document.querySelector('.transparency-console').dataset.open==='true');assert(await page.locator('#console-security').isVisible());
   // Footer remains reachable and the shared mobile menu works when scrolled down.
   await page.locator('.site-footer').scrollIntoViewIfNeeded();await page.locator('.mobile-toggle').click();assert.equal(await page.locator('.mobile-toggle').getAttribute('aria-expanded'),'true');
   await page.keyboard.press('Escape');assert.equal(await page.locator('.mobile-toggle').getAttribute('aria-expanded'),'false');assert(await page.locator('.mobile-toggle').evaluate(e=>e===document.activeElement));
   await page.locator('.hp-closing .button-primary').click();await page.waitForURL(base+'/contact');assert.equal(await page.title(),'b-tec | Future Systems');assert.equal(await page.locator('form').count(),1);
   // Route changes must not retain homepage-only console positioning or metadata.
   assert.equal(await page.locator('.transparency-console').evaluate(e=>getComputedStyle(e).order),'0');
   assert(await page.evaluate(()=>!!(document.querySelector('.transparency-console').compareDocumentPosition(document.querySelector('main')) & Node.DOCUMENT_POSITION_FOLLOWING)),'Other routes retain console before main');
   const protectedMetadata=[];
   for(const route of ['/services','/alignment','/research','/base','/bdf','/osp','/show','/standards','/services/websites-domains','/blog']){
    await page.goto(base+route,{waitUntil:'domcontentloaded'});assert.equal(await page.locator('main h1').count(),1,route);protectedMetadata.push({route,title:await page.title()});
   }
   await page.goto(base,{waitUntil:'domcontentloaded'});await page.setViewportSize({width:1440,height:1000});
   await page.addScriptTag({path:'/home/brian/.openclaw/workspace/btecOrg-standards/node_modules/axe-core/axe.min.js'});
   const axe=await page.evaluate(async()=>{const r=await axe.run(document.querySelector('.homepage-candidate'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>v.id)};});
   fs.writeFileSync(`${out}/${name}-axe.json`,JSON.stringify(axe,null,2));assert.deepEqual(axe.violations,[],'homepage accessibility');
   const homepageErrors=errors.filter(e=>new URL(e.url).pathname==='/');
   assert.deepEqual(homepageErrors,[],'homepage runtime errors');
   results.push({browser:name,responsive,headings:structure.headings,internalDestinations:documents.size,keyboard:true,consoleReopens:true,protectedMetadata,axe,homepageRuntimeErrors:homepageErrors,protectedRouteRuntimeFindings:errors.filter(e=>new URL(e.url).pathname!=='/').map(e=>({url:e.url,message:e.message,stack:e.stack.slice(0,550)}))});
   await context.close();
   const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto(base,{waitUntil:'domcontentloaded'});assert(await nojs.locator('.hp-hero .button-primary').isVisible());assert.equal(await nojs.locator('.hp-service').count(),3);assert(await nojs.locator('#transparency-content').isVisible());await nojs.close();
  } finally {await browser.close();}
 }
 fs.writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2)); console.log(JSON.stringify(results));
})().catch(e=>{console.error(e);process.exit(1)});
