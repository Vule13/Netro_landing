
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
