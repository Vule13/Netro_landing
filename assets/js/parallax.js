document.addEventListener("mousemove", parallax);
function parallax(e) {
  document.querySelectorAll(".feature-parallax").forEach(function(move){
    var moving_value = move.getAttribute("data-value");
    // var x = (e.clientX * moving_value) / 250;
    var y = (e.clientY * moving_value) / 250;

    move.style.transform = "translateY("+ y + "px)";
  });
}




let lastScrollPosition = 0;
const currentOffsets = {
  A: 0,
  B: 0,
  C: 0,
  D: 0
};

function handleParallax() {
  const parallaxElements = {
    A: document.querySelectorAll('.banner-bottom__left'),
    B: document.querySelectorAll('.banner-bottom__right'),
    C: document.querySelectorAll('.banner-bottom__left-small'),
    D: document.querySelectorAll('.banner-bottom__right-small')
  };

  lastScrollPosition = window.scrollY;

  // Tính toán giá trị target cho chuyển động
  const targetOffsets = {
    A: Math.min(lastScrollPosition * 0.2, 100),
    B: Math.min(lastScrollPosition * 0.2, 100),
    C: Math.min(lastScrollPosition * 0.2, 100),
    D: Math.min(lastScrollPosition * 0.2, 100),
  };

  // Tăng dần currentOffset về targetOffset với tỷ lệ 0.05
  for (const key in currentOffsets) {
    currentOffsets[key] += (targetOffsets[key] - currentOffsets[key]) * 0.05;
  }

  // Áp dụng transform cho từng nhóm phần tử
  for (const key in parallaxElements) {
    const elements = parallaxElements[key];

    if (currentOffsets[key] % 1 !== 0) {
      elements.forEach(el => {
        let transformString;

        // Chọn cách transform dựa trên nhóm
        switch (key) {
          case 'A':
            transformString = `perspective(1200px) translateY(${currentOffsets[key]}px) rotateX(3deg) rotateY(10deg)`;
            break;
          case 'B':
            transformString = `perspective(1200px) translateY(${currentOffsets[key]}px) rotateX(3deg) rotateY(-10deg)`;
            break;
          case 'C':
            transformString = `perspective(1200px) translateY(${currentOffsets[key]}px) rotateX(11deg) rotateY(15deg)`;
            break;
          case 'D':
            transformString = `perspective(1200px) translateY(${currentOffsets[key]}px) rotate(2deg) rotateX(8deg) rotateY(-11deg)`;
            break;
        }

        el.style.transform = transformString;
      });
    }
  }

  // Gọi lại requestAnimationFrame để duy trì hiệu ứng
  requestAnimationFrame(handleParallax);
}

// Bắt đầu chạy hiệu ứng parallax
handleParallax();
window.addEventListener('scroll', () => {
  lastScrollPosition = window.scrollY;
});



let lastScrollPositionFeature = window.scrollY;
let currentOffsetImage1 = 0;
let currentOffsetImage2 = 0;
let isTicking = false;

function handleFeatureParallax() {
  const featureImage1 = document.querySelector('.feature-col-8__image1');
  const featureImage2 = document.querySelector('.feature-col-8__image3');
  
  const currentScrollPosition = window.scrollY;
  const isScrollingDown = currentScrollPosition > lastScrollPositionFeature;
  
  // Tốc độ chuyển động của hiệu ứng
  const scrollSpeed = 0.8;
  const maxOffset = 25;

  if (featureImage1) {
    const rect1 = featureImage1.getBoundingClientRect();
    const inView1 = rect1.top < window.innerHeight && rect1.bottom > 0;

    if (inView1) {
      currentOffsetImage1 += isScrollingDown ? -scrollSpeed : scrollSpeed;
      currentOffsetImage1 = Math.max(-maxOffset, Math.min(maxOffset, currentOffsetImage1));
      featureImage1.style.transform = `translateX(${currentOffsetImage1}px)`;
    } else {
      currentOffsetImage1 = 0;
      featureImage1.style.transform = `translateX(${currentOffsetImage1}px)`;
    }
  }

  if (featureImage2) {
    const rect2 = featureImage2.getBoundingClientRect();
    const inView2 = rect2.top < window.innerHeight && rect2.bottom > 0;

    if (inView2) {
      currentOffsetImage2 += isScrollingDown ? -scrollSpeed : scrollSpeed;
      currentOffsetImage2 = Math.max(-maxOffset, Math.min(maxOffset, currentOffsetImage2));
      featureImage2.style.transform = `translateX(${-currentOffsetImage2}px)`;
    } else {
      currentOffsetImage2 = 0;
      featureImage2.style.transform = `translateX(${currentOffsetImage2}px)`;
    }
  }

  lastScrollPositionFeature = currentScrollPosition;
  isTicking = false;
}

window.addEventListener('scroll', function() {
  if (!isTicking) {
    requestAnimationFrame(handleFeatureParallax);
    isTicking = true;
  }
});
