(function(root){'use strict';
const discount=(cash,rate,years)=>cash/Math.pow(1+rate,years);
function binomial(rate){const s=100,u=120,d=80,k=100,q=(s*(1+rate)-d)/(u-d);return {q,up:u,down:d,upPayoff:20,downPayoff:0,delta:0.5,borrow:40/(1+rate),price:q*20/(1+rate)};}
function portfolio(rho){return Math.sqrt(Math.max(0,0.25*0.01+0.25*0.01+2*0.5*0.5*0.1*0.1*rho));}
function rng(seed=450){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
function normal(random){return Math.sqrt(-2*Math.log(Math.max(random(),1e-12)))*Math.cos(2*Math.PI*random());}
function brownian(steps=64){const random=rng();let path=[0];for(let i=0;i<steps;i++)path.push(path.at(-1)+normal(random)/Math.sqrt(steps));return path;}
function mc(n){const random=rng();let sum=0,sq=0;for(let i=0;i<n;i++){const st=100*Math.exp((0.05-0.2**2/2)+0.2*normal(random));const y=Math.exp(-0.05)*Math.max(st-100,0);sum+=y;sq+=y*y;}const mean=sum/n;const se=Math.sqrt(Math.max(0,(sq-n*mean*mean)/(n-1))/n);return {mean,se,low:mean-1.96*se,high:mean+1.96*se};}
function garch(shock,alpha=0.1,beta=0.8,omega=0.1){let h=1;const path=[h];h=omega+alpha*shock**2+beta*h;path.push(h);for(let i=0;i<15;i++){h=omega+(alpha+beta)*h;path.push(h);}return path;}
function battery(prices,eta=0.9){const n=prices.length,values=Array.from({length:n+1},()=>[0,0]),policies=Array.from({length:n},()=>['','']);values[n]=[0,-Infinity];for(let t=n-1;t>=0;t--){for(let s=0;s<=1;s++){const options=[{a:'Wait',v:values[t+1][s],next:s}];if(s===0)options.push({a:'Charge',v:-prices[t]/eta+values[t+1][1],next:1});else options.push({a:'Discharge',v:prices[t]+values[t+1][0],next:0});const best=options.reduce((a,b)=>b.v>a.v?b:a);values[t][s]=best.v;policies[t][s]=best.a;}}let s=0;const dispatch=prices.map((p,t)=>{const a=policies[t][s],before=s;s=a==='Charge'?1:a==='Discharge'?0:s;return {time:t+1,price:p,action:a,before,after:s,cash:a==='Charge'?-p/eta:a==='Discharge'?p:0};});return {values,policies,dispatch,profit:values[0][0]};}
const api={discount,binomial,portfolio,rng,normal,brownian,mc,garch,battery};root.MODELS=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
