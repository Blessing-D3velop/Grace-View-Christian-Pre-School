(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TOTAL = 10;

  /* Logo embedded as data URI: shows even if images/logo.jpeg is missing */
  var LOGO = 'data:image/png;base64,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';
  document.querySelectorAll('img.logo-img').forEach(function (el) { el.src = LOGO; });
  var fav = document.querySelector('link[rel="icon"]'); if (fav) fav.href = LOGO;

  $('#year').textContent = new Date().getFullYear();

  /* Header, back to top, parallax */
  var header = $('#header'), topBtn = $('#top'), heroImg = $('#heroImg');
  var decos = document.querySelectorAll('.hero [data-speed]');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 50);
    topBtn.classList.toggle('show', y > 700);
    if (!reduce && y < window.innerHeight * 1.2) {
      heroImg.style.transform = 'translateY(' + (y * 0.15) + 'px)';
      decos.forEach(function (d) { d.style.transform = 'translateY(' + (y * d.dataset.speed) + 'px)'; });
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  function toTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  topBtn.addEventListener('click', toTop);
  $('#toTopCta').addEventListener('click', toTop);

  /* Mobile menu */
  var burger = $('#burger'), menu = $('#menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* Gallery mosaic: big / tall / wide tiles mixed with standard ones */
  var pattern = { 1: 'big', 4: 'tall', 6: 'wide', 9: 'tall', 11: 'big', 14: 'wide', 17: 'tall' };
  var mosaic = $('#mosaic'), images = [];
  for (var i = 1; i <= TOTAL; i++) {
    var src = 'images/image' + i + '.jpeg';
    images.push(src);
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'g rv ' + (pattern[i] || '');
    b.dataset.index = i - 1;
    b.style.setProperty('--d', ((i % 4) * 0.08) + 's');
    b.setAttribute('aria-label', 'Open photo ' + i + ' of ' + TOTAL);
    b.innerHTML = '<img src="' + src + '" alt="Photo ' + i + ' from Graceview Christian Pre-School in Brakpan" loading="lazy">';
    mosaic.appendChild(b);
  }

  /* Lightbox: gallery set (with prev/next) or a single poster */
  var lb = $('#lb'), lbImg = $('#lbImg'), set = images, cur = 0, lastFocus = null, singleAlt = '';
  function show(n) {
    cur = (n + set.length) % set.length;
    lbImg.src = set[cur];
    lbImg.alt = set === images ? 'Photo ' + (cur + 1) + ' of ' + TOTAL + ' from Graceview Christian Pre-School in Brakpan' : singleAlt;
  }
  function openLb(list, n, alt) {
    lastFocus = document.activeElement;
    set = list; singleAlt = alt || '';
    $('#lbPrev').style.display = $('#lbNext').style.display = set.length > 1 ? '' : 'none';
    show(n);
    lb.hidden = false;
    requestAnimationFrame(function () { lb.classList.add('open'); });
    document.body.style.overflow = 'hidden';
    $('#lbClose').focus();
  }
  function closeLb() {
    lb.classList.remove('open');
    setTimeout(function () { lb.hidden = true; }, 250);
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  mosaic.addEventListener('click', function (e) {
    var t = e.target.closest('.g');
    if (t) openLb(images, +t.dataset.index);
  });
  /* Posters: any .zoom button opens the image inside it (or the nearest guide image) */
  document.querySelectorAll('.zoom').forEach(function (z) {
    z.addEventListener('click', function () {
      var img = z.querySelector('img') || document.querySelector('.guide-img img');
      openLb([img.getAttribute('src')], 0, img.alt);
    });
  });
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', function () { show(cur - 1); });
  $('#lbNext').addEventListener('click', function () { show(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    else if (set.length > 1 && e.key === 'ArrowLeft') show(cur - 1);
    else if (set.length > 1 && e.key === 'ArrowRight') show(cur + 1);
  });

  /* FAQ accordion: one open at a time */
  var qs = document.querySelectorAll('.acc-q');
  qs.forEach(function (q) {
    q.addEventListener('click', function () {
      var open = q.getAttribute('aria-expanded') === 'true';
      qs.forEach(function (o) {
        o.setAttribute('aria-expanded', 'false');
        document.getElementById(o.getAttribute('aria-controls')).classList.remove('open');
      });
      if (!open) {
        q.setAttribute('aria-expanded', 'true');
        document.getElementById(q.getAttribute('aria-controls')).classList.add('open');
      }
    });
  });

  /* Scroll reveals */
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.row').forEach(function (r, k) { r.style.setProperty('--d', (k * 0.1) + 's'); });
    document.querySelectorAll('.why-list li').forEach(function (r, k) { r.style.setProperty('--d', (k * 0.12) + 's'); });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  /* Enquiry form -> WhatsApp */
  var form = $('#form'), err = $('#err');
  form.addEventListener('input', function (e) { e.target.classList.remove('bad'); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form, req = [f.parent, f.phone, f.message], firstBad = null;
    req.forEach(function (el) {
      var empty = !el.value.trim();
      el.classList.toggle('bad', empty);
      if (empty && !firstBad) firstBad = el;
    });
    if (firstBad) { err.textContent = 'Please complete the highlighted fields.'; firstBad.focus(); return; }
    if (f.phone.value.replace(/\D/g, '').length < 9) {
      f.phone.classList.add('bad');
      err.textContent = 'Please enter a valid phone number.';
      f.phone.focus();
      return;
    }
    err.textContent = '';
    var lines = ['Hello Graceview Christian Pre-School,', '',
      'Parent/Guardian: ' + f.parent.value.trim(),
      'Phone: ' + f.phone.value.trim()];
    if (f.child.value.trim()) lines.push("Child's name: " + f.child.value.trim());
    lines.push('', 'Message: ' + f.message.value.trim());
    var num = f.querySelector('input[name="num"]:checked').value;
    window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
  });
})();
