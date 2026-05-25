/**
 * Dentista em Teresina — Clínica Valdemir Neto
 */

document.addEventListener('DOMContentLoaded', function() {
  initAOS();
  initYear();
  initFAQ();
  initWhatsAppFab();
  initCounterAnimation();
});

/* ==========================================
   AOS
   ========================================== */

function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic',
      disableMutationObserver: true
    });
  }
}

/* ==========================================
   YEAR
   ========================================== */

function initYear() {
  var el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ==========================================
   FAQ ACCORDION
   ========================================== */

function initFAQ() {
  var items = document.querySelectorAll('.faq__item');
  items.forEach(function(item) {
    var btn = item.querySelector('.faq__question');
    if (!btn) return;
    btn.addEventListener('click', function() {
      var isOpen = item.classList.contains('is-open');
      items.forEach(function(other) {
        other.classList.remove('is-open');
        var otherBtn = other.querySelector('.faq__question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================
   WHATSAPP FAB — Show/Hide based on hero CTA
   ========================================== */

function initWhatsAppFab() {
  var fab = document.getElementById('whatsappFab');
  var heroCta = document.getElementById('heroCta');
  if (!fab || !heroCta) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        fab.classList.add('is-hidden');
      } else {
        fab.classList.remove('is-hidden');
      }
    });
  }, { threshold: 0 });

  observer.observe(heroCta);
}

/* ==========================================
   COUNTER ANIMATION — Stats count up
   ========================================== */

function initCounterAnimation() {
  var stats = document.querySelectorAll('.porque__stat[data-count]');
  if (!stats.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(function(stat) {
    observer.observe(stat);
  });
}

function animateCounter(el) {
  var target = parseInt(el.getAttribute('data-count'), 10);
  var duration = 800;
  var start = performance.now();

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function tick(now) {
    var elapsed = now - start;
    var progress = Math.min(elapsed / duration, 1);
    var eased = easeOutQuad(progress);
    el.textContent = Math.round(eased * target);
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}
