const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
for(const f of ['curriculum','course','inference','applications','practical','markets','professional','deep-dives','resources','references'])require('../content/'+f+'.js');
const R=require('../learning-record.js'),C=CURRICULUM,now=Date.parse('2026-11-04T18:00:00Z'),day=86400000;
const event=(id,date,extra={})=>({id,lessonId:'time-value',reviewedAt:new Date(date).toISOString(),score:1,assistance:'none',reviewer:'chatgpt',question:'Question '+id,answer:'Original answer <script>not executable</script>',feedback:'Explain and check units.',contentVersion:C.contentVersion,...extra});
const first=event('r-first',now-8*day),second=event('r-second',now-day),state={version:1,lessons:{'time-value':{status:'understood',read:true,notes:'PRIVATE-NOTE'}},last:'time-value',reviews:[first,second]};
assert.equal(R.validateReviews([first],C.lessons,now)[0].id,first.id);
for(const bad of [{score:NaN},{score:'1'},{score:1.1},{assistance:'no'},{reviewer:'unknown'},{lessonId:'secret'},{id:'r-../../etc'},{reviewedAt:new Date(now+day).toISOString()},{question:''},{answer:'x'.repeat(10001)},{contentVersion:''}])assert.throws(()=>R.validateReviews([{...first,...bad}],C.lessons,now));
assert.throws(()=>R.validateReviews([first,first],C.lessons,now));
assert.throws(()=>R.validateEnvelope({version:1,records:[first]},C.lessons,now));
assert.equal(R.mergeReviews([first],[first,second]).length,2);
assert.throws(()=>R.mergeReviews([first],[{...first,score:0}]));
const e=R.evidence(state,'time-value',now);assert(e.delayedEvidence);assert.equal(e.unaidedPasses,2);assert.equal(e.nextDue,new Date(now+6*day).toISOString());
const hinted=event('r-hinted',now,{assistance:'hint'}),failed=event('r-failed',now,{score:.5});
for(const last of [hinted,failed]){const x=R.evidence({...state,reviews:[first,second,last]},'time-value',now);assert(!x.delayedEvidence);assert.equal(x.nextDue,new Date(now+day).toISOString());}
assert(!R.evidence({...state,reviews:[first,{...second,question:first.question}]},'time-value',now).delayedEvidence);
assert(!R.evidence({...state,reviews:[{...first,reviewedAt:new Date(now-2*day).toISOString()},second]},'time-value',now).delayedEvidence);
assert.equal(R.evidence({reviews:[]},'time-value',now).nextDue,null);
assert(R.evidence({reviews:[failed]},'time-value',now+2*day).due);
const pack=R.pack(state,C,now);assert(pack.includes('time-value'));assert(!pack.includes('PRIVATE-NOTE'));assert(pack.includes('https://'));assert(R.pack(state,C,now,true).includes('PRIVATE-NOTE'));assert(!pack.includes('## Equity valuation'));assert.throws(()=>R.pack({lessons:{},reviews:[]},C,now));
const files=R.notebook(state,C,now);assert.equal(Object.keys(files).filter(n=>n.includes('/Topics/')).length,75);assert(files['Finance Learning/Topics/time-value.md'].includes('PRIVATE-NOTE'));assert.equal(JSON.parse(files['Finance Learning/State/learning-state.json']).reviews.length,2);
const zip=Buffer.from(R.zip(files));assert.equal(zip.readUInt32LE(0),0x04034b50);assert.equal(zip.readUInt32LE(zip.length-22),0x06054b50);assert.equal(zip.readUInt16LE(zip.length-12),Object.keys(files).length);
// Independent table-based CRC check and archive local-header decoding.
const table=Array.from({length:256},(_,n)=>{for(let k=0;k<8;k++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0;});
const crc=b=>{let n=0xffffffff;for(const x of b)n=(n>>>8)^table[(n^x)&255];return (n^0xffffffff)>>>0;};
let pos=0,decoded={};while(zip.readUInt32LE(pos)===0x04034b50){const len=zip.readUInt32LE(pos+18),nl=zip.readUInt16LE(pos+26),name=zip.subarray(pos+30,pos+30+nl).toString('utf8'),data=zip.subarray(pos+30+nl,pos+30+nl+len);assert.equal(crc(data),zip.readUInt32LE(pos+14));decoded[name]=data.toString('utf8');pos+=30+nl+len;}assert.deepEqual(decoded,files);assert.throws(()=>R.zip({'../unsafe.md':'bad'}));
fs.mkdirSync(path.join(__dirname,'../.source'),{recursive:true});fs.writeFileSync(path.join(__dirname,'../.source/test-notebook.zip'),zip);
console.log('PASS: strict review validation, idempotent merge/conflict rejection, delayed evidence, assistance resets, private-note opt-in, all-topic notebook, and ZIP contents/CRCs.');
