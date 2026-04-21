/* CircleShot Creations — site interactions.
   Sticky nav, reveal-on-scroll, reel carousel, mobile burger, hero parallax. */

(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ------- Year in footer -------
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // ------- Sticky nav -------
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('is-stuck');
    else nav.classList.remove('is-stuck');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ------- Mobile burger -------
  const burger = document.getElementById('navBurger');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('.nav__links a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ------- Smooth anchor scroll (the scroll-behavior:smooth covers most) -------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        }
      }
    });
  });

  // ------- Reveal on scroll -------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-in'));
  }

  // ------- Hero mouse parallax (blobs + rig tilt) -------
  const hero = document.querySelector('.hero');
  const blobCyan = document.querySelector('.hero__blob--cyan');
  const blobMag  = document.querySelector('.hero__blob--magenta');
  const rigLogo  = document.querySelector('.rig__logo');
  const rigVideo = document.querySelector('.rig__card--video');
  const rigPhoto = document.querySelector('.rig__card--photo');

  if (hero && !reduced && matchMedia('(hover: hover)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      if (blobCyan) {
        blobCyan.style.top  = `${-200 + y * 80}px`;
        blobCyan.style.left = `${-200 + x * 120}px`;
      }
      if (blobMag) {
        blobMag.style.bottom = `${-200 - y * 80}px`;
        blobMag.style.right  = `${-200 - x * 100}px`;
      }
      const tilt = (x * 2 - 1) * 3;
      if (rigLogo)  rigLogo.style.transform = `perspective(1000px) rotateY(${tilt}deg)`;
      if (rigVideo) rigVideo.style.transform = `rotate(6deg) translateY(${y * -10}px)`;
      if (rigPhoto) rigPhoto.style.transform = `rotate(-8deg) translateY(${y * 10}px)`;
    });
  }

  // ------- Hero spec chip: rolling rotation display -------
  const specRot = document.getElementById('specRot');
  if (specRot && !reduced) {
    let a = 0, last = performance.now();
    const tick = (t) => {
      const dt = (t - last) / 1000; last = t;
      a = (a + dt * 18) % 360;
      specRot.textContent = `ROT ${Math.round(a)}°`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // ------- REEL carousel -------
  const stage = document.getElementById('reelStage');
  const dotsWrap = document.getElementById('reelDots');
  const metaEl = document.getElementById('reelMeta');

  const shots = [
    { type: 'video', src: 'assets/images/hero-reel.mp4', ev: 'PROM · 360° SPIN',         accent: 'Live capture' },
    { type: 'image', src: 'assets/images/photo-2.jpg',   ev: 'INFINITY PLATFORM · ENTRY', accent: 'LED floor'   },
    { type: 'image', src: 'assets/images/photo-1.jpg',   ev: 'RING LIGHT · CLOSE-UP',     accent: 'Ring glow'   },
    { type: 'image', src: 'assets/images/photo-3.jpg',   ev: 'GROUP SHOT · 3-UP',         accent: 'Boas + LED'  },
  ];
  let idx = 0;
  let timer = null;

  function shotHTML(shot, role) {
    const media = shot.type === 'video'
      ? `<video src="${shot.src}" autoplay muted loop playsinline preload="metadata"></video>`
      : `<img src="${shot.src}" alt="${shot.ev}" />`;
    const rec = role === 'main' ? `
      <div class="shot__rec">
        <span class="shot__rec-dot"></span>
        ${shot.type === 'video' ? 'LIVE · ' : 'STILL · '}${shot.accent}
      </div>` : '';
    const play = role === 'main' ? `
      <div class="shot__play" aria-hidden="true">
        <svg viewBox="0 0 16 16"><path d="M4 2 L 14 8 L 4 14 Z" fill="currentColor"/></svg>
      </div>` : '';
    return `
      <div class="shot ${role === 'main' ? 'shot--main' : 'shot--minor'}" data-role="${role}">
        ${media}
        <div class="shot__overlay"></div>
        ${rec}
        <div class="shot__footer">
          <div class="shot__event">${shot.ev}</div>
          ${play}
        </div>
      </div>
    `;
  }

  function render() {
    if (!stage) return;
    const n = shots.length;
    const prev = shots[(idx + n - 1) % n];
    const curr = shots[idx];
    const next = shots[(idx + 1) % n];
    stage.innerHTML = shotHTML(prev, 'prev') + shotHTML(curr, 'main') + shotHTML(next, 'next');

    if (dotsWrap) {
      dotsWrap.querySelectorAll('.reel__dot').forEach((b, i) => {
        b.classList.toggle('is-active', i === idx);
      });
    }
    if (metaEl) {
      metaEl.textContent = `REC · ${String(idx + 1).padStart(2,'0')} / ${String(n).padStart(2,'0')} · ${curr.ev}`;
    }
  }

  function advance() {
    idx = (idx + 1) % shots.length;
    render();
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(advance, 4800);
  }
  function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }

  if (dotsWrap) {
    dotsWrap.innerHTML = shots.map((_, i) =>
      `<button class="reel__dot" data-idx="${i}" aria-label="shot ${i+1}"></button>`
    ).join('');
    dotsWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.reel__dot');
      if (!btn) return;
      idx = Number(btn.dataset.idx) | 0;
      render();
      startAuto();
    });
  }

  if (stage) {
    stage.addEventListener('click', (e) => {
      const t = e.target.closest('.shot');
      if (!t) return;
      const role = t.dataset.role;
      if (role === 'next') { advance(); startAuto(); }
      else if (role === 'prev') {
        idx = (idx - 1 + shots.length) % shots.length;
        render();
        startAuto();
      }
    });
  }

  render();
  if (!reduced) startAuto();

  // Pause autoplay when not visible
  if ('IntersectionObserver' in window && stage) {
    const vio = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !reduced) startAuto(); else stopAuto();
    }, { threshold: 0.2 });
    vio.observe(stage);
  }

  // ------- Package card active-on-hover -------
  const pkgs = document.querySelectorAll('.pkg');
  pkgs.forEach(p => {
    p.addEventListener('mouseenter', () => {
      pkgs.forEach(x => x.classList.remove('is-active'));
      p.classList.add('is-active');
    });
  });
  const featured = document.querySelector('.pkg--popular');
  if (featured) featured.classList.add('is-active');

  // ------- FAQ: close others when one opens -------
  const faqs = document.querySelectorAll('.faq__item');
  faqs.forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) faqs.forEach(o => { if (o !== d) o.open = false; });
    });
  });
})();
