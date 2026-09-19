/** Shared, lightweight SEO enhancements. */
(function () {
  'use strict';

  function textContent(node) {
    return node ? node.textContent.replace(/\s+/g, ' ').trim() : '';
  }

  function installConversionFallback() {
    window.gtag_report_conversion = function (url) {
      var navigated = false;
      var navigate = function () {
        if (navigated || !url) return;
        navigated = true;
        window.location.assign(url);
      };
      var fallback = window.setTimeout(navigate, 1200);
      var callback = function () {
        window.clearTimeout(fallback);
        navigate();
      };

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: 'AW-18038676063/PfQNCJzXwqMcEN-0wZlD',
          value: 1.0,
          currency: 'BRL',
          event_callback: callback,
          event_timeout: 1000
        });
      } else {
        callback();
      }
      return false;
    };
  }

  function initFaqAccessibility() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.faq__item'));
    items.forEach(function (item, index) {
      var button = item.querySelector('.faq__question');
      var answer = item.querySelector('.faq__answer');
      if (!button || !answer) return;

      var buttonId = button.id || 'faq-question-' + (index + 1);
      var answerId = answer.id || 'faq-answer-' + (index + 1);
      button.id = buttonId;
      answer.id = answerId;
      button.setAttribute('aria-controls', answerId);
      answer.setAttribute('role', 'region');
      answer.setAttribute('aria-labelledby', buttonId);

      var syncState = function () {
        var isOpen = item.classList.contains('is-open');
        answer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        if (isOpen) {
          answer.removeAttribute('inert');
        } else {
          answer.setAttribute('inert', '');
        }
      };
      syncState();
      new MutationObserver(syncState).observe(item, { attributes: true, attributeFilter: ['class'] });
    });
  }


  function initRevealAnimations() {
    var elements = Array.prototype.slice.call(document.querySelectorAll('[data-aos]'));
    if (!elements.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach(function (element) { element.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.05 });

    elements.forEach(function (element) {
      var delay = parseInt(element.getAttribute('data-aos-delay') || '0', 10);
      element.classList.add('seo-reveal');
      if (delay > 0) element.style.transitionDelay = Math.min(delay, 500) + 'ms';
      observer.observe(element);
    });
  }


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initRevealAnimations();
      initFaqAccessibility();
    });
  } else {
    initRevealAnimations();
    initFaqAccessibility();
  }

  installConversionFallback();
}());
