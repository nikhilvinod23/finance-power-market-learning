const assert=require('node:assert/strict'),V=require('../visuals.js');
for(const a of [-1,0,1,1.5])for(const h of [-1,-.1,0,.05,.7,1]){const x=V.taylor(a,h);assert(Math.abs(x.actual-x.quadratic)<1e-12);assert(Math.abs(x.actual-x.linear-h*h)<1e-12);assert(Math.abs(x.secant-(2*a+h))<1e-12);}
const large=V.taylor(1,.5,'exp'),small=V.taylor(1,.05,'exp');assert(Math.abs(small.actual-small.linear)<Math.abs(large.actual-large.linear));assert(Math.abs(large.actual-large.quadratic)<Math.abs(large.actual-large.linear));
for(const c of [-3,-1,0,1,3])for(const dx of [-.5,.1,.5])for(const dy of [-.5,-.1,.5]){const r=V.hessian(c,dx,dy),f=(x,y)=>x*x+c*x*y+2*y*y;assert(Math.abs(r.total-(f(1+dx,1+dy)-f(1,1)))<1e-12);assert(Math.abs(r.min+r.max-6)<1e-12);assert(Math.abs(r.min*r.max-(8-c*c))<1e-12);}
assert(V.hessian(1,0,0).min>0);assert(V.hessian(3,0,0).min<0);
for(let d=0;d<=70;d++){const x=V.dispatch(d);assert.equal(x.a+x.b,d);let best=Infinity;for(let a=0;a<=30;a++){const b=d-a;if(b>=0&&b<=40)best=Math.min(best,a*10+b*40);}assert.equal(x.cost,best);}
assert.equal(V.dispatch(30).marginal,null);assert.throws(()=>V.dispatch(71));
console.log('PASS: tangent/secant/Taylor identities, exp approximation, Hessian directional curvature and exact quadratic changes, dispatch versus exhaustive enumeration.');
