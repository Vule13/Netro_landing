// circle countto feature
document.addEventListener("DOMContentLoaded", function(event) {
  const circles = document.querySelectorAll('.countto-circle');

  // Function to start the animation
  const startCounter = (progress) => {
    let degree = 0;
    const targetDegree = parseInt(progress.getAttribute("data-degree"));
    const color = progress.getAttribute("data-color");
    const number = progress.querySelector(".countto-circle__num");

    // Clear previous interval if any
    clearInterval(progress.interval);
    progress.interval = setInterval(() => {
      degree += 1;
      if (degree > targetDegree) {
        clearInterval(progress.interval);
        return;
      }
      progress.style.background = `conic-gradient(${color} ${degree}%, #2c2c2c 0%)`;
      number.innerHTML = degree;
    }, 50);
  };

  // Intersection Observer setup
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter(entry.target); // Start the animation when visible
        } else {
          entry.target.querySelector(".countto-circle__num").innerHTML = '0'; // Reset number on exit if desired
        }
      });
    },
    { threshold: 0.5 } // Adjust threshold as needed
  );

  // Observe each circle element
  circles.forEach((circle) => observer.observe(circle));
});

// hover button blue
(function () {
  const buttons = document.querySelectorAll('.button-secondary');

  buttons.forEach(button => {
    const content = button.querySelector('.button-secondary__content');
    if (!content) return;

    const settings = {
      outerStart: 7.4,
      outerEnd: 91,
      innerStart: 1.2,
      innerEnd: 98,
      duration: 1000,
    };

    let animationFrame;
    let startTime;

    function animateGradient(forward = true) {
      cancelAnimationFrame(animationFrame);
      startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / settings.duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        const outer = forward
          ? settings.outerStart + (settings.outerEnd - settings.outerStart) * eased
          : settings.outerEnd - (settings.outerEnd - settings.outerStart) * eased;

        const inner = forward
          ? settings.innerStart + (settings.innerEnd - settings.innerStart) * eased
          : settings.innerEnd - (settings.innerEnd - settings.innerStart) * eased;

        button.style.setProperty('--x', `${outer}%`);
        content.style.setProperty('--x2', `${inner}%`);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      }

      animationFrame = requestAnimationFrame(step);
    }

    button.addEventListener('mouseenter', () => animateGradient(true));
    button.addEventListener('mouseleave', () => animateGradient(false));
  });
})();

// hover button white box shadow
(function () {
  const buttons = document.querySelectorAll('.button-white');

  buttons.forEach(button => {
    let animationFrame;
    let startTime;

    const settings = {
      from: -1,
      to: 1,
      duration: 800,
    };

    function animate(forward = true) {
      cancelAnimationFrame(animationFrame);
      startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / settings.duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        const value = forward
          ? settings.from + (settings.to - settings.from) * eased
          : settings.to - (settings.to - settings.from) * eased;

        button.style.setProperty('--shadowX', value.toFixed(3));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      }

      animationFrame = requestAnimationFrame(step);
    }

    button.addEventListener('mouseenter', () => animate(true));
    button.addEventListener('mouseleave', () => animate(false));
  });
})();

// testimonial countto 5000 -> 10000
function animateCounterOnScroll({ selector = "#counter", start = 5000, end = 10000, step = 20, duration = 2000 }) {
  const el = document.querySelector(selector);
  if (!el) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !hasAnimated) {
      hasAnimated = true;
      animate();
      observer.disconnect(); // chỉ chạy một lần
    }
  }, { threshold: 0.6 });

  observer.observe(el);

  function animate() {
    const totalSteps = Math.ceil((end - start) / step);
    const interval = duration / totalSteps;
    let current = start;

    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      el.textContent = current.toLocaleString() + "+";
    }, interval);
  }
}
animateCounterOnScroll({});

// marquee
document.addEventListener('DOMContentLoaded', () => {
  const marqueeTracks = document.querySelectorAll('.marquee-track');

  marqueeTracks.forEach(track => {
    // Kiểm tra nếu chưa được nhân đôi
    if (track.dataset.cloned !== 'true') {
      track.innerHTML += track.innerHTML;
      track.dataset.cloned = 'true'; // tránh nhân đôi lần nữa nếu DOM thay đổi
    }
  });
});

// animation section scroll

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active"); // cho phép reset khi scroll lên
        }
      });
    },
    {
      threshold: 0.1, // 10% vào view thì kích hoạt
    }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});


// tab
document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".homepage-demo-wrapper");
  const tabs = wrapper.querySelectorAll(".homepage-tabs__item");
  const items = wrapper.querySelectorAll(".homepage-item");

  tabs.forEach(tab => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      const selected = this.textContent.trim();
      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");

      let delayIndex = 0;

      items.forEach(item => {
        const category = item.getAttribute("data-category") || "";
        const status = item.getAttribute("data-status") || "";

        const show =
          selected === "All" ||
          selected === category ||
          (selected === "New" && status.toLowerCase() === "new") ||
          (selected === "Hot" && status.toLowerCase() === "hot");

        if (show) {
          item.classList.add("show");
          item.style.animationDelay = `${delayIndex * 0.1}s`;
          item.classList.remove("fadeup");

          // Bắt buộc phải reflow lại để trigger animation
          requestAnimationFrame(() => {
            item.classList.add("fadeup");
          });

          delayIndex++;
        } else {
          item.classList.remove("fadeup");
          item.classList.remove("show");
          item.style.animationDelay = "0s";
        }
      });
    });
  });
   //  Active tab "All" when page loads
   const defaultTab = wrapper.querySelector('.homepage-tabs__item');
   if (defaultTab) defaultTab.click();
});


// view more
document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".feature-saveup__show-more button");
  const tableTop = document.querySelector(".feature-saveup__table-top");
  const tableBottom = document.querySelector(".feature-saveup__table-bottom");

  if (button && tableTop && tableBottom) {
    button.addEventListener("click", function () {
      tableTop.style.height = "100%";
      tableBottom.classList.add("view-more-hidden");
    });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".header-nav .nav-item");

  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      navLinks.forEach(l => l.classList.remove("active")); // Xoá class active khỏi tất cả
      this.classList.add("active"); // Thêm class active vào link được click
    });
  });
});
