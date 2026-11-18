import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const source = fs.readFileSync('app/api/contact/route.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const exported = {};
let bodyTouches = 0;
let logCalls = 0;
const request = new Proxy({}, { get() { bodyTouches++; throw Error('Retired handler touched request'); } });
const forbiddenLog = () => { logCalls++; throw Error('Retired handler logged'); };
vm.runInNewContext(compiled, { exports: exported, require, console: { log: forbiddenLog, error: forbiddenLog, warn: forbiddenLog, info: forbiddenLog } });
const response = await exported.POST(request);
assert.equal(response.status, 410);
assert.equal(response.headers.get('Cache-Control'), 'no-store');
assert.equal((await response.json()).success, false);
assert.equal(bodyTouches, 0);
assert.equal(logCalls, 0);
const base = process.env.REVIEW_URL || 'http://127.0.0.1:3158';
assert(['127.0.0.1', 'localhost'].includes(new URL(base).hostname));
const marker = 'RETIRED_ROUTE_SENTINEL_20261118';
const responses = [];
for (const body of [JSON.stringify({name:marker, fix:marker}), '{broken-json', marker]) {
 const r = await fetch(base + '/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body });
 assert.equal(r.status,410); const json = await r.json(); assert.equal(json.success,false); assert(!JSON.stringify(json).includes(marker));
 responses.push(r.status);
}
for (const method of ['GET','PUT','PATCH','DELETE']) {
 const r = await fetch(base + '/api/contact', { method }); assert.equal(r.status,405);
}
const serverLog = process.env.REVIEW_SERVER_LOG;
if (serverLog) assert(!fs.readFileSync(serverLog,'utf8').includes(marker));
console.log(JSON.stringify({unit:{bodyTouches,logCalls,status:410},localPostStatuses:responses,unsupportedMethods:405,serverLogMarkerAbsent:!!serverLog}));
