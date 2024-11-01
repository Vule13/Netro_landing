// // document.addEventListener("mousemove", parallax);
// // function parallax(e) {
// //   document.querySelectorAll(".banner-parallax").forEach(function(move){
// //     var moving_value = move.getAttribute("data-value");
// //     // var x = (e.clientX * moving_value) / 250;
// //     var y = (e.clientY * moving_value) / 250;

// //     move.style.transform = "translateY("+ y + "px)";
// //   });
// // }

// window.addEventListener('scroll', function() {
//   // Thêm hiệu ứng parallax cho các phần tử .banner-bottom__left
//   const parallaxElementsA = document.querySelectorAll('.banner-bottom__left');
//   for (let i = 0; i < parallaxElementsA.length; i++) {
//     let scrollPosition = window.scrollY;
//     let offset = Math.min(scrollPosition * (0.2 + i * 0.05), 100);
//     parallaxElementsA[i].style.transform = `perspective(1200px) translateY(-${offset}px) rotateX(3deg) rotateY(10deg)`;
//   }

//   // Thêm hiệu ứng parallax cho các phần tử .banner-bottom__right
//   const parallaxElementsB = document.querySelectorAll('.banner-bottom__right');
//   for (let i = 0; i < parallaxElementsB.length; i++) {
//     let scrollPosition = window.scrollY;
//     let offset = Math.min(scrollPosition * (0.2 + i * 0.05), 100);
//     parallaxElementsB[i].style.transform = `perspective(1200px) translateY(-${offset}px) rotateX(3deg) rotateY(-10deg)`;
//     parallaxElementsB[i].style.transition = `all 0.3s ease-in-out`;
//   }

//   const parallaxElementsC = document.querySelectorAll('.banner-bottom__left-small');
//   for (let i = 0; i < parallaxElementsC.length; i++) {
//     let scrollPosition = window.scrollY;
//     let offset = Math.min(scrollPosition * (0.2 + i * 0.05), 100);
//     parallaxElementsC[i].style.transform = `perspective(1200px) translateY(-${offset}px) rotateX(11deg) rotateY(15deg)`;
//   }
  
//   const parallaxElementsD = document.querySelectorAll('.banner-bottom__right-small');
//   for (let i = 0; i < parallaxElementsD.length; i++) {
//     let scrollPosition = window.scrollY;
//     let offset = Math.min(scrollPosition * (0.2 + i * 0.05), 100);
//     parallaxElementsD[i].style.transform = `perspective(1200px) translateY(-${offset}px) rotate(2deg) rotateX(8deg) rotateY(-11deg)`;
//   }
// });

let lastScrollPosition = 0;
let currentOffsetA = 0;
let currentOffsetB = 0;
let currentOffsetC = 0;
let currentOffsetD = 0;

function handleParallax() {
  const parallaxElementsA = document.querySelectorAll('.banner-bottom__left');
  const parallaxElementsB = document.querySelectorAll('.banner-bottom__right');
  const parallaxElementsC = document.querySelectorAll('.banner-bottom__left-small');
  const parallaxElementsD = document.querySelectorAll('.banner-bottom__right-small');

  lastScrollPosition = window.scrollY;

  // Tính toán giá trị target cho chuyển động
  let targetOffsetA = Math.min(lastScrollPosition * 0.2, 100);
  let targetOffsetB = Math.min(lastScrollPosition * 0.2, 100);
  let targetOffsetC = Math.min(lastScrollPosition * 0.2, 100);
  let targetOffsetD = Math.min(lastScrollPosition * 0.2, 100);

  // Tăng dần currentOffset về targetOffset với tỷ lệ nhỏ hơn
  currentOffsetA += (targetOffsetA - currentOffsetA) * 0.05;
  currentOffsetB += (targetOffsetB - currentOffsetB) * 0.05;
  currentOffsetC += (targetOffsetA - currentOffsetC) * 0.05;
  currentOffsetD += (targetOffsetB - currentOffsetD) * 0.05;

  // Chỉ áp dụng transform nếu currentOffset chứa dấu phẩy
  if (currentOffsetA % 1 !== 0) {
    parallaxElementsA.forEach(el => {
      el.style.transform = `perspective(1200px) translateY(${currentOffsetA}px) rotateX(3deg) rotateY(10deg)`;
    });
  }

  if (currentOffsetB % 1 !== 0) {
    parallaxElementsB.forEach(el => {
      el.style.transform = `perspective(1200px) translateY(${currentOffsetB}px) rotateX(3deg) rotateY(-10deg)`;
    });
  }

  if (currentOffsetC % 1 !== 0) {
    parallaxElementsC.forEach(el => {
      el.style.transform = `perspective(1200px) translateY(${currentOffsetC}px) rotateX(11deg) rotateY(15deg)`;
    });
  }

  if (currentOffsetD % 1 !== 0) {
    parallaxElementsD.forEach(el => {
      el.style.transform = `perspective(1200px) translateY(${currentOffsetD}px) rotate(2deg) rotateX(8deg) rotateY(-11deg)`;
    });
  }
  // Gọi lại requestAnimationFrame để duy trì hiệu ứng
  requestAnimationFrame(handleParallax);
}

// Bắt đầu chạy hiệu ứng parallax
handleParallax();
window.addEventListener('scroll', () => {
  lastScrollPosition = window.scrollY;
});
