// @ts-nocheck
// Scroll, cursor, theme, counters and canvas animations (optimized for 60/120fps silky smooth scrolling).
export function initMotion(): () => void {
  // If there's an existing instance running, clean it up first
  if (typeof window !== 'undefined' && window.__onytCleanup) {
    try {
      window.__onytCleanup();
    } catch (e) {
      console.warn('Error during motion cleanup:', e);
    }
    window.__onytCleanup = null;
  }

  // Preloader
  var pl = document.querySelector('.pl') as HTMLElement | null;
  var pc = document.getElementById('pc');
  var alreadyLoaded = false;
  try {
    alreadyLoaded = document.body.classList.contains('ld') || Boolean(window.__onytPreloaded || sessionStorage.getItem('onyt_preloaded'));
  } catch (e) {
    alreadyLoaded = document.body.classList.contains('ld') || Boolean(window.__onytPreloaded);
  }

  if (pl) {
    if (alreadyLoaded) {
      // Dismiss immediately without animation delay if returning from another page
      pl.style.display = 'none';
      pl.style.pointerEvents = 'none';
      document.body.classList.add('ld');
    } else {
      window.__onytPreloaded = true;
      try { sessionStorage.setItem('onyt_preloaded', 'true'); } catch (e) {}

      var a0 = performance.now();
      var finished = false;
      var preloaderRafId = 0;

      var dismissPreloader = function() {
        if (finished) return;
        finished = true;
        if (preloaderRafId) cancelAnimationFrame(preloaderRafId);
        if (pl) {
          pl.classList.add('out');
          setTimeout(function() {
            if (pl) {
              pl.style.display = 'none';
              pl.style.pointerEvents = 'none';
            }
          }, 1100);
        }
        document.body.classList.add('ld');
      };

      (function f(n) {
        if (finished) return;
        var k = Math.min(1, (n - a0) / 1000);
        if (pc) pc.textContent = Math.round(k * 100) + '%';
        if (k < 1) {
          preloaderRafId = requestAnimationFrame(f);
        } else {
          dismissPreloader();
        }
      })(a0);

      // Failsafe timer (maximum 1.6s): user will never ever be stuck on 0%
      setTimeout(dismissPreloader, 1600);
    }
  } else {
    document.body.classList.add('ld');
  }

  // Marquee
  var mq = document.getElementById('mq');
  if (mq && !mq.dataset.ready) {
    mq.dataset.ready = '1';
    var it = ['Performance Marketing', 'Branding', 'Website Development', 'Application Development'], h = '';
    for (var i = 0; i < 4; i++) it.forEach(function(t) { h += '<span>' + t + '</span><b>✦</b>'; });
    mq.innerHTML = h;
  }

  // Kolkata live clock
  var tc = document.getElementById('tc');
  function ck() {
    if (tc) tc.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata' });
  }
  ck();
  var clockInterval = setInterval(ck, 1000);

  // About text word reveal
  var st = document.getElementById('st');
  var ws: HTMLElement[] = [];
  function initWordSplit() {
    if (!st) return;
    var raw = (st.getAttribute('data-raw') || st.textContent || '').trim().replace(/\s+/g, ' ');
    if (!raw) return;
    st.setAttribute('data-raw', raw);
    var words = raw.split(' ').filter(Boolean);
    st.innerHTML = words.map(function(w) { return '<span class="w">' + w + '</span>'; }).join(' ');
    ws = Array.from(st.querySelectorAll<HTMLElement>('.w'));
  }
  initWordSplit();

  function sc() {
    if (!st) return;
    if (!ws.length) {
      ws = Array.from(st.querySelectorAll<HTMLElement>('.w'));
      if (!ws.length) {
        initWordSplit();
      }
    }
    if (!ws.length) return;
    var b = st.getBoundingClientRect();
    var vh = window.innerHeight || 800;
    // Reveal begins when top of text enters at 85% of viewport
    // Fully revealed when top of text reaches 25% of viewport
    var start = vh * 0.85;
    var end = vh * 0.25;
    var p = Math.max(0, Math.min(1, (start - b.top) / (start - end)));
    for (var i = 0; i < ws.length; i++) {
      ws[i].classList.toggle('on', i / ws.length <= p);
    }
  }

  // Number counting on intersection
  function cnt(n) {
    var to = parseFloat(n.dataset.n), sf = n.dataset.s || '', d = to % 1 ? 1 : 0, a = performance.now();
    (function f(t) {
      var k = Math.min(1, (t - a) / 1700);
      n.textContent = (to * (1 - Math.pow(1 - k, 3))).toFixed(d) + sf;
      if (k < 1) requestAnimationFrame(f);
    })(a);
  }

  var io = new IntersectionObserver(function(es) {
    es.forEach(function(e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      el.classList.add('on');
      io.unobserve(el);
      el.querySelectorAll('[data-n]').forEach(cnt);
      if (el.id === 'pr') el.style.setProperty('--p', '100%');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.rv').forEach(function(e) { io.observe(e); });

  // Custom magnetic cursor
  var onMouseMove = null;
  var c = document.querySelector('.cur') as HTMLElement | null;
  if (c) {
    onMouseMove = function(e: MouseEvent) {
      c.style.opacity = '1';
      c.style.transform = 'translate3d(' + e.clientX + 'px,' + e.clientY + 'px,0) translate(-50%,-50%)';
    };
    addEventListener('mousemove', onMouseMove, { passive: true });

    document.querySelectorAll('a,button,.sc,.pj').forEach(function(e) {
      e.addEventListener('mouseenter', function() { c.style.width = c.style.height = '50px'; });
      e.addEventListener('mouseleave', function() { c.style.width = c.style.height = '12px'; });
    });
  }

  // Animated headings
  document.querySelectorAll('.hd h2,.ctx h2').forEach(function(h) {
    if (h.dataset.split) return;
    h.dataset.split = '1';
    var i = 0;
    h.innerHTML = h.textContent.split(' ').map(function(w) {
      return '<span class="sw"><i style="transition-delay:' + (i++ * 0.06) + 's">' + w + '</i></span>';
    }).join(' ');
  });

  // Services transition stagger
  document.querySelectorAll('.sv .sc,.ts-item').forEach(function(e, i) {
    e.style.transitionDelay = (i % 4) * 0.08 + 's';
  });

  // Hero interactive canvas background with visibility pause
  var cv = document.getElementById('cv') as HTMLCanvasElement | null;
  var cx = cv ? cv.getContext('2d') : null;
  var W = 0, H = 0, mx = 0.5, my = 0.5;
  var cvVisible = true;
  var cvObserver: IntersectionObserver | null = null;
  var cvRafId = 0;
  var onCvResize: (() => void) | null = null;

  if (cv && cx) {
    onCvResize = function() {
      if (!cv) return;
      W = cv.width = (cv.offsetWidth / 3) | 0;
      H = cv.height = (cv.offsetHeight / 3) | 0;
    };
    onCvResize();
    addEventListener('resize', onCvResize);

    if ('IntersectionObserver' in window) {
      cvObserver = new IntersectionObserver(function(entries) {
        if (entries[0]) cvVisible = entries[0].isIntersecting;
      }, { threshold: 0 });
      cvObserver.observe(cv);
    }

    var reelEl = document.querySelector('.reel');
    if (reelEl) {
      reelEl.addEventListener('mousemove', function(e: any) {
        var b = this.getBoundingClientRect();
        mx = (e.clientX - b.left) / b.width;
        my = (e.clientY - b.top) / b.height;
      }, { passive: true });
    }

    var cs = [[255, 96, 2], [255, 60, 0], [130, 20, 2], [255, 120, 30]];
    (function dr(ms) {
      if (cvVisible && cx) {
        var t = ms / 1000;
        cx.globalCompositeOperation = 'source-over';
        cx.fillStyle = '#050302';
        cx.fillRect(0, 0, W, H);
        cx.globalCompositeOperation = 'lighter';
        for (var i = 0; i < cs.length; i++) {
          var cColor = cs[i];
          var x = W * (0.55 + 0.3 * Math.sin(t * 0.4 + i * 1.7)) + (mx - 0.5) * W * 0.2 * (i % 2 ? 1 : -1);
          var y = H * (0.50 + 0.22 * Math.cos(t * 0.33 + i * 2.1)) + (my - 0.5) * H * 0.15;
          var rad = Math.max(W, H) * (0.38 + 0.12 * Math.sin(t * 0.5 + i));
          var g = cx.createRadialGradient(x, y, 0, x, y, rad);
          g.addColorStop(0, 'rgba(' + cColor + ',.75)');
          g.addColorStop(1, 'rgba(' + cColor + ',0)');
          cx.fillStyle = g;
          cx.fillRect(0, 0, W, H);
        }
      }
      cvRafId = requestAnimationFrame(dr);
    })(0);
  }

  // Scroll animations: Unified RAF loop without layout thrashing
  var reel = document.querySelector('.reel') as HTMLElement | null;
  var h1 = document.querySelector('.hero h1') as HTMLElement | null;
  var xw = document.getElementById('xw');
  var wp = document.getElementById('work');
  var wt = document.getElementById('wt');
  var pb = document.getElementById('pb');
  var stp = document.querySelectorAll('.stp');
  var rg = document.getElementById('rg');
  var rn = document.getElementById('rn');
  var pcs = document.getElementById('process');
  var la = -1;

  function cl(v: number) { return Math.max(0, Math.min(1, v)); }

  function updateWorkLayout() {
    if (wp && wt && innerWidth > 900) {
      var m = wt.scrollWidth - innerWidth;
      wp.style.height = (m + innerHeight) + 'px';
    } else if (wp) {
      wp.style.height = '';
    }
  }
  updateWorkLayout();
  addEventListener('resize', updateWorkLayout);

  function runScrollTasks() {
    var y = window.scrollY || window.pageYOffset || 0;
    var maxScroll = (document.body.scrollHeight - innerHeight) || 1;
    var hp = cl(y / innerHeight);

    if (pb) pb.style.transform = 'scaleX(' + cl(y / maxScroll) + ')';
    if (reel) reel.style.setProperty('--hp', String(hp));
    if (h1) h1.style.transform = 'translate3d(0,' + (-hp * 60) + 'px,0)';

    if (innerWidth > 900) {
      if (xw) {
        var bXw = xw.getBoundingClientRect();
        var pXw = cl((innerHeight - bXw.top - innerHeight * 0.15) / (innerHeight * 0.9));
        xw.style.transform = 'scale(' + (0.62 + 0.38 * pXw) + ')';
        xw.style.borderRadius = (40 - 14 * pXw) + 'px';
      }

      if (wp && wt) {
        var rWp = wp.getBoundingClientRect();
        var m = wt.scrollWidth - innerWidth;
        var totalDist = wp.offsetHeight - innerHeight;
        if (totalDist > 0) {
          var prog = cl(-rWp.top / totalDist);
          wt.style.transform = 'translate3d(' + (-prog * m) + 'px,0,0)';
        }
      }
    }

    // Process section step indicator
    if (pcs && stp.length) {
      var best = 0, bd = 1e9;
      for (var sIdx = 0; sIdx < stp.length; sIdx++) {
        var sEl = stp[sIdx];
        var sRect = sEl.getBoundingClientRect();
        var dist = Math.abs(sRect.top + sRect.height / 2 - innerHeight * 0.5);
        if (dist < bd) { bd = dist; best = sIdx; }
      }
      var rPcs = pcs.getBoundingClientRect();
      if (rg) rg.style.strokeDashoffset = String(339.3 * (1 - cl((innerHeight * 0.5 - rPcs.top) / rPcs.height)));
      if (best !== la) {
        la = best;
        for (var j = 0; j < stp.length; j++) {
          stp[j].classList.toggle('on', j === best);
        }
        if (rn) {
          rn.textContent = '0' + (best + 1);
          rn.classList.remove('sw2');
          void rn.offsetWidth;
          rn.classList.add('sw2');
        }
      }
    }

    // Word reveal
    sc();
  }

  var scrollTicking = false;
  var scrollRafId = 0;
  function onScroll() {
    if (!scrollTicking) {
      scrollTicking = true;
      scrollRafId = requestAnimationFrame(function() {
        runScrollTasks();
        scrollTicking = false;
      });
    }
  }

  addEventListener('scroll', onScroll, { passive: true });
  var lenisOff: (() => void) | null = null;
  if (typeof window !== 'undefined') {
    var bindLenis = function() {
      var l = (window as any).__lenis;
      if (l && typeof l.on === 'function') {
        l.on('scroll', onScroll);
        lenisOff = function() {
          if (typeof l.off === 'function') l.off('scroll', onScroll);
        };
      }
    };
    bindLenis();
    setTimeout(bindLenis, 400);
  }
  onScroll();

  // Subtle interactive buttons tilt
  document.querySelectorAll('.btn,.pill').forEach(function(b) {
    b.addEventListener('mousemove', function(e: any) {
      var rRect = b.getBoundingClientRect();
      b.style.transform = 'translate(' + ((e.clientX - rRect.left - rRect.width / 2) * 0.2) + 'px,' + ((e.clientY - rRect.top - rRect.height / 2) * 0.25) + 'px)';
    }, { passive: true });
    b.addEventListener('mouseleave', function() { b.style.transform = ''; });
  });

  // Services rotator
  var rs2 = document.querySelectorAll('#rot span'), ix = document.querySelectorAll('#idx li'), cur = 0;
  function rot() {
    if (!rs2.length) return;
    rs2.forEach(function(s, i) { s.className = i === cur ? 'on' : (i === (cur + 3) % 4 ? 'out' : ''); });
    ix.forEach(function(l, i) { l.className = i === cur ? 'on' : ''; });
    cur = (cur + 1) % 4;
  }
  rot();
  var rotInterval = setInterval(rot, 2400);

  // Parallax hero badge
  var hm = document.getElementById('hm'), sp = document.getElementById('sp'), rl = document.querySelector('.reel');
  if (rl && hm && sp) {
    rl.addEventListener('mousemove', function(e: any) {
      var bRl = rl.getBoundingClientRect(), x = (e.clientX - bRl.left) / bRl.width, y = (e.clientY - bRl.top) / bRl.height;
      hm.style.transform = 'translateY(-50%) translate(' + ((x - 0.5) * -34) + 'px,' + ((y - 0.5) * -22) + 'px)';
      sp.style.setProperty('--x', e.clientX - bRl.left + 'px');
      sp.style.setProperty('--y', e.clientY - bRl.top + 'px');
    }, { passive: true });
  }

  // Contact form tags
  document.querySelectorAll('#cc button').forEach(function(b) {
    b.addEventListener('click', function() { b.classList.toggle('on'); });
  });

  var cf = document.getElementById('cf') as HTMLFormElement | null;
  if (cf) {
    cf.addEventListener('submit', function(e) {
      e.preventDefault();
      var okEl = document.getElementById('ok');
      if (okEl) okEl.textContent = 'Thank you! We’ll reply within one working day.';
      cf.reset();
      document.querySelectorAll('#cc button').forEach(function(b) { b.classList.remove('on'); });
    });
  }

  // Cleanup handler when unmounting or re-initializing
  var cleanup = function() {
    clearInterval(clockInterval);
    clearInterval(rotInterval);
    if (io) io.disconnect();
    if (cvObserver) cvObserver.disconnect();
    if (cvRafId) cancelAnimationFrame(cvRafId);
    if (scrollRafId) cancelAnimationFrame(scrollRafId);
    if (onCvResize) removeEventListener('resize', onCvResize);
    removeEventListener('resize', updateWorkLayout);
    removeEventListener('scroll', onScroll);
    if (lenisOff) lenisOff();
    if (onMouseMove) removeEventListener('mousemove', onMouseMove);
  };

  window.__onytCleanup = cleanup;
  return cleanup;
}
