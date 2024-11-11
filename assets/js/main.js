// // Select all elements with the "countto" class
// const counttoElements = document.querySelectorAll(".countto");

// counttoElements.forEach((countto) => {
//   const targetCounter = parseInt(getComputedStyle(countto).getPropertyValue("--counter").trim());

//   const startCounter = () => {
//     let currentCount = 0;
//     const numb = countto.querySelector(".countto-numb");

//     // Select progress and dot elements
//     const leftProgress = countto.querySelector(".countto_bar--left .countto__progress");
//     const rightProgress1 = countto.querySelector(".countto_bar--right .progress1");
//     const rightProgress2 = countto.querySelector(".countto_bar--right .progress2");
//     const rightProgress3 = countto.querySelector(".countto_bar--right .progress3");
//     const dot1 = countto.querySelector(".dot1");
//     const dot2 = countto.querySelector(".dot2");
//     const dot3 = countto.querySelector(".dot3");

//     // Check if elements exist before applying animation
//     const elementsToAnimate = [leftProgress, rightProgress1, rightProgress2, rightProgress3, dot1, dot2, dot3];
//     elementsToAnimate.forEach(el => {
//       if (el) { // Ensure the element exists
//         el.style.animation = "none"; // Reset animation
//         void el.offsetWidth; // Trigger reflow to reset the animation
//       }
//     });

//     // Apply animations if elements exist
//     if (leftProgress) leftProgress.style.animation = "left 2s linear both";
//     if (rightProgress1) {
//       rightProgress1.style.animation = "right1 2s linear both";
//       rightProgress1.style.animationDelay = "2s"; // Delay for rightProgress1
//     }
//     if (rightProgress2) {
//       rightProgress2.style.animation = "right2 2s linear both";
//       rightProgress2.style.animationDelay = "2s"; // Delay for rightProgress2
//     }
//     if (rightProgress3) {
//       rightProgress3.style.animation = "right3 2s linear both";
//       rightProgress3.style.animationDelay = "2s"; // Delay for rightProgress3
//     }
//     if (dot1) dot1.style.animation = "dot1 4s linear both";
//     if (dot2) dot2.style.animation = "dot2 4s linear both";
//     if (dot3) dot3.style.animation = "dot3 4s linear both";

//     // Start counter animation from 0
//     clearInterval(countto.interval);
//     countto.interval = setInterval(() => {
//       if (currentCount >= targetCounter) {
//         clearInterval(countto.interval);
//       } else {
//         currentCount += 1;
//         numb.textContent = currentCount + "%";
//       }
//     }, 40);
//   };

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         const numb = countto.querySelector(".countto-numb");

//         if (entry.isIntersecting) {
//           // Reset counter display and start the animation
//           numb.textContent = "0%";
//           startCounter();
//         } else {
//           // Reset the counter display to 0% when scrolling out of view
//           numb.textContent = "0%";
//           clearInterval(countto.interval);

//           // Reset animations to restart when re-entering the view
//           const leftProgress = countto.querySelector(".countto_bar--left .countto__progress");
//           const rightProgress1 = countto.querySelector(".countto_bar--right .progress1");
//           const rightProgress2 = countto.querySelector(".countto_bar--right .progress2");
//           const rightProgress3 = countto.querySelector(".countto_bar--right .progress3");
//           const dot1 = countto.querySelector(".dot1");
//           const dot2 = countto.querySelector(".dot2");
//           const dot3 = countto.querySelector(".dot3");

//           const elementsToAnimate = [leftProgress, rightProgress1, rightProgress2, rightProgress3, dot1, dot2, dot3];
//           elementsToAnimate.forEach(el => {
//             if (el) { // Ensure the element exists
//               el.style.animation = "none";
//               void el.offsetWidth; // Trigger reflow to reset the animation
//             }
//           });
//         }
//       });
//     },
//     { threshold: 0.5 } // Adjust threshold as needed
//   );

//   // Start observing the countto element
//   observer.observe(countto);
// });


// document.addEventListener("DOMContentLoaded", function(event){
//   let circle = document.querySelectorAll('.counto-circle');
//   circle.forEach(function(progress){
//     let degree = 0;
//     var targetDegree = parseInt(progress.getAttribute("data-degree"));
//     var color = progress.getAttribute("data-color");
//     let number = progress.querySelector(".counto-circle__num");

//     var interval = setInterval(function(){
//       degree += 1;
//       if(degree > targetDegree) {
//         clearInterval(interval);
//         return;
//       }
//       progress.style.background = `conic-gradient(${color} ${degree}%, #2c2c2c 0%)`
//       number.innerHTML = degree;
//     },50)
//   })
// })


document.addEventListener("DOMContentLoaded", function(event) {
  const circles = document.querySelectorAll('.counto-circle');

  // Function to start the animation
  const startCounter = (progress) => {
    let degree = 0;
    const targetDegree = parseInt(progress.getAttribute("data-degree"));
    const color = progress.getAttribute("data-color");
    const number = progress.querySelector(".counto-circle__num");

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
          entry.target.querySelector(".counto-circle__num").innerHTML = '0'; // Reset number on exit if desired
        }
      });
    },
    { threshold: 0.5 } // Adjust threshold as needed
  );

  // Observe each circle element
  circles.forEach((circle) => observer.observe(circle));
});
