const assert=require('node:assert/strict'),m=require('../models');const close=(a,b,t=1e-9)=>assert(Math.abs(a-b)<t,`${a} != ${b}`);
close(m.discount(110.25,.05,2),100);close(m.binomial(0).price,10);close(m.binomial(.05).price,50-40/1.05);close(m.binomial(.05).q,.625);
close(m.portfolio(-1),0);close(m.portfolio(1),.1);close(m.portfolio(0),Math.sqrt(.005));
close(m.garch(2)[1],1.3);assert(m.garch(2).at(-1)>1);assert(m.garch(2).at(-1)<1.3);
const mc=m.mc(40000);assert(Math.abs(mc.mean-10.45058)<4*mc.se);assert(mc.se<m.mc(1000).se);assert.deepEqual(m.mc(100),m.mc(100));assert.equal(m.brownian(64).length,65);
function exhaustive(prices,eta=.9,t=0,s=0){if(t===prices.length)return s===0?0:-Infinity;return Math.max(exhaustive(prices,eta,t+1,s),s===0?-prices[t]/eta+exhaustive(prices,eta,t+1,1):prices[t]+exhaustive(prices,eta,t+1,0));}
for(const prices of [[20,80,30],[80,20,30],[-50,-10,100],[100,80,20],[0,0,0],[-100,300,-100]]){const b=m.battery(prices);close(b.profit,exhaustive(prices));close(b.dispatch.reduce((s,x)=>s+x.cash,0),b.profit);assert.equal(b.dispatch.at(-1).after,0);assert(b.profit>=0);}
console.log('PASS: pricing, diversification, GARCH, seeded simulation, and battery DP versus independent exhaustive enumeration.');
