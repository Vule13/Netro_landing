// animation text
document.addEventListener('DOMContentLoaded', () => {
  const WORD_DELAY = 120; // ms giữa các từ
  const SELECTOR = '.reveal-word';

  const SKIP_TAGS = new Set([
    'STRONG','B','CODE','EM','A','BR','IMG','BUTTON','INPUT','TEXTAREA','SVG'
  ]);

  function wrapTextNodes(root) {
    const nodes = Array.from(root.childNodes);
    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text) return;
        const tokens = text.split(/(\s+)/);
        const frag = document.createDocumentFragment();

        tokens.forEach(token => {
          if (/\s+/.test(token)) {
            frag.appendChild(document.createTextNode(token));
          } else if (token.length > 0) {
            const span = document.createElement('span');
            span.className = 'reveal-word__item';
            span.textContent = token;
            frag.appendChild(span);
          }
        });

        node.replaceWith(frag);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (SKIP_TAGS.has(node.tagName) || node.classList.contains('reveal-skip') || node.hasAttribute('data-reveal-skip')) {
          return;
        }
        if (node.classList && node.classList.contains('reveal-word__item')) return;

        wrapTextNodes(node); 
      }
    });
  }

  function clearRevealTimeouts(el) {
    if (!el._revealTimeouts) return;
    el._revealTimeouts.forEach(id => clearTimeout(id));
    el._revealTimeouts.length = 0;
  }

  function resetSpansInstant(el) {
    const spans = el.querySelectorAll('span.reveal-word__item');
    spans.forEach(s => {
      s._prevTransition = s.style.transition;
      s.style.transition = 'none';
      s.classList.remove('visible');
    });

    void el.offsetWidth;
    spans.forEach(s => {
      s.style.transition = s._prevTransition || '';
      delete s._prevTransition;
    });
  }

  document.querySelectorAll(SELECTOR).forEach(el => {
    if (!el.dataset.revealInitialized) {
      wrapTextNodes(el);
      el._revealTimeouts = [];
      el.dataset.revealInitialized = '1';
    }
  });


  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;
      const spans = Array.from(el.querySelectorAll('span.reveal-word__item'));
      if (entry.isIntersecting) {
        clearRevealTimeouts(el);
        resetSpansInstant(el);

        spans.forEach((span, i) => {
          const id = setTimeout(() => {
            span.classList.add('visible');
            const idx = el._revealTimeouts.indexOf(id);
            if (idx > -1) el._revealTimeouts.splice(idx, 1);
          }, i * WORD_DELAY);
          el._revealTimeouts.push(id);
        });
      } else {
        clearRevealTimeouts(el);
        resetSpansInstant(el);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(SELECTOR).forEach(el => observer.observe(el));
});


// animation section scroll
document.addEventListener("DOMContentLoaded", function () {
  const ENTER_RATIO = 0.25; 
  const EXIT_RATIO = 0.03;
  const REMOVE_DELAY = 80; 

  const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      const ratio = entry.intersectionRatio;

      if (el._revealTimeout) {
        clearTimeout(el._revealTimeout);
        el._revealTimeout = null;
      }

      if (ratio >= ENTER_RATIO) {
        el.classList.add("active");
        return;
      }

      if (ratio <= EXIT_RATIO) {
        el._revealTimeout = setTimeout(() => {
          el.classList.remove("active");
          el._revealTimeout = null;
        }, REMOVE_DELAY);
      }
    });
  }, {
    threshold: thresholds
  });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});

// animation page
let smoothScrollActive = false;
let rafId = null;
let observerResize = null;
let observerMutation = null;

function initSmoothScroll(options = {}) {
  const container = document.querySelector(options.container || ".scroll-container");
  if (!container) return;

  let currentScroll = 0;
  let delayedScroll = 0;
  let targetScroll = 0;

  const delayEase = options.delayEase ?? 0.12;
  const inertiaEase = options.inertiaEase ?? 0.1;

  function setBodyHeight() {
    const rect = container.getBoundingClientRect();
    const height = rect.height; 
    document.body.style.height = `${Math.ceil(height)}px`;
  }

  observerResize = new ResizeObserver(setBodyHeight);
  observerResize.observe(container);

  observerMutation = new MutationObserver(setBodyHeight);
  observerMutation.observe(container, { childList: true, subtree: true, attributes: true });

  window.addEventListener("load", setBodyHeight);

  function smoothScroll() {
    targetScroll = window.scrollY;
    delayedScroll += (targetScroll - delayedScroll) * delayEase;
    currentScroll += (delayedScroll - currentScroll) * inertiaEase;

    container.style.transform = `translate3d(0, -${currentScroll}px, 0)`;

    setBodyHeight();

    rafId = requestAnimationFrame(smoothScroll);
  }

  setBodyHeight();
  smoothScroll();
}

function startSmoothScroll() {
  if (!smoothScrollActive) {
    initSmoothScroll({
      delayEase: 1,
      inertiaEase: 0.1
    });
    smoothScrollActive = true;
  }
}

function stopSmoothScroll() {
  if (smoothScrollActive) {
    cancelAnimationFrame(rafId);
    const container = document.querySelector(".scroll-container");
    if (container) container.style.transform = "translate3d(0,0,0)";
    if (observerResize) observerResize.disconnect();
    if (observerMutation) observerMutation.disconnect();
    document.body.style.height = "auto";
    smoothScrollActive = false;
  }
}

function handleSmoothScrollToggle() {
  if (window.innerWidth >= 768) {
    startSmoothScroll();
  } else {
    stopSmoothScroll();
  }
}

window.addEventListener('resize', handleSmoothScrollToggle);
window.addEventListener('load', handleSmoothScrollToggle);

const HEADER_OFFSET = 0;
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]:not([href="#"])');
  if (!link) return;
  const id = decodeURIComponent(link.getAttribute('href').slice(1));
  if (!id) return;

  if (smoothScrollActive) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const y = window.scrollY + target.getBoundingClientRect().top - HEADER_OFFSET;
      window.scrollTo(0, y);
      history.pushState(null, '', '#' + id);
    }
  }
});
