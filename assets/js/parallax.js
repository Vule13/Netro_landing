// document.addEventListener("mousemove", parallax);
// function parallax(e) {
//   document.querySelectorAll(".banner-parallax").forEach(function(move){
//     var moving_value = move.getAttribute("data-value");
//     // var x = (e.clientX * moving_value) / 250;
//     var y = (e.clientY * moving_value) / 250;

//     move.style.transform = "translateY("+ y + "px)";
//   });
// }

window.addEventListener('scroll', function() {
  // Thêm hiệu ứng parallax cho các phần tử .banner-bottom__left
  const parallaxElementsA = document.querySelectorAll('.banner-bottom__left');
  for (let i = 0; i < parallaxElementsA.length; i++) {
    let scrollPosition = window.scrollY;
    let offset = Math.min(scrollPosition * (0.2 + i * 0.05), 150);
    parallaxElementsA[i].style.transform = `perspective(1200px) translateY(-${offset}px) rotateX(3deg) rotateY(10deg)`;
  }

  // Thêm hiệu ứng parallax cho các phần tử .banner-bottom__right
  const parallaxElementsB = document.querySelectorAll('.banner-bottom__right');
  for (let i = 0; i < parallaxElementsB.length; i++) {
    let scrollPosition = window.scrollY;
    let offset = Math.min(scrollPosition * (0.2 + i * 0.05), 150);
    parallaxElementsB[i].style.transform = `perspective(1200px) translateY(-${offset}px) rotateX(3deg) rotateY(-10deg)`;
  }

  const parallaxElementsC = document.querySelectorAll('.banner-bottom__left-small');
  for (let i = 0; i < parallaxElementsC.length; i++) {
    let scrollPosition = window.scrollY;
    let offset = Math.min(scrollPosition * (0.2 + i * 0.05), 150);
    parallaxElementsC[i].style.transform = `perspective(1200px) translateY(-${offset}px) rotateX(11deg) rotateY(15deg)`;
  }
  
  const parallaxElementsD = document.querySelectorAll('.banner-bottom__right-small');
  for (let i = 0; i < parallaxElementsD.length; i++) {
    let scrollPosition = window.scrollY;
    let offset = Math.min(scrollPosition * (0.2 + i * 0.05), 150);
    parallaxElementsD[i].style.transform = `perspective(1200px) translateY(-${offset}px) rotate(2deg) rotateX(8deg) rotateY(-11deg)`;
  }
});
