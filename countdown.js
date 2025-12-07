// assets/countdown.js
(function(){
  // target unlock date: 2026-01-24 00:00 IST
  const UNLOCK_ISO = '2026-01-24T00:00:00+05:30';
  const unlockTs = new Date(UNLOCK_ISO).getTime();

  function nowTs(){ return Date.now(); }

  function redirectTo(href){ window.location.href = href; }

  function onBeforeUnlock(){
    // on content pages if before unlock -> go to countdown
    if (!location.pathname.endsWith('/countdown.html') && !location.pathname.endsWith('/birthday.html')) {
      redirectTo('/countdown.html');
    }
  }

  // If loaded on a content page and time not reached -> redirect
  const path = location.pathname.split('/').pop() || 'index.html';
  const contentPages = ['index.html','page2.html','letter.html','page3.html','page4.html','page5.html','final.html'];
  if (contentPages.includes(path)) {
    if (nowTs() < unlockTs) {
      // try to go to root-relative path 'countdown.html'
      redirectTo('/countdown.html');
    }
  }

  // If loaded on countdown page -> start countdown
  if (path === 'countdown.html' || path === '') {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('mins');
    const secsEl = document.getElementById('secs');

    function tick(){
      const diff = Math.max(0, unlockTs - nowTs());
      const s = Math.floor(diff/1000);
      const days = Math.floor(s / 86400);
      const hours = Math.floor((s % 86400) / 3600);
      const mins = Math.floor((s % 3600) / 60);
      const secs = s % 60;

      if (daysEl) daysEl.textContent = String(days).padStart(2,'0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2,'0');
      if (minsEl) minsEl.textContent = String(mins).padStart(2,'0');
      if (secsEl) secsEl.textContent = String(secs).padStart(2,'0');

      if (diff <= 0) {
        clearInterval(timer);
        // celebrate & redirect to birthday
        playConfetti();
        setTimeout(()=>{ redirectTo('/birthday.html'); }, 1500);
      }
    }
    const timer = setInterval(tick, 500);
    tick();
  }

  // small confetti helper - creates playful confetti pieces
  function playConfetti(){
    const canvasRoot = document.getElementById('confetti-canvas') || document.body;
    for (let i=0;i<80;i++){
      const p = document.createElement('div');
      p.className = 'confetti';
      const size = 6 + Math.random()*14;
      p.style.width = size+'px';
      p.style.height = size+'px';
      p.style.position = 'fixed';
      p.style.left = Math.random()*100 + 'vw';
      p.style.top = Math.random()*20 + 'vh';
      p.style.background = ['#ff6aa6','#ffd0e7','#fff08f','#ff9cc4'][Math.floor(Math.random()*4)];
      p.style.opacity = Math.random()*.9 + .4;
      p.style.transform = 'rotate('+ (Math.random()*360) +'deg)';
      p.style.borderRadius = (Math.random()>0.6?'50%':'2px');
      p.style.pointerEvents = 'none';
      p.style.zIndex = 9999;
      p.style.transition = 'transform 1.2s ease-out, top 1.2s ease-out, opacity 1.2s ease-out';
      document.body.appendChild(p);
      requestAnimationFrame(()=> {
        p.style.top = (80 + Math.random()*20) + 'vh';
        p.style.transform = 'translateY(50px) rotate(200deg)';
        p.style.opacity = 0;
      });
      setTimeout(()=>p.remove(), 1500);
    }
  }

  // expose tiny API
  window._gift = window._gift || {};
  window._gift.playConfetti = playConfetti;
  window._gift.UNLOCK_ISO = UNLOCK_ISO;
})();