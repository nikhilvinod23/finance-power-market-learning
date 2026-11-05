const assert=require('node:assert/strict'),fs=require('node:fs');
for(const f of ['curriculum','course','inference','applications','practical','markets','professional','deep-dives','resources','references'])require('../content/'+f+'.js');
const {lessons,modules}=CURRICULUM,ids=new Set(lessons.map(l=>l.id));
assert.equal(ids.size,lessons.length);assert.equal(lessons.length,75);
const resources=new Set(RESOURCES.map(r=>r.id));
for(const l of lessons){assert(l.citationIds?.length,l.id+': citations');for(const s of l.sections){assert(s.citations?.length,l.id);for(const id of s.citations)assert(CURRICULUM.references[id],l.id+': '+id);}for(const id of l.citationIds){const r=CURRICULUM.references[id];assert(r?.publisher&&r.locator&&r.license&&r.checked,l.id);assert(r.url.startsWith('https://'),id);}assert(modules.some(m=>m.id===l.module),l.id);for(const p of l.prerequisites||[])assert(ids.has(p),`${l.id}: ${p}`);assert(l.sections.length>=3);assert(l.example.length>40);assert(l.deeper.length>100);assert(l.questions.length>=2);assert(Object.keys(l.terms).length);if(l.source)assert(resources.has(l.source),l.source);for(const q of l.questions){assert(q.explanation.length>12);if(q.type==='mc')assert(q.answer>=0&&q.answer<q.options.length);else{assert(Number.isFinite(q.answer));assert(q.tolerance>0);}}}
const visited=new Set(),stack=new Set();function visit(id){assert(!stack.has(id),'Prerequisite cycle: '+id);if(visited.has(id))return;stack.add(id);for(const p of lessons.find(l=>l.id===id).prerequisites||[])visit(p);stack.delete(id);visited.add(id);}lessons.forEach(l=>visit(l.id));
for(let i=1;i<=10;i++)assert(lessons.some(l=>l.source==='lec'+String(i).padStart(2,'0')));
assert.deepEqual(lessons.filter(l=>l.initialUnderstood).map(l=>l.id),['algebra','probability']);
for(const r of RESOURCES)assert(r.path.startsWith('https://ocw.mit.edu/courses/15-450-analytics-of-finance-fall-2010/'),r.path);
assert.equal(RESOURCES.filter(r=>r.group==='Lecture notes').length,10);
assert.equal(RESOURCES.filter(r=>r.group==='Review decks').length,2);
console.log(`PASS: ${lessons.length} lessons, ${lessons.reduce((n,l)=>n+l.questions.length,0)} questions, ${RESOURCES.length} linked source files; all prerequisites valid and acyclic.`);
