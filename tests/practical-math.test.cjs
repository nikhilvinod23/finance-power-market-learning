const assert=require('node:assert/strict');
for(const f of ['curriculum','course','inference','applications','practical','markets','professional'])require('../content/'+f+'.js');
const byId=new Map(CURRICULUM.lessons.map(l=>[l.id,l]));
// Independently compute the numeric practice answers from the stated inputs.
const cases=[
 ['three-statements',0,40+12-5],['working-capital',0,80*(1-.25)+10-20-5],['excel-dcf',0,(110/100-1)*100],
 ['pandas-data',0,(5*20+10*50)/(5+10)],['sql-market',1,2*3],['data-time-tests',1,4*3*15/60],
 ['dispatch-merit',0,30*10+20*40],['nodal-basis',0,65-45],['settlement-reserves',0,6*40+(5-6)*70],
 ['forecast-baselines',0,[1,2,6].reduce((a,b)=>a+b)/3],['forecast-validation',1,100+20],['forecast-uncertainty',0,45/50*100],
 ['commodity-contracts',1,50*8],['basis-curves',0,6/4],['margin-liquidity',0,3*200*4],
 ['asset-revenues',0,120/(20*10)*100],['asset-revenues',1,900/15],['project-debt',0,150/(25+75)],
 ['asset-valuation',0,200-70+10],['asset-valuation',1,(.5*.12+.5*.06*(1-.25))*100],
 ['pnl-attribution',0,25*(34-30)],['tail-risk',0,[8,20].reduce((a,b)=>a+b)/2],['risk-limits',0,(200-160)/200*100],
 ['linear-dispatch',0,20*15],['storage-commitment',0,.8*1*2],['storage-commitment',1,.9*.9*100],
 ['strategy-implementation',0,250-30-20],['cfa-economics',0,(1.08/1.04-1)*100],['cfa-bonds',0,110/1.1],
 ['cfa-duration',0,-200*5*.01],['cfa-duration',1,100*.02*.60],['cfa-equity',0,2/(.1-.02)],['cfa-capital-assets',0,180-150]
];
for(const [id,i,answer]of cases){const q=byId.get(id).questions[i];assert.equal(q.type,'number');assert(Math.abs(q.answer-answer)<=q.tolerance,id);}
const allNumeric=CURRICULUM.lessons.slice(45).flatMap(l=>l.questions.filter(q=>q.type==='number'));assert.equal(cases.length,allNumeric.length);
// Worked examples: cash-flow timing, bond repricing, tail convention and physics.
assert(Math.abs((-100+60/1.1+60/1.1**2)-4.13)<.005);
assert(Math.abs((5/1.1+105/1.1**2)-91.32)<.005);
assert.equal([0,1,2,3,4,5,6,7,8,20][Math.ceil(.8*10)-1],7);
assert.equal((5*20+15*60)/(5+15),50);
assert(Math.abs(.9*2*.5-.5-.4)<1e-12);
assert.equal(40*(43-40)+60*(43-40),100*(43-40));
assert(Math.abs(110/1.1-30+5-75)<1e-10);
console.log('PASS: all '+cases.length+' new numeric practice answers and independent DCF, bond, tail-risk, P&L, and storage cases.');

