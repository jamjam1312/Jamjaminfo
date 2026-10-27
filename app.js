(()=>{'use strict';
const b=document.getElementById('more-button'),p=document.getElementById('more-panel'),c=document.getElementById('profile'),y=document.getElementById('year');
if(y)y.textContent=String(new Date().getFullYear());
if(b&&p)b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));p.hidden=!open;});
if(!c)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
let x=0,z=0,raf=0;
function update(){raf=0;c.style.setProperty('--tx',(fine.matches&&!reduced.matches?x*2.2:0).toFixed(2)+'deg');c.style.setProperty('--ty',(fine.matches&&!reduced.matches?-z*1.6:0).toFixed(2)+'deg');c.style.setProperty('--spot-x',(50+x*38)+'%');c.style.setProperty('--spot-y',(50+z*28)+'%');}
function schedule(){if(!raf)raf=requestAnimationFrame(update)}
c.addEventListener('pointermove',e=>{if(!fine.matches||reduced.matches)return;const r=c.getBoundingClientRect();x=((e.clientX-r.left)/r.width-.5)*2;z=((e.clientY-r.top)/r.height-.5)*2;schedule()},{passive:true});
c.addEventListener('pointerleave',()=>{x=0;z=0;schedule()});
})();