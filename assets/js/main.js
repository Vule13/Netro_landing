
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
