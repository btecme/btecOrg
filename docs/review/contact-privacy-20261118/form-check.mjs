// Runs only against a local production build. Every Formspree request is intercepted.
import { chromium, firefox } from '/home/brian/.npm-global/lib/node_modules/openclaw/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base = process.env.REVIEW_URL || 'http://127.0.0.1:3158';
if (!['127.0.0.1', 'localhost'].includes(new URL(base).hostname)) throw Error('Mock harness must run locally');
const out = process.env.REVIEW_OUTPUT || '/home/brian/.openclaw/workspace/media/review/btec-contact-privacy-20261118/form';
fs.mkdirSync(out,{recursive:true});
const choices=['Business IT & Support','Modernization & Advisory','Property & Owner Services','Something else / Not sure'];
(async()=>{
 const results=[];
 for (const [name,engine,colorScheme] of [['chromium-light',chromium,'light'],['chromium-dark',chromium,'dark'],['firefox-light',firefox,'light'],['firefox-dark',firefox,'dark']]) {
  const browser=await engine.launch(name.startsWith('chromium')?{headless:true,executablePath:'/opt/google/chrome/chrome'}:{headless:true});
  try {
   const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',colorScheme});
   await context.addInitScript(()=>localStorage.setItem('btec-background-motion','off'));
   let mode='hold', requests=[], release, forbidden=[];
   // No POST is allowed to leave this browser context, including wrong-destination regressions.
   await context.route('**/*',async route=>{
    const req=route.request();
    if(req.method()!=='POST') return route.continue();
    if(req.url()!=='https://formspree.io/f/mpwvjvvv') {forbidden.push(req.url());return route.abort();}
    requests.push({url:req.url(),headers:req.headers(),body:req.postDataJSON()});
    if(mode==='hold') await new Promise(resolve=>{release=resolve});
    if(mode==='timeout') return; // Leave intercepted request pending until application timeout aborts it.
    if(mode==='network') return route.abort('failed');
    if(mode==='malformed') return route.fulfill({status:200,contentType:'application/json',body:'not json'});
    if(mode==='false-ok') return route.fulfill({status:200,contentType:'application/json',body:'{"ok":false}'});
    if(typeof mode==='number') return route.fulfill({status:mode,contentType:'application/json',body:'{"errors":[{"message":"Mock rejection"}]}'});
    return route.fulfill({status:200,contentType:'application/json',body:'{"ok":true}'});
   });
   const page=await context.newPage();const runtime=[];page.on('pageerror',e=>runtime.push({url:page.url(),message:e.message}));
   const go=async()=>{await page.goto(base+'/contact',{waitUntil:'domcontentloaded'});await page.locator('#contact-name').waitFor();await page.locator('#contact-name').fill('');};
   const fill=async(service='')=>{
    await page.getByLabel('Name (required)',{exact:true}).fill('Preview Test');
    await page.getByLabel('Email (required)',{exact:true}).fill('preview@example.invalid');
    await page.getByLabel('What can we help with? (required)',{exact:true}).fill('A small repair. Timing: next week.\nPlease preserve this text on error.');
    await page.getByLabel('Company or organization (optional)',{exact:true}).fill('Example Organization');
    await page.getByLabel('What is this about? (optional)',{exact:true}).selectOption(service);
   };
   const submit=()=>page.getByRole('button',{name:'Send inquiry',exact:true}).click();
   const success=()=>page.getByRole('heading',{name:'Thank you for getting in touch.'}).waitFor();
   const failure=()=>page.locator('.contact-error').waitFor();
   await go();
   assert.equal(await page.locator('main h1').textContent(),'Tell us what you need');assert.equal(await page.locator('.transparency-console').count(),0,'Contact has no console');
   assert.equal(await page.locator('form [required]').count(),3);
   assert.equal(await page.locator('form input, form textarea, form select').count(),5);
   assert.equal(await page.locator('#contact-service').inputValue(),'');
   assert.deepEqual(await page.locator('#contact-service option').allTextContents(),['Select if helpful',...choices]);
   assert.equal(await page.locator('main a[href="mailto:hello@b-tec.org"]').count(),1);
   assert(!/Serious inquiries only|12 months|Sector|disruption/.test(await page.locator('main').innerText()));
   const widths=[];
   for(const width of [320,390,768,900,1024,1280,1440,1660]) {
    await page.setViewportSize({width,height:width<600?844:1000});
    await page.waitForFunction(()=>document.documentElement.scrollWidth<=innerWidth);
    const fields=await page.locator('main input,main textarea,main select,main button').evaluateAll(nodes=>nodes.map(n=>({w:n.getBoundingClientRect().width,h:n.getBoundingClientRect().height,r:n.getBoundingClientRect().right})));
    assert(fields.every(f=>f.w>=100&&f.h>=44&&f.r<=width+1),name+' controls fit '+width);
    widths.push(width);
   }
   await page.setViewportSize({width:1440,height:1000});await page.locator('main h1').click();await page.evaluate(()=>scrollTo(0,0));
   await page.screenshot({path:out+'/'+name+'-desktop.png',fullPage:true});
   await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));
   await page.screenshot({path:out+'/'+name+'-mobile.png',fullPage:true});await page.screenshot({path:out+'/'+name+'-mobile-opening.png'});
   await page.setViewportSize({width:320,height:844});await page.evaluate(()=>scrollTo(0,0));
   await page.screenshot({path:out+'/'+name+'-320.png',fullPage:true});
   // Native labels, focus and inline errors; invalid inputs never reach the provider.
   await submit();assert.equal(requests.length,0);
   assert.equal(await page.evaluate(()=>document.activeElement.id),'contact-name');
   assert.equal(await page.locator('[aria-invalid="true"]').count(),3);
   assert.equal(await page.locator('#contact-name').getAttribute('aria-describedby'),'contact-name-error');
   await page.locator('label[for="contact-email"]').click();assert.equal(await page.evaluate(()=>document.activeElement.id),'contact-email');
   await page.locator('#contact-name').fill('   ');await page.locator('#contact-email').fill('not-an-email');await page.locator('#contact-message').fill('   ');
   await submit();assert.equal(requests.length,0);assert.equal(await page.locator('[aria-invalid="true"]').count(),3);
   await page.locator('#contact-name').fill('Name');await submit();assert.equal(await page.evaluate(()=>document.activeElement.id),'contact-email');
   await fill(choices[0]);await submit();await page.getByRole('button',{name:'Sending…'}).waitFor();
   assert.equal(requests.length,1);assert(await page.locator('fieldset').evaluate(e=>e.disabled));assert(await page.locator('#contact-name').isDisabled());
   assert(await page.getByRole('button',{name:'Sending…'}).isDisabled());
   assert.equal(await page.getByRole('heading',{name:'Thank you for getting in touch.'}).count(),0);
   assert((await page.locator('.contact-send-status').innerText()).includes('Sending your inquiry'));
   // Same-event repeated submit attempts exercise the synchronous lock, not just disabled rendering.
   await page.locator('form').evaluate(f=>{f.requestSubmit();f.requestSubmit()});
   assert.equal(requests.length,1);
   const payload=requests[0];assert.equal(payload.headers['content-type'],'application/json');assert.equal(payload.headers.accept,'application/json');
   assert.equal(payload.body.fix,'A small repair. Timing: next week.\nPlease preserve this text on error.');
   assert.equal(payload.body.service,choices[0]);assert.equal(payload.body.sector,'');assert.equal(payload.body.tolerance,'');
   assert.equal(payload.body.name,'Preview Test');assert.equal(payload.body.email,'preview@example.invalid');assert.equal(payload.body.company,'Example Organization');
   assert(!('message' in payload.body));assert(!('_to' in payload.body));
   await page.screenshot({path:out+'/'+name+'-sending.png',fullPage:true});
   mode='accepted';release();await success();
   assert(await page.locator('.contact-success').evaluate(e=>e===document.activeElement));
   assert((await page.locator('.contact-success').innerText()).includes('not delivery to our inbox'));
   await page.screenshot({path:out+'/'+name+'-success.png',fullPage:true});
   await page.getByRole('button',{name:'Send another inquiry'}).click();await page.locator('#contact-name').waitFor();
   assert.equal(await page.locator('#contact-name').inputValue(),'');assert.equal(await page.locator('#contact-service').inputValue(),'');
   await page.waitForFunction(()=>document.activeElement.id==='contact-name');
   // All service options and unselected state serialize without invented qualification answers.
   for(const choice of ['',...choices.slice(1)]) {
    await fill(choice);mode='accepted';await submit();await success();assert.equal(requests.at(-1).body.service,choice);
    await page.getByRole('button',{name:'Send another inquiry'}).click();
   }
   // Empty optional fields still submit.
   await fill();await page.locator('#contact-company').fill('');await submit();await success();assert.equal(requests.at(-1).body.company,'');
   await page.getByRole('button',{name:'Send another inquiry'}).click();
   const states=[];
   for(const response of [422,429,500,'network','malformed','false-ok','timeout']) {
    await fill(choices[2]);mode=response;const before=requests.length;await submit();await failure();
    assert.equal(requests.length,before+1);assert(await page.getByRole('button',{name:'Send inquiry',exact:true}).isEnabled());
    assert.equal(await page.locator('#contact-name').inputValue(),'Preview Test');
    assert.equal(await page.locator('#contact-email').inputValue(),'preview@example.invalid');
    assert.equal(await page.locator('#contact-company').inputValue(),'Example Organization');
    assert.equal(await page.locator('#contact-service').inputValue(),choices[2]);
    assert((await page.locator('#contact-message').inputValue()).includes('preserve this text'));
    assert(await page.locator('.contact-error').evaluate(e=>e===document.activeElement));
    const text=await page.locator('.contact-error').innerText();
    if(typeof response==='number')assert(text.includes('not accepted'));
    else assert(text.includes('retrying could send a duplicate'));
    if(response==='timeout')assert(text.includes('timed out'));
    if(response===422||response==='timeout')await page.screenshot({path:out+'/'+name+'-'+response+'.png',fullPage:true});
    // Retry the retained values; do not refill, navigate or reset first.
    mode='accepted';await submit();await success();assert.equal(requests.length,before+2);assert.equal(requests.at(-1).body.service,choices[2]);
    await page.getByRole('button',{name:'Send another inquiry'}).click();states.push(String(response));
   }
   // Actual keyboard-only entry and submission, including native select operation.
   await go();await page.locator('#contact-name').focus();
   await page.keyboard.type('Keyboard User');await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'contact-email');
   await page.keyboard.type('keyboard@example.invalid');await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'contact-message');
   await page.keyboard.type('Keyboard-only inquiry');await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'contact-company');
   await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'contact-service');
   await page.keyboard.press('ArrowDown');await page.keyboard.press('Tab');
   assert.equal(await page.evaluate(()=>document.activeElement.textContent.trim()),'Privacy & Site Preferences');
   await page.keyboard.press('Tab');
   assert.equal(await page.evaluate(()=>document.activeElement.textContent.trim()),'Send inquiry ↗');
   assert.notEqual(await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle),'none');
   mode='accepted';await page.keyboard.press('Enter');await success();
   // Skip link plus menu retained. The Contact-scoped CSS cannot change homepage content/metadata.
   await page.goto(base,{waitUntil:'domcontentloaded'});await page.locator('.homepage-candidate').waitFor();
   assert.equal(await page.title(),'IT Support, Technology Advisory & Property Services | b-tec');
   await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Skip to content');
   await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'main-content');
   await page.keyboard.press('Tab');await page.keyboard.press('Enter');await page.waitForURL(base+'/contact');
   await page.locator('#contact-name').waitFor();await page.locator('.mobile-toggle').click();
   await page.keyboard.press('Escape');assert.equal(await page.locator('.mobile-toggle').getAttribute('aria-expanded'),'false');
   assert(await page.locator('.mobile-toggle').evaluate(e=>e===document.activeElement));
   // Contact-only removal must not change other routes and must survive client navigation.
   await page.locator('.site-footer a[href="/services"]').click();await page.waitForURL(base+'/services');
   assert(await page.evaluate(()=>!!(document.querySelector('.transparency-console').compareDocumentPosition(document.querySelector('main'))&Node.DOCUMENT_POSITION_FOLLOWING)),'Services retains console before main');
   await page.locator('.site-footer a[href="/contact"]').click();await page.waitForURL(base+'/contact');await page.locator('#contact-name').waitFor();
   assert.equal(await page.locator('.transparency-console').count(),0,'Client-navigated Contact has no console');
   assert.equal(await page.locator('main a[href="/privacy"]').count(),1);
   // Automated scan of the changed page, including dynamic validation and failure states.
   const accessibility=[];
   for(const state of ['idle','invalid','error','success']) {
    if(state==='invalid')await submit();
    if(state==='error'){await fill();mode=422;await submit();await failure();}
    if(state==='success'){mode='accepted';await submit();await success();}
    await page.addScriptTag({path:'/home/brian/.openclaw/workspace/btecOrg-standards/node_modules/axe-core/axe.min.js'});
    const scan=await page.evaluate(async()=>{const r=await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>v.id)};});
    assert.deepEqual(scan.violations,[],name+' '+state+' accessibility');accessibility.push({state,...scan});
   }
   assert.deepEqual(runtime,[],'Contact/home runtime errors');assert.deepEqual(forbidden,[],'Wrong destination POSTs');
   const storage=await page.evaluate(()=>({session:Object.keys(sessionStorage),local:Object.keys(localStorage)}));
   assert.deepEqual(storage.session,[]);assert.deepEqual(storage.local,['btec-background-motion']);
   results.push({engine:name,colorScheme,widths,mockedRequests:requests.length,states,accessibility,keyboard:true,duplicateProtection:true,payload:true,runtime,storage});
   fs.writeFileSync(out+'/results.json',JSON.stringify(results,null,2));
   console.log(name+': responsive, labels, validation, pending, duplicate lock, payloads, acceptance, rejection/network/malformed/timeout + retry, keyboard, axe passed');
   await context.close();
  } finally {await browser.close();}
 }
 console.log('No real inquiries sent. Results: '+out+'/results.json');
})().catch(e=>{console.error(e);process.exit(1)});
