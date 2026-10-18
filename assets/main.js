/* Nelavista / Abdul Afeez Tella: small progressive enhancements, no dependencies. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.querySelector('.site-header');

  /* Header: solid background once the page scrolls */
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-menu');
  var main = document.getElementById('main');
  var footer = document.querySelector('.site-footer');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.menu-toggle__label').textContent = open ? 'Close' : 'Menu';
    document.body.classList.toggle('menu-open', open);
    [main, footer].forEach(function (el) { el.inert = open; });
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(function () {
        menu.classList.add('is-open');
        var first = menu.querySelector('a');
        if (first) first.focus({ preventScroll: true });
      });
    } else {
      menu.classList.remove('is-open');
      window.setTimeout(function () {
        if (!menu.classList.contains('is-open')) menu.hidden = true;
      }, reduceMotion ? 0 : 350);
    }
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 960px)').addEventListener('change', function (mq) {
    if (mq.matches && toggle.getAttribute('aria-expanded') === 'true') setMenu(false);
  });

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  /* Reveal on scroll */
  var revealer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      revealer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  document.querySelectorAll('[data-reveal]').forEach(function (el) { revealer.observe(el); });

  /* Count-up for verified figures */
  var counter = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      counter.unobserve(entry.target);
      var el = entry.target;
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (reduceMotion || !target) { el.textContent = target.toLocaleString('en-US'); return; }
      var start = null;
      var duration = 1600;
      var step = function (t) {
        if (start === null) start = t;
        var p = Math.min((t - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(target * eased).toLocaleString('en-US');
        if (p < 1) requestAnimationFrame(step);
      };
      el.textContent = '0';
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(function (el) { counter.observe(el); });

  /* Highlight the nav item for the section in view */
  var links = {};
  document.querySelectorAll('.nav__link').forEach(function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      Object.keys(links).forEach(function (k) {
        links[k].classList.remove('is-active');
        links[k].removeAttribute('aria-current');
      });
      var link = links[entry.target.id];
      if (link) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'true');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('.hero, main > section[id]').forEach(function (section) {
    spy.observe(section);
  });
})();
