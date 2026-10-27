/* ==========================================================================
   LunaVision — Interaktion
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Jahr im Footer ---------- */
  var jahr = document.getElementById('jahr');
  if (jahr) { jahr.textContent = new Date().getFullYear(); }

  /* ---------- Navigation: Hintergrund beim Scrollen ---------- */
  var nav = document.getElementById('nav');
  if (nav) {
    var setStuck = function () {
      nav.classList.toggle('is-stuck', window.scrollY > 40);
    };
    window.addEventListener('scroll', setStuck, { passive: true });
    setStuck();
  }

  /* ---------- Mobiles Menü ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    var setMenu = function (open) {
      mobileMenu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    };

    menuBtn.addEventListener('click', function () {
      setMenu(mobileMenu.hidden);
    });

    Array.prototype.forEach.call(mobileMenu.querySelectorAll('a'), function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !mobileMenu.hidden) { setMenu(false); }
    });
  }

  /* ---------- Scroll-Reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    Array.prototype.forEach.call(revealEls, function (el, i) {
      el.style.transitionDelay = (Math.min(i, 6) * 70) + 'ms';
      revealObserver.observe(el);
    });
  } else {
    Array.prototype.forEach.call(revealEls, function (el) { el.classList.add('is-in'); });
  }

  /* ======================================================================
     Video-Steuerung
     ====================================================================== */
  var videos = document.querySelectorAll('.reel-video');

  var safePlay = function (video) {
    var promise = video.play();
    if (promise && typeof promise.catch === 'function') { promise.catch(function () {}); }
  };

  var setMuted = function (video, muted) {
    video.muted = muted;
    var screen = video.closest('.phone-screen');
    if (!screen) { return; }
    var btn = screen.querySelector('.sound-toggle');
    if (!btn) { return; }
    btn.classList.toggle('is-on', !muted);
    btn.setAttribute('aria-label', muted ? 'Ton einschalten' : 'Ton ausschalten');
    var text = btn.querySelector('.label');
    if (text) { text.textContent = muted ? 'Ton' : 'Ton an'; }
  };

  var pauseOthers = function (current) {
    Array.prototype.forEach.call(videos, function (video) {
      if (video !== current && !video.paused) {
        video.pause();
        setMuted(video, true);
      }
    });
  };

  /* Fehlende Videodatei: Video ausblenden, Verlaufs-Fallback bleibt sichtbar */
  Array.prototype.forEach.call(videos, function (video) {
    var markMissing = function () {
      video.classList.add('is-missing');
      video.dataset.missing = 'true';
      var screen = video.closest('.phone-screen');
      if (screen) {
        var btn = screen.querySelector('.sound-toggle');
        if (btn) { btn.hidden = true; }
      }
    };

    video.addEventListener('error', markMissing, true);
    Array.prototype.forEach.call(video.querySelectorAll('source'), function (source) {
      source.addEventListener('error', markMissing);
    });
  });

  /* Clips starten stumm, sobald sie sichtbar werden */
  var autoVideos = document.querySelectorAll('.reel-video[data-autostart="true"]');

  if ('IntersectionObserver' in window) {
    var playObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (video.dataset.missing === 'true') { return; }
        if (entry.isIntersecting) {
          if (video.preload === 'none') { video.preload = 'auto'; video.load(); }
          safePlay(video);
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.35 });

    Array.prototype.forEach.call(autoVideos, function (video) { playObserver.observe(video); });
  } else {
    Array.prototype.forEach.call(autoVideos, function (video) { safePlay(video); });
  }

  /* Klick auf den Bildschirm: abspielen oder pausieren */
  Array.prototype.forEach.call(document.querySelectorAll('.phone-screen'), function (screen) {
    var video = screen.querySelector('.reel-video');
    if (!video) { return; }

    screen.addEventListener('click', function (event) {
      if (event.target.closest('.sound-toggle')) { return; }
      if (video.dataset.missing === 'true') { return; }

      if (video.paused) {
        pauseOthers(video);
        safePlay(video);
      } else {
        video.pause();
        setMuted(video, true);
      }
    });
  });

  /* Ton-Schalter */
  Array.prototype.forEach.call(document.querySelectorAll('.sound-toggle'), function (btn) {
    btn.addEventListener('click', function (event) {
      event.stopPropagation();
      var screen = btn.closest('.phone-screen');
      var video = screen ? screen.querySelector('.reel-video') : null;
      if (!video || video.dataset.missing === 'true') { return; }

      if (video.muted) {
        pauseOthers(video);
        setMuted(video, false);
        safePlay(video);
      } else {
        setMuted(video, true);
      }
    });
  });

  /* ======================================================================
     Cookie-Einwilligung
     ====================================================================== */
  var SPEICHER = 'lv-consent';
  var banner = document.getElementById('cookieBanner');
  var settingsBtn = document.getElementById('cookieSettingsBtn');

  var lies = function () {
    try { return window.localStorage.getItem(SPEICHER); }
    catch (e) { return null; }
  };

  var schreibe = function (wert) {
    try { window.localStorage.setItem(SPEICHER, wert); }
    catch (e) { /* Speicher nicht verfügbar — Banner erscheint erneut */ }
  };

  /* Platz für optionale Reichweitenmessung.
     Wird ausschließlich nach ausdrücklicher Einwilligung aufgerufen. */
  var ladeMessung = function () {
    if (window.lvMessungGeladen) { return; }
    window.lvMessungGeladen = true;
    /* Hier später das Analyse-Skript einhängen, z. B.:
       var s = document.createElement('script');
       s.src = 'https://...';
       s.defer = true;
       document.head.appendChild(s);
    */
  };

  var zeigeBanner = function () {
    if (!banner) { return; }
    banner.hidden = false;
    window.requestAnimationFrame(function () { banner.classList.add('is-visible'); });
  };

  var versteckeBanner = function () {
    if (!banner) { return; }
    banner.classList.remove('is-visible');
    window.setTimeout(function () { banner.hidden = true; }, 450);
  };

  if (banner) {
    var zustand = lies();

    if (zustand === 'accept') {
      ladeMessung();
    } else if (zustand !== 'decline') {
      window.setTimeout(zeigeBanner, 900);
    }

    Array.prototype.forEach.call(banner.querySelectorAll('[data-consent]'), function (btn) {
      btn.addEventListener('click', function () {
        var wahl = btn.getAttribute('data-consent');
        schreibe(wahl);
        if (wahl === 'accept') { ladeMessung(); }
        versteckeBanner();
      });
    });
  }

  if (settingsBtn) {
    settingsBtn.addEventListener('click', function () {
      try { window.localStorage.removeItem(SPEICHER); } catch (e) {}
      zeigeBanner();
    });
  }

})();
