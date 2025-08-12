// animation text

document.addEventListener('DOMContentLoaded', () => {
  const WORD_DELAY = 120; // ms giữa các từ
  const SELECTOR = '.reveal-word';

  // Tags mà ta KHÔNG muốn phá/animate bên trong chúng
  const SKIP_TAGS = new Set([
    'STRONG','B','CODE','EM','A','BR','IMG','BUTTON','INPUT','TEXTAREA','SVG'
  ]);

  // wrap text nodes into spans, but skip inside SKIP_TAGS or elements with class "reveal-skip"
  function wrapTextNodes(root) {
    const nodes = Array.from(root.childNodes);
    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text) return;
        // giữ khoảng trắng bằng cách split giữ token khoảng trắng
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
        // nếu element được đánh dấu muốn skip (hoặc tag nằm trong SKIP_TAGS), không đệ quy vào
        if (SKIP_TAGS.has(node.tagName) || node.classList.contains('reveal-skip') || node.hasAttribute('data-reveal-skip')) {
          return;
        }
        // tránh double-wrapping nếu element là item chúng ta đã tạo
        if (node.classList && node.classList.contains('reveal-word__item')) return;

        wrapTextNodes(node); // đệ quy
      }
    });
  }

  // timeout helpers per element
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
    // force reflow
    void el.offsetWidth;
    spans.forEach(s => {
      s.style.transition = s._prevTransition || '';
      delete s._prevTransition;
    });
  }

  // Initialize: wrap text nodes once per element
  document.querySelectorAll(SELECTOR).forEach(el => {
    if (!el.dataset.revealInitialized) {
      wrapTextNodes(el);
      el._revealTimeouts = [];
      el.dataset.revealInitialized = '1';
    }
  });

  // observer trên block để giữ left→right stagger, nhưng SKIP_TAGS không bị bọc nên không animate
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
            // cleanup id
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
  const ENTER_RATIO = 0.25; // >= 25% vào viewport thì coi là vào
  const EXIT_RATIO = 0.03;  // <= 3% thì coi là ra hẳn
  const REMOVE_DELAY = 80;  // ms: delay nhỏ trước khi remove

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



function initSmoothScroll(options = {}) {
  const container = document.querySelector(options.container || ".scroll-container");
  if (!container) return;

  let currentScroll = 0;
  let delayedScroll = 0;
  let targetScroll = 0;

  const delayEase = options.delayEase ?? 0.12;   // độ bắt kịp
  const inertiaEase = options.inertiaEase ?? 0.1; // độ trượt

  // Cập nhật chiều cao ảo của body
  function setBodyHeight() {
    const height = container.scrollHeight;
    document.body.style.height = height + "px";
  }

  // Quan sát nội dung thay đổi để cập nhật height
  const observer = new ResizeObserver(setBodyHeight);
  observer.observe(container);

  // Chạy loop render
  function smoothScroll() {
    targetScroll = window.scrollY;
    delayedScroll += (targetScroll - delayedScroll) * delayEase;
    currentScroll += (delayedScroll - currentScroll) * inertiaEase;

    container.style.transform = `translate3d(0, -${currentScroll}px, 0)`;
    requestAnimationFrame(smoothScroll);
  }

  setBodyHeight();
  smoothScroll();
}
