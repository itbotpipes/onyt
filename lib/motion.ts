// @ts-nocheck
// Scroll, cursor, theme, counters and canvas animations (ported from the HTML prototype).
export function initMotion(): void {
  if (window.__onyt) return;
  window.__onyt = true;
var r=document.documentElement,ic=document.getElementById('ico'),mo="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",su="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM11 1h2v3h-2zM11 20h2v3h-2zM1 11h3v2H1zM20 11h3v2h-3z";
function set(t){r.setAttribute('data-theme',t);r.classList.toggle('dark',t==='dark');if(ic)ic.setAttribute('d',t==='dark'?su:mo);try{localStorage.setItem('onyt-theme',t)}catch(e){}}
var s=null;try{s=localStorage.getItem('onyt-theme')}catch(e){}set(s||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'));
var tog=document.getElementById('tog');if(tog){tog.onclick=function(){set(r.getAttribute('data-theme')==='dark'?'light':'dark')}};
var it=['Performance Marketing','Branding','Website Development','Application Development'],h='';for(var i=0;i<4;i++)it.forEach(function(t){h+='<span>'+t+'</span><b>✦</b>'});document.getElementById('mq').innerHTML=h;
var tc=document.getElementById('tc');function ck(){tc.textContent=new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata'})}ck();setInterval(ck,1000);
var st=document.getElementById('st');st.innerHTML=st.textContent.split(' ').map(function(w){return '<span class="w">'+w+'</span>'}).join(' ');var ws=st.querySelectorAll('.w');
function sc(){var b=st.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight*.85-b.top)/(b.height+innerHeight*.25)));ws.forEach(function(w,i){w.classList.toggle('on',i/ws.length<p)})}addEventListener('scroll',sc,{passive:true});sc();
function cnt(n){var to=parseFloat(n.dataset.n),sf=n.dataset.s,d=to%1?1:0,a=performance.now();(function f(t){var k=Math.min(1,(t-a)/1700);n.textContent=(to*(1-Math.pow(1-k,3))).toFixed(d)+sf;if(k<1)requestAnimationFrame(f)})(a)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;el.classList.add('on');io.unobserve(el);el.querySelectorAll('[data-n]').forEach(cnt);if(el.id==='pr')el.style.setProperty('--p','100%')})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
var c=document.querySelector('.cur');addEventListener('mousemove',function(e){c.style.opacity=1;c.style.left=e.clientX+'px';c.style.top=e.clientY+'px'});
document.querySelectorAll('a,button,.sc,.pj').forEach(function(e){e.addEventListener('mouseenter',function(){c.style.width=c.style.height='50px'});e.addEventListener('mouseleave',function(){c.style.width=c.style.height='12px'})});
var pl=document.querySelector('.pl'),pc=document.getElementById('pc'),a0=performance.now();
(function f(n){var k=Math.min(1,(n-a0)/1500);if(pc)pc.textContent=Math.round(k*100)+'%';if(k<1)requestAnimationFrame(f);else{if(pl){pl.classList.add('out');setTimeout(function(){if(pl){pl.style.display='none';pl.style.pointerEvents='none'}},1200)}document.body.classList.add('ld')}})(a0);
setTimeout(function(){document.body.classList.add('ld')},3500);
document.querySelectorAll('.hd h2,.ctx h2').forEach(function(h){var i=0;h.innerHTML=h.textContent.split(' ').map(function(w){return '<span class="sw"><i style="transition-delay:'+(i++*.06)+'s">'+w+'</i></span>'}).join(' ');var p=h.closest('.rv');if(!p){h.classList.add('rv')}else if(!h.classList.contains('rv')){}});
document.querySelectorAll('.hd h2').forEach(function(h){h.classList.add('rv');h.style.opacity=1;h.style.transform='none';io.observe(h)});
document.querySelectorAll('.sv .sc,.ts>div').forEach(function(e,i){e.style.transitionDelay=(i%4)*.1+'s'});
var cv=document.getElementById('cv'),cx=cv.getContext('2d'),W,H,mx=.5,my=.5;
function rs(){W=cv.width=cv.offsetWidth/3|0;H=cv.height=cv.offsetHeight/3|0}rs();addEventListener('resize',rs);
document.querySelector('.reel').addEventListener('mousemove',function(e){var b=this.getBoundingClientRect();mx=(e.clientX-b.left)/b.width;my=(e.clientY-b.top)/b.height});
var cs=[[255,96,2],[255,60,0],[130,20,2],[255,120,30]];
(function dr(ms){var t=ms/1000;cx.globalCompositeOperation='source-over';cx.fillStyle='#050302';cx.fillRect(0,0,W,H);cx.globalCompositeOperation='lighter';
cs.forEach(function(c,i){var x=W*(.55+.3*Math.sin(t*.4+i*1.7))+(mx-.5)*W*.2*(i%2?1:-1),y=H*(.50+.22*Math.cos(t*.33+i*2.1))+(my-.5)*H*.15,r=Math.max(W,H)*(.38+.12*Math.sin(t*.5+i)),g=cx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba('+c+',.75)');g.addColorStop(1,'rgba('+c+',0)');cx.fillStyle=g;cx.fillRect(0,0,W,H)});
requestAnimationFrame(dr)})(0);
var reel=document.querySelector('.reel'),h1=document.querySelector('.hero h1'),xw=document.getElementById('xw'),wp=document.getElementById('work'),wt=document.getElementById('wt'),pb=document.getElementById('pb'),tk=0;
function cl(v){return Math.max(0,Math.min(1,v))}
function sx(){tk=0;var y=scrollY,hp=cl(y/innerHeight);pb.style.transform='scaleX('+cl(y/(document.body.scrollHeight-innerHeight))+')';
reel.style.setProperty('--hp',hp);h1.style.transform='translateY('+(-hp*60)+'px)';
if(innerWidth>900){var b=xw.getBoundingClientRect(),p=cl((innerHeight-b.top*1-innerHeight*.15)/(innerHeight*.9));xw.style.transform='scale('+(.62+.38*p)+')';xw.style.borderRadius=(40-14*p)+'px';
var r=wp.getBoundingClientRect(),m=wt.scrollWidth-innerWidth;wp.style.height=(m+innerHeight)+'px';wt.style.transform='translateX('+(-cl(-r.top/(wp.offsetHeight-innerHeight))*m)+'px)'}}
addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(sx)}},{passive:true});addEventListener('resize',sx);addEventListener('load',sx);sx();
document.querySelectorAll('.btn,.pill').forEach(function(b){b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25)+'px,'+((e.clientY-r.top-r.height/2)*.35)+'px)'});b.addEventListener('mouseleave',function(){b.style.transform=''})});
document.querySelectorAll('.hc').forEach(function(e){e.addEventListener('mouseenter',function(){c.textContent=e.dataset.v;c.style.width=c.style.height='84px'});e.addEventListener('mouseleave',function(){c.textContent='';c.style.width=c.style.height='12px'})});

var rs2=document.querySelectorAll('#rot span'),ix=document.querySelectorAll('#idx li'),cur=0;
function rot(){rs2.forEach(function(s,i){s.className=i===cur?'on':(i===(cur+3)%4?'out':'')});ix.forEach(function(l,i){l.className=i===cur?'on':''});cur=(cur+1)%4}
rot();setInterval(rot,2400);
var hm=document.getElementById('hm'),sp=document.getElementById('sp'),rl=document.querySelector('.reel');
rl.addEventListener('mousemove',function(e){var b=rl.getBoundingClientRect(),x=(e.clientX-b.left)/b.width,y=(e.clientY-b.top)/b.height;hm.style.transform='translateY(-50%) translate('+((x-.5)*-34)+'px,'+((y-.5)*-22)+'px)';sp.style.setProperty('--x',e.clientX-b.left+'px');sp.style.setProperty('--y',e.clientY-b.top+'px')});

document.querySelectorAll('.tk>div').forEach(function(d){d.innerHTML+=d.innerHTML});
var nm=document.querySelector('.nm'),nn=nm.querySelectorAll('[data-n]');
function c2(n){var to=parseFloat(n.dataset.n),sf=n.dataset.s,d=to%1?1:0,a=performance.now();n._a=a;(function f(t){if(n._a!==a)return;var k=Math.min(1,(t-a)/1800);n.textContent=(to*(1-Math.pow(1-k,3))).toFixed(d)+sf;if(k<1)requestAnimationFrame(f)})(a)}
new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){nm.classList.add('in');nn.forEach(c2)}else{nm.classList.remove('in');nn.forEach(function(n){n._a=0;n.textContent='0'+n.dataset.s})}})},{threshold:.3}).observe(nm);
var stp=document.querySelectorAll('.stp'),rg=document.getElementById('rg'),rn=document.getElementById('rn'),pcs=document.getElementById('process'),la=-1;
function ps(){var best=0,bd=1e9;stp.forEach(function(s,i){var b=s.getBoundingClientRect(),d=Math.abs(b.top+b.height/2-innerHeight*.5);if(d<bd){bd=d;best=i}});
var r=pcs.getBoundingClientRect();rg.style.strokeDashoffset=339.3*(1-cl((innerHeight*.5-r.top)/r.height));
if(best!==la){la=best;stp.forEach(function(s,i){s.classList.toggle('on',i===best)});rn.textContent='0'+(best+1);rn.classList.remove('sw2');void rn.offsetWidth;rn.classList.add('sw2')}}
addEventListener('scroll',ps,{passive:true});addEventListener('resize',ps);ps();


document.querySelectorAll('#cc button').forEach(function(b){b.addEventListener('click',function(){b.classList.toggle('on')})});
var cf=document.getElementById('cf');cf.addEventListener('submit',function(e){e.preventDefault();document.getElementById('ok').textContent='Thank you! We’ll reply within one working day.';cf.reset();document.querySelectorAll('#cc button').forEach(function(b){b.classList.remove('on')})});

}
