/* JamJam portfolio: no external dependencies, analytics or cookies.
   To add verified profiles, replace the empty values below with complete https:// URLs. */
(function () {
  'use strict';
  const SOCIAL_LINKS = {
    youtube: '',
    tiktok: ''
  };
  document.querySelectorAll('[data-social]').forEach(function (node) {
    const key = node.getAttribute('data-social');
    const url = SOCIAL_LINKS[key];
    if (!url || !/^https:\/\/(www\.)?(youtube\.com|youtu\.be|tiktok\.com)\//i.test(url)) return;
    const a = document.createElement('a');
    a.className = 'social-link';
    a.textContent = key === 'youtube' ? 'YouTube ↗' : 'TikTok ↗';
    a.href = url;
    a.target = '_blank';
    a.rel = 'me noopener noreferrer';
    node.replaceWith(a);
  });
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  const hero = document.querySelector('.hero');
  const slides = Array.from(document.querySelectorAll('.ambient-slide'));
  const counter = document.getElementById('slide-count');
  const prev = document.getElementById('prev-slide');
  const next = document.getElementById('next-slide');
  const canvas = document.getElementById('signal-field');
  if (!hero || !slides.length || !canvas) return;
  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let px = 0;
  let py = 0;
  let dpr = 1;
  let width = 0;
  let height = 0;
  let raf = 0;
  let ripple = null;
  let downX = null;
  function setSlide(nextIndex) {
    current = (nextIndex + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === current);
    });
    if (counter) counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    positionSlides();
  }
  function positionSlides() {
    const positions = [
      {x:-150,y:-50,r:-15}, {x:70,y:-48,r:14},
      {x:-192,y:-47,r:-11}, {x:116,y:-48,r:17}
    ];
    slides.forEach(function (slide, i) {
      const p = positions[i % positions.length];
      const sx = p.x + (reduced.matches ? 0 : px * (i % 2 ? -1 : 1) * 13);
      const sy = p.y + (reduced.matches ? 0 : py * (i % 2 ? 1 : -1) * 3);
      const rotate = p.r + (reduced.matches ? 0 : px * 3);
      const scale = i === current ? 1.04 : .85;
      slide.style.transform = 'translate3d(' + sx + '%,' + sy + '%,0) rotate(' + rotate + 'deg) scale(' + scale + ')';
      slide.style.zIndex = i === current ? '1' : '0';
    });
  }
  function resize() {
    const rect = hero.getBoundingClientRect();
    width = Math.max(rect.width,1);
    height = Math.max(rect.height,1);
    dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    draw();
  }
  function draw() {
    raf = 0;
    ctx.clearRect(0,0,width,height);
    const step = width < 550 ? 28 : 35;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '11px monospace';
    for (let y = step * .5; y < height; y += step) {
      for (let x = step * .5; x < width; x += step) {
        const dx = x - (width * (.5 + px * .5));
        const dy = y - (height * (.5 + py * .5));
        const dist = Math.hypot(dx,dy);
        const strength = reduced.matches ? 0 : Math.max(0, 1 - dist / 260);
        ctx.fillStyle = 'rgba(255,255,255,' + (.12 + strength * .35) + ')';
        ctx.fillText(strength > .56 ? '/' : strength > .25 ? '·' : '+', x, y);
      }
    }
    if (ripple) {
      const delta = performance.now() - ripple.time;
      if (delta < 800 && !reduced.matches) {
        ctx.beginPath();
        ctx.arc(ripple.x,ripple.y,delta * .33,0,Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,' + (1 - delta / 800) * .45 + ')';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        requestDraw();
      } else ripple = null;
    }
  }
  function requestDraw() {
    if (!raf && !document.hidden) raf = window.requestAnimationFrame(draw);
  }
  function onMove(event) {
    const bounds = hero.getBoundingClientRect();
    px = Math.max(-1,Math.min(1,(event.clientX - bounds.left) / bounds.width * 2 - 1));
    py = Math.max(-1,Math.min(1,(event.clientY - bounds.top) / bounds.height * 2 - 1));
    if (!reduced.matches) positionSlides();
    requestDraw();
  }
  hero.addEventListener('pointermove',onMove,{passive:true});
  hero.addEventListener('pointerdown',function(event){
    downX = event.clientX;
    const bounds=hero.getBoundingClientRect();
    ripple={x:event.clientX-bounds.left,y:event.clientY-bounds.top,time:performance.now()};
    requestDraw();
  },{passive:true});
  hero.addEventListener('pointerup',function(event){
    if (downX===null) return;
    const distance=event.clientX-downX;
    downX=null;
    if (Math.abs(distance)>55){setSlide(current+(distance<0?1:-1));return;}
    if (event.target.closest('a, button, .identity, .nav')) return;
    setSlide(current+1);
  });
  if(prev) prev.addEventListener('click',function(){setSlide(current-1);});
  if(next) next.addEventListener('click',function(){setSlide(current+1);});
  document.addEventListener('keydown',function(event) {
    const tag = (event.target && event.target.tagName || '').toLowerCase();
    if (tag==='input' || tag==='textarea' || tag==='button' || tag==='a') return;
    if (event.key==='ArrowRight') setSlide(current+1);
    if (event.key==='ArrowLeft') setSlide(current-1);
  });
  window.addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',requestDraw);
  if (typeof reduced.addEventListener==='function') reduced.addEventListener('change',function(){positionSlides();requestDraw();});
  setSlide(0);
  resize();
})();