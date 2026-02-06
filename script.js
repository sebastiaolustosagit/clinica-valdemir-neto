/**
 * Clínica Valdemir Neto — Landing Page
 */

document.addEventListener('DOMContentLoaded', function() {
  initAOS();
  initYear();
  initFAQ();
  initWhatsAppFab();
  initStepsObserver();
  initCounterAnimation();
  initCarouselObserver();
  initMouseParallax();
  initFloatBaseY();
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
      // Close all others
      items.forEach(function(other) {
        other.classList.remove('is-open');
        var otherBtn = other.querySelector('.faq__question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });
      // Toggle current
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
   STEPS — Line draw on scroll
   ========================================== */

function initStepsObserver() {
  var section = document.getElementById('stepsSection');
  if (!section) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        section.classList.add('is-visible');
        observer.unobserve(section);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(section);
}

/* ==========================================
   COUNTER ANIMATION — Numbers count up
   ========================================== */

function initCounterAnimation() {
  var numbers = document.querySelectorAll('.steps__number[data-count]');
  if (!numbers.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  numbers.forEach(function(num) {
    observer.observe(num);
  });
}

function animateCounter(el) {
  var target = parseInt(el.getAttribute('data-count'), 10);
  var duration = 600;
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

/* ==========================================
   CAROUSEL — Pause when off-screen
   ========================================== */

function initCarouselObserver() {
  var section = document.getElementById('depoimentosSection');
  if (!section) return;
  var track = section.querySelector('.depoimentos__track');
  if (!track) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        track.classList.remove('is-paused');
      } else {
        track.classList.add('is-paused');
      }
    });
  }, { threshold: 0 });

  observer.observe(section);
}

/* ==========================================
   MOUSE PARALLAX — Por que nós section (desktop only)
   ========================================== */

function initMouseParallax() {
  if (window.innerWidth < 1024) return;

  var grid = document.getElementById('porqueGrid');
  if (!grid) return;

  var cards = grid.querySelectorAll('.porque__card');
  var ticking = false;

  grid.addEventListener('mousemove', function(e) {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function() {
      var rect = grid.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;

      cards.forEach(function(card) {
        var factor = parseInt(card.getAttribute('data-parallax'), 10) || 6;
        var moveX = x * factor * -1;
        var moveY = y * factor * -1;
        card.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
      });

      ticking = false;
    });
  });

  grid.addEventListener('mouseleave', function() {
    cards.forEach(function(card) {
      card.style.transform = '';
    });
  });
}

/* ==========================================
   FLOAT BASE Y — Set CSS variable for float animation offsets
   ========================================== */

function initFloatBaseY() {
  if (window.innerWidth < 768) return;

  var offsets = { '--1': '0px', '--2': '20px', '--3': '-10px', '--4': '30px' };
  Object.keys(offsets).forEach(function(key) {
    var card = document.querySelector('.porque__card' + key);
    if (card) {
      card.style.setProperty('--base-y', offsets[key]);
    }
  });
}
