// circle countto feature
document.addEventListener("DOMContentLoaded", function (event) {
  const circles = document.querySelectorAll(".countto-circle");

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
          entry.target.querySelector(".countto-circle__num").innerHTML = "0"; // Reset number on exit if desired
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
  const buttons = document.querySelectorAll(".button-secondary");

  buttons.forEach((button) => {
    const content = button.querySelector(".button-secondary__content");
    if (!content) return;

    const settings = {
      outerStart: -34,
      // outerStart: 7.4,
      outerEnd: 91,
      innerStart: -34,
      // innerStart: 1.2,
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
          ? settings.outerStart +
            (settings.outerEnd - settings.outerStart) * eased
          : settings.outerEnd -
            (settings.outerEnd - settings.outerStart) * eased;

        const inner = forward
          ? settings.innerStart +
            (settings.innerEnd - settings.innerStart) * eased
          : settings.innerEnd -
            (settings.innerEnd - settings.innerStart) * eased;

        button.style.setProperty("--x", `${outer}%`);
        content.style.setProperty("--x2", `${inner}%`);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      }

      animationFrame = requestAnimationFrame(step);
    }

    button.addEventListener("mouseenter", () => animateGradient(true));
    button.addEventListener("mouseleave", () => animateGradient(false));
  });
})();

// hover button white box shadow
(function () {
  const buttons = document.querySelectorAll(".button-white");

  buttons.forEach((button) => {
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

        button.style.setProperty("--shadowX", value.toFixed(3));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      }

      animationFrame = requestAnimationFrame(step);
    }

    button.addEventListener("mouseenter", () => animate(true));
    button.addEventListener("mouseleave", () => animate(false));
  });
})();

// testimonial countto 5000 -> 10000
function animateCounterOnScroll({
  selector = "#counter",
  start = 5000,
  end = 10000,
  step = 20,
  duration = 2000,
}) {
  const el = document.querySelector(selector);
  if (!el) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animate();
        observer.disconnect(); // chỉ chạy một lần
      }
    },
    { threshold: 0.6 }
  );

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
document.addEventListener("DOMContentLoaded", () => {
  const marqueeTracks = document.querySelectorAll(".marquee-track");

  marqueeTracks.forEach((track) => {
    // Kiểm tra nếu chưa được nhân đôi
    if (track.dataset.cloned !== "true") {
      track.innerHTML += track.innerHTML;
      track.dataset.cloned = "true"; // tránh nhân đôi lần nữa nếu DOM thay đổi
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

  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      const selected = this.textContent.trim();
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      let delayIndex = 0;

      items.forEach((item) => {
        const category = item.getAttribute("data-category") || "";
        const status = item.getAttribute("data-status") || "";

        const show =
          selected === "All Demos" ||
          selected === category ||
          (selected === "New Demos" && status.toLowerCase() === "new") ||
          (selected === "Popular" && status.toLowerCase() === "popular");

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
  const defaultTab = wrapper.querySelector(".homepage-tabs__item");
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

// header
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".header-nav .nav-item");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active")); // Xoá class active khỏi tất cả
      this.classList.add("active"); // Thêm class active vào link được click
    });
  });
});

// modal lấy link tương ứng

document.addEventListener("DOMContentLoaded", function () {
  // Lắng nghe tất cả các click vào .homepage-demo__image-box hoặc .homepage-demo__title
  document
    .querySelectorAll(".homepage-demo__image-box, .homepage-demo__title")
    .forEach(function (el) {
      el.addEventListener("click", function (e) {
        // Tìm .homepage-demo cha gần nhất
        const demo = el.closest(".homepage-demo");
        if (!demo) return;

        // Lấy link từ data-link
        const link = demo.getAttribute("data-link");

        // Gán link vào thẻ <a> trong modal
        const modalLink = document.querySelector(
          "#viewnowModal a.button-secondary"
        );
        if (modalLink && link) {
          modalLink.setAttribute("href", link);
        }
      });
    });
});

// light blur banner

document.addEventListener("DOMContentLoaded", () => {
  const rays = document.querySelectorAll(".blur-container__ray");
  const baseRotations = [5, 14, 9, -11, -18, 18, 18, 7, -15, -18, -18, -5]; // Smaller angles

  function animate() {
    rays.forEach((ray, index) => {
      const time = Date.now() * 0.001 + index * 0.2; // Staggered timing
      const baseOpacity =
        index === 0 || index === 11 ? 0.4 : index < 3 || index > 8 ? 0.5 : 0.4; // Central denser, outer fainter
      const scale = 0.6 + (0.4 * (Math.sin(time) + 1)) / 2; // 0.6 to 1
      const opacity = (baseOpacity * (Math.sin(time * 2 + index) + 1)) / 2; // 0 to baseOpacity
      const rotate = baseRotations[index] || 0; // ray1 at 0deg
      ray.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
      ray.style.opacity = opacity; // Allows opacity to reach 0
    });

    requestAnimationFrame(animate);
  }

  animate();
});

// carousel

document.addEventListener("DOMContentLoaded", () => {
  const slidesPerView =
    window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
  const track = document.getElementById("carousel-track");
  const pagination = document.querySelector(".layout-theme__pagination");
  const originalSlides = Array.from(track.children);
  const totalSlides = originalSlides.length;
  let currentIndex = slidesPerView;

  // Clone slide
  const clonesBefore = originalSlides
    .slice(-slidesPerView)
    .map((s) => s.cloneNode(true));
  const clonesAfter = originalSlides
    .slice(0, slidesPerView)
    .map((s) => s.cloneNode(true));
  clonesBefore.forEach((c) => track.insertBefore(c, track.firstChild));
  clonesAfter.forEach((c) => track.appendChild(c));
  const allSlides = Array.from(track.children);

  function slideWidth() {
    return allSlides[0].getBoundingClientRect().width;
  }

  function setTransform(index, animate = true) {
    track.style.transition = animate ? "transform 0.4s ease" : "none";
    track.style.transform = `translate3d(-${slideWidth() * index}px, 0, 0)`;
  }

  function updatePagination() {
    const dots = pagination.querySelectorAll("span");
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[
      (currentIndex - slidesPerView + totalSlides) % totalSlides
    ].classList.add("active");
  }

  function nextSlide() {
    currentIndex++;
    setTransform(currentIndex);
    updatePagination();
    if (currentIndex === totalSlides + slidesPerView) {
      setTimeout(() => {
        currentIndex = slidesPerView;
        setTransform(currentIndex, false);
        updatePagination();
      }, 400);
    }
  }

  function prevSlide() {
    currentIndex--;
    setTransform(currentIndex);
    updatePagination();
    if (currentIndex === 0) {
      setTimeout(() => {
        currentIndex = totalSlides;
        setTransform(currentIndex, false);
        updatePagination();
      }, 400);
    }
  }

  document
    .querySelector(".layout-theme__button--next")
    .addEventListener("click", nextSlide);
  document
    .querySelector(".layout-theme__button--prev")
    .addEventListener("click", prevSlide);

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    pagination.appendChild(dot);
  }

  pagination.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      const index = [...pagination.children].indexOf(e.target);
      currentIndex = index + slidesPerView;
      setTransform(currentIndex);
      updatePagination();
    }
  });

  // auto play
  let auto = setInterval(nextSlide, 4000);
  const container = document.querySelector(".layout-theme");
  container.addEventListener("mouseenter", () => clearInterval(auto));
  container.addEventListener(
    "mouseleave",
    () => (auto = setInterval(nextSlide, 4000))
  );

  // Swipe
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let deltaX = 0;

  function onStart(e) {
    isDragging = true;
    startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    track.style.transition = "none";
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd);
  }

  function onMove(e) {
    if (!isDragging) return;
    currentX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    deltaX = currentX - startX;
    track.style.transform = `translate3d(${
      -slideWidth() * currentIndex + deltaX
    }px, 0, 0)`;
    if (e.cancelable) e.preventDefault();
  }

  function onEnd() {
    if (!isDragging) return;
    isDragging = false;
    const threshold = slideWidth() / 4;
    track.style.transition = "transform 0.4s ease";
    if (deltaX < -threshold) {
      nextSlide();
    } else if (deltaX > threshold) {
      prevSlide();
    } else {
      setTransform(currentIndex);
    }
    deltaX = 0;
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onEnd);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("touchend", onEnd);
  }

  track.addEventListener("mousedown", onStart);
  track.addEventListener("touchstart", onStart, { passive: true });

  setTransform(currentIndex, false);
  updatePagination();
});

// back to top
document.addEventListener("DOMContentLoaded", function () {
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});



// không inspect vào ảnh trực tiếp được
document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('img, video');

  elements.forEach(function (el) {
    el.addEventListener('contextmenu', function (e) {
      e.preventDefault(); // chặn chuột phải
    });

    el.addEventListener('dragstart', function (e) {
      e.preventDefault(); // chặn kéo ảnh
    });
  });
});

// menu bottom

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector('.menu-bottom');
    if (!menu) return;

    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      const isScrollingDown = currentScroll > lastScrollY;
      const isNearBottom = currentScroll + windowHeight >= fullHeight - 100;

      if (isNearBottom) {
        menu.classList.remove('hidden');
      } else if (isScrollingDown) {
        menu.classList.add('hidden');
      } else {
        menu.classList.remove('hidden');
      }

      lastScrollY = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
  });
})();
