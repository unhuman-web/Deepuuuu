// assets/main.js
(function(){
  // floating hearts generator
  function initFloatingHearts(){
    const root = document.getElementById('global-floating');
    if (!root) return;
    for (let i=0;i<9;i++){
      const d = document.createElement('div');
      d.className = 'floating-heart';
      d.style.left = Math.random() * 100 + 'vw';
      d.style.animationDelay = (Math.random()*6) + 's';
      d.style.animationDuration = (8 + Math.random()*7) + 's';
      d.style.opacity = (0.3 + Math.random()*0.7);
      root.appendChild(d);
    }
  }

  // audio toggle (gentle loop) - user must toggle to play
  let bgAudio;
  function initAudio(){
    bgAudio = new Audio();
    bgAudio.src = ''; // leave blank intentionally - add your track URL if you have one
    bgAudio.loop = true;
    bgAudio.volume = 0.28;
    bgAudio.preload = 'auto';

    document.querySelectorAll('#audioToggle, #audioBtn').forEach(btn=>{
      btn && btn.addEventListener('click', ()=> {
        if (bgAudio.paused){
          bgAudio.play().catch(()=>{}); // user action required on some devices
          btn.textContent = '🔊 Music: On';
        } else {
          bgAudio.pause();
          btn.textContent = '🔈 Music: Off';
        }
      });
    });
  }

  // enable page fade-in
  function initFade(){
    document.documentElement.classList.add('page-ready');
    const card = document.querySelector('.center-card');
    if (card) requestAnimationFrame(()=> card.style.transform = 'translateY(0) scale(1)');
  }

  // proposal page logic (yes/time)
  function initProposal(){
    const yesBtn = document.getElementById('yesBtn');
    const timeBtn = document.getElementById('timeBtn');
    const response = document.getElementById('responseText');

    if (yesBtn && response){
      yesBtn.addEventListener('click', ()=>{
        response.textContent = "Thank you, Deepu. Ninnu baaga chusukunta, promise. 💗";
        // small celebration
        window._gift.playConfetti();
        createMiniHearts();
        // gentle glow
        document.body.animate([{filter:'brightness(1)'},{filter:'brightness(1.06)'},{filter:'brightness(1)'}],{duration:900});
      });
    }
    if (timeBtn && response){
      timeBtn.addEventListener('click', ()=>{
        response.textContent = "It’s okay… nenu wait chestha. No pressure, only respect & care. 🕊️";
      });
    }
  }

  function createMiniHearts(){
    for (let i=0;i<18;i++){
      const span = document.createElement('span');
      span.textContent = '💗';
      span.style.position = 'fixed';
      span.style.left = (20 + Math.random()*60) + 'vw';
      span.style.top = (50 + Math.random()*20) + 'vh';
      span.style.fontSize = (12 + Math.random()*18) + 'px';
      span.style.opacity = '0.95';
      span.style.zIndex = 9999;
      span.style.transition = 'transform 1.4s ease-out, opacity 1.4s ease-out';
      document.body.appendChild(span);
      requestAnimationFrame(()=> {
        span.style.transform = `translateY(-220px) translateX(${(Math.random()-0.5)*120}px) rotate(${(Math.random()*120)-60}deg)`;
        span.style.opacity = '0';
      });
      setTimeout(()=>span.remove(),1500);
    }
  }

  // "open gift" button on birthday page
  function initOpenGift(){
    const btn = document.getElementById('openGift');
    if (!btn) return;
    btn.addEventListener('click', ()=> {
      // small reveal animation then redirect
      document.querySelector('.center-card').animate([{transform:'scale(1)'},{transform:'scale(.98)'},{transform:'scale(1)'}],{duration:800});
      setTimeout(()=> location.href = '/index.html', 700);
    });
  }

  // small guard: if unlocked, ensure content pages are accessible
  function unlockGuard(){
    const unlockIso = window._gift && window._gift.UNLOCK_ISO;
    if (!unlockIso) return;
    const unlockTs = new Date(unlockIso).getTime();
    if (Date.now() >= unlockTs) {
      // do nothing - allowed
    } else {
      // we are on a content page but before unlock -> redirect handled in countdown.js
    }
  }

  // init
  document.addEventListener('DOMContentLoaded', ()=>{
    initFloatingHearts();
    initAudio();
    initFade();
    initProposal();
    initOpenGift();
    unlockGuard();
  });

})();