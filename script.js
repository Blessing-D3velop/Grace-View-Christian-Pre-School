(function () {
  'use strict';

  var TOTAL_IMAGES = 20;
  var $ = function (s) { return document.querySelector(s); };

  /* Year */
  $('#year').textContent = new Date().getFullYear();

  /* Header, back-to-top */
  var header = $('#header'), topBtn = $('#top');
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    topBtn.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* Mobile menu */
  var burger = $('#burger'), menu = $('#menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });

  /* Gallery */
  var masonry = $('#masonry'), images = [];
  for (var i = 1; i <= TOTAL_IMAGES; i++) {
    var src = 'images/image' + i + '.jpeg';
    images.push(src);
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'g-item reveal';
    b.style.setProperty('--d', ((i % 3) * 0.1) + 's');
    b.setAttribute('aria-label', 'Open gallery photo ' + i + ' of ' + TOTAL_IMAGES);
    b.dataset.index = i - 1;
    b.innerHTML = '<img src="' + src + '" alt="Graceview Christian Pre-School photo ' + i + '" loading="lazy">';
    masonry.appendChild(b);
  }

  /* Lightbox */
  var lb = $('#lb'), lbImg = $('#lbImg'), current = 0, lastFocus = null;
  function show(n) {
    current = (n + images.length) % images.length;
    lbImg.src = images[current];
    lbImg.alt = 'Graceview Christian Pre-School photo ' + (current + 1) + ' of ' + images.length;
  }
  function openLb(n) {
    lastFocus = document.activeElement;
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
  masonry.addEventListener('click', function (e) {
    var item = e.target.closest('.g-item');
    if (item) openLb(+item.dataset.index);
  });
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', function () { show(current - 1); });
  $('#lbNext').addEventListener('click', function () { show(current + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
  });

  /* Scroll reveal */
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el, idx) {
      if (el.classList.contains('card')) el.style.setProperty('--d', ((idx % 4) * 0.12) + 's');
      io.observe(el);
    });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  /* Enquiry form -> WhatsApp */
  var form = $('#form'), err = $('#err');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var parent = form.parent, phone = form.phone, message = form.message, bad = [];
    [parent, phone, message].forEach(function (f) {
      var empty = !f.value.trim();
      f.classList.toggle('bad', empty);
      if (empty) bad.push(f);
    });
    var digits = phone.value.replace(/\D/g, '');
    if (phone.value.trim() && digits.length < 9) {
      phone.classList.add('bad');
      bad.push(phone);
      err.textContent = 'Please enter a valid phone number.';
      phone.focus();
      return;
    }
    if (bad.length) {
      err.textContent = 'Please fill in the highlighted fields.';
      bad[0].focus();
      return;
    }
    err.textContent = '';
    var lines = [
      'Hello Graceview Christian Pre-School,',
      '',
      'Parent/Guardian: ' + parent.value.trim(),
      'Phone: ' + phone.value.trim()
    ];
    if (form.child.value.trim()) lines.push("Child's name: " + form.child.value.trim());
    lines.push('', 'Message: ' + message.value.trim());
    var num = form.querySelector('input[name="num"]:checked').value;
    var url = 'https://wa.me/' + num + '?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener');
  });
  form.addEventListener('input', function (e) {
    if (e.target.classList) e.target.classList.remove('bad');
  });
})();
