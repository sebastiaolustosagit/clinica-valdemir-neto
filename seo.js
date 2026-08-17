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

  function addFaqSchema() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.faq__item'));
    if (!items.length) return;

    var entities = items.map(function (item) {
      var question = textContent(item.querySelector('.faq__question span:first-child'));
      var answer = textContent(item.querySelector('.faq__answer'));
      if (!question || !answer) return null;
      return {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer
        }
      };
    }).filter(Boolean);

    if (!entities.length) return;
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: entities
    });
    document.head.appendChild(script);
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

  function addServiceSchema() {
    var serviceName = document.body.getAttribute('data-service-name');
    if (!serviceName) return;

    var canonical = document.querySelector('link[rel="canonical"]');
    var description = document.querySelector('meta[name="description"]');
    var url = canonical ? canonical.href : window.location.href.split('#')[0];
    var pageName = document.title;
    var serviceDescription = description ? description.content : '';

    var graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Dentist',
          '@id': 'https://valdemirneto.online/#clinica',
          name: 'Clínica Valdemir Neto',
          legalName: 'M & V Odontologia LTDA',
          url: 'https://valdemirneto.online/',
          logo: 'https://valdemirneto.online/images/logo.png',
          image: 'https://valdemirneto.online/images/valdemir.jpg',
          telephone: '+55 86 99426-3194',
          email: 'valdemir_neto@outlook.com',
          taxID: '65.119.871/0001-74',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Av. Lindolfo Monteiro, 813',
            addressLocality: 'Teresina',
            addressRegion: 'PI',
            postalCode: '64049-490',
            addressCountry: 'BR'
          },
          areaServed: { '@type': 'City', name: 'Teresina' },
          employee: { '@id': 'https://valdemirneto.online/#dr-valdemir' }
        },
        {
          '@type': 'Person',
          '@id': 'https://valdemirneto.online/#dr-valdemir',
          name: 'Dr. Valdemir Pereira Neto',
          jobTitle: 'Cirurgião-Dentista Implantodontista',
          identifier: 'CRO 3085/PI',
          worksFor: { '@id': 'https://valdemirneto.online/#clinica' },
          image: 'https://valdemirneto.online/images/valdemir.jpg'
        },
        {
          '@type': 'Service',
          '@id': url + '#service',
          name: serviceName,
          description: serviceDescription,
          url: url,
          provider: { '@id': 'https://valdemirneto.online/#clinica' },
          areaServed: { '@type': 'City', name: 'Teresina' }
        },
        {
          '@type': 'WebPage',
          '@id': url + '#webpage',
          url: url,
          name: pageName,
          description: serviceDescription,
          inLanguage: 'pt-BR',
          about: { '@id': url + '#service' },
          author: { '@id': 'https://valdemirneto.online/#dr-valdemir' },
          reviewedBy: { '@id': 'https://valdemirneto.online/#dr-valdemir' },
          breadcrumb: { '@id': url + '#breadcrumb' }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': url + '#breadcrumb',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Clínica Valdemir Neto',
              item: 'https://valdemirneto.online/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: serviceName,
              item: url
            }
          ]
        }
      ]
    };

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(graph);
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initRevealAnimations();
      initFaqAccessibility();
      addServiceSchema();
      addFaqSchema();
    });
  } else {
    initRevealAnimations();
    initFaqAccessibility();
    addServiceSchema();
    addFaqSchema();
  }

  installConversionFallback();
}());
