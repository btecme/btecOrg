import { chromium, firefox } from '/home/brian/.npm-global/lib/node_modules/openclaw/node_modules/playwright-core/index.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base='http://127.0.0.1:3158';
const out='/home/brian/.openclaw/workspace/media/review/btec-contact-privacy-20261118/layout';
fs.mkdirSync(out,{recursive:true});
const results=[];
for(const [engineName,engine] of [['chromium',chromium],['firefox',firefox]]) {
 const browser=await engine.launch(engineName==='chromium'?{headless:true,executablePath:'/opt/google/chrome/chrome'}:{headless:true});
 try {
  for(const colorScheme of ['light','dark']) {
   const context=await browser.newContext({colorScheme,reducedMotion:'reduce'});
   await context.addInitScript(()=>localStorage.setItem('btec-background-motion','off'));
   const unexpected=[],errors=[];
   await context.route('**/*',route=>{
    if(!['GET','HEAD','OPTIONS'].includes(route.request().method())) { unexpected.push(route.request().url());return route.abort(); }
    return route.continue();
   });
   const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
   let views=0;
   for(const width of [320,390,768,900,1024,1280,1440,1660]) {
    await page.setViewportSize({width,height:width<600?844:1000});
    for(const route of ['/contact','/privacy']) {
     await page.goto(base+route,{waitUntil:'networkidle'});
     await page.locator('#site-appearance').selectOption(colorScheme);
     assert.equal(await page.locator('html').getAttribute('data-theme'),colorScheme);
     assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' overflow '+width);
     assert.equal(await page.locator('.site-footer a[href="/privacy"]').count(),1);
     assert.equal(await page.locator('.transparency-console').count(),route==='/contact'?0:1);
     const title=await page.locator('main h1').boundingBox();const header=await page.locator('.site-header').boundingBox();assert(title.y>=header.y+header.height,route+' heading clears header');
     const toolbar=await page.locator('.site-preferences-toolbar').boundingBox();assert(toolbar.x>=0&&toolbar.x+toolbar.width<=width+1);
     if(width===390||width===1440) await page.screenshot({path:`${out}/${engineName}-${colorScheme}-${width}-${route.slice(1)}.png`,fullPage:true});
     views++;
    }
   }
   await page.goto(base+'/contact',{waitUntil:'networkidle'});
   await page.locator('#contact-message').fill('Keep this unsent text through theme changes');
   await page.locator('#contact-name').fill('Local only');
   await page.locator('#site-appearance').selectOption(colorScheme==='light'?'dark':'light');
   assert.equal(await page.locator('#contact-message').inputValue(),'Keep this unsent text through theme changes');
   assert.equal(await page.locator('#contact-name').inputValue(),'Local only');
   await page.locator('main a[href="/privacy"]').click();await page.waitForURL(base+'/privacy');
   await page.locator('.transparency-console').waitFor();await page.getByRole('button',{name:/Data console/}).click();
   assert.equal(await page.locator('.transparency-console').getAttribute('data-open'),'false');
   await page.locator('main a[href="#data-console"]').first().click();
   await page.waitForFunction(()=>document.activeElement.id==='data-console');
   assert.equal(await page.locator('.transparency-console').getAttribute('data-open'),'true');
   await page.locator('.site-footer a[href="/contact"]').click();await page.waitForURL(base+'/contact');assert.equal(await page.locator('.transparency-console').count(),0);
   await page.locator('.site-footer a[href="/services"]').click();await page.waitForURL(base+'/services');assert.equal(await page.locator('.transparency-console').count(),1);
   await page.goto(base,{waitUntil:'networkidle'});assert.match(await page.locator('main h1').innerText(),/IT that works\.\s*Projects that move forward\./);
   assert.equal(await page.locator('.transparency-console').count(),1);
   await page.getByRole('link',{name:/Tell us what you need/}).first().click();await page.waitForURL(base+'/contact');assert.equal(await page.locator('.transparency-console').count(),0);
   if(await page.locator('.mobile-toggle').isVisible()) {
    await page.locator('.mobile-toggle').click();assert.equal(await page.locator('.mobile-toggle').getAttribute('aria-expanded'),'true');
    await page.keyboard.press('Escape');assert.equal(await page.locator('.mobile-toggle').getAttribute('aria-expanded'),'false');
    assert(await page.locator('.mobile-toggle').evaluate(e=>e===document.activeElement));
   } else {
    await page.getByRole('button',{name:'Offerings',exact:true}).click();
    await page.keyboard.press('Escape');assert.equal(await page.getByRole('button',{name:'Offerings',exact:true}).getAttribute('aria-expanded'),'false');
   }
   assert.deepEqual(errors,[]);assert.deepEqual(unexpected,[]);
   results.push({engine:engineName,colorScheme,views,themeRetainsText:true,navigation:true,errors,unexpectedWrites:unexpected});
   await context.close();
  }
  const nojs=await browser.newContext({javaScriptEnabled:false});const page=await nojs.newPage();await page.goto(base+'/contact');assert.equal(await page.locator('.transparency-console').count(),0);await nojs.close();
 } finally {await browser.close();}
}
fs.writeFileSync(out+'/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));
