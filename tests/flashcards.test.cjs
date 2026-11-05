const assert=require('node:assert/strict');for(const f of ['curriculum','course','inference','applications','practical','markets','professional','reasoning-cards'])require('../content/'+f+'.js');
const F=require('../flashcards.js'),cards=F.bank(CURRICULUM.lessons),now=Date.parse('2026-11-05T12:00:00Z'),DAY=86400000;
assert.equal(cards.length,168);assert.equal(new Set(cards.map(c=>c.id)).size,cards.length);for(const c of cards){assert.equal(new Set(c.options).size,c.options.length,c.id);assert(c.answer>=0&&c.answer<c.options.length);}
const state={lessons:{python:{status:'understood'},'time-value':{status:'learning'},algebra:{status:'understood'}},flashcards:[]};
assert(F.queue(state,cards).every(c=>['python','algebra'].includes(c.lessonId)));assert.equal(F.queue(state,cards,10,now,'python').length,2);assert.equal(F.queue({lessons:{},flashcards:[]},cards).length,0);
const event=(id,day,correct=true,hint=false)=>({id,cardId:'python:q0',answeredAt:new Date(now+day*DAY).toISOString(),correct,hint,answer:'an answer',contentVersion:'test'});
const first=event('f-first',-2),retry=event('f-retry',-2),later=event('f-later',-1,false);
assert.equal(F.evidence([],cards,'python',now).estimate,null);
const a=F.evidence([first],cards,'python',now),b=F.evidence([first,retry],cards,'python',now);assert.equal(a.estimate,b.estimate);assert.equal(b.attempts,2);assert.equal(b.evidenceAttempts,1);assert(a.estimate>.5);
assert(F.evidence([event('f-hint',-1,true,true)],cards,'python',now).estimate<.5);
assert(F.evidence([event('f-bad-one',-2,false),later],cards,'python',now).needsReview);
assert(F.evidence([first],cards,'python',now+120*DAY).estimate<a.estimate);
assert.equal(F.validate(undefined,cards,now).length,0);assert.equal(F.validate([first],cards,now).length,1);
for(const patch of [{cardId:'unknown'},{id:'../bad'},{correct:'yes'},{hint:null},{answeredAt:new Date(now+DAY).toISOString()},{answer:'x'.repeat(501)}])assert.throws(()=>F.validate([{...first,...patch}],cards,now));
assert.throws(()=>F.validate([first,first],cards,now));assert.equal(F.merge([first],[first,later]).length,2);assert.throws(()=>F.merge([first],[{...first,correct:false}]));
console.log('PASS: 168 valid flashcards, understood-only eligibility, topic filtering, weak-topic evidence, same-day retry isolation, hint penalty, recency weighting, validation and conflict-safe merge.');
