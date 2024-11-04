document.addEventListener("mousemove", parallax);
function parallax(e) {
  document.querySelectorAll(".feature-parallax").forEach(function(move){
    var moving_value = move.getAttribute("data-value");
    // var x = (e.clientX * moving_value) / 250;
    var y = (e.clientY * moving_value) / 250;

    move.style.transform = "translateY("+ y + "px)";
  });
}


// parallax banner

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



// parallax feature

let lastScrollPositionFeature = window.scrollY;
let currentOffsetImage1 = 0;
let currentOffsetImage2 = 0;
let isTicking = false;

function handleFeatureParallax() {
  const featureImage1 = document.querySelector('.feature-col-7__image1');
  const featureImage2 = document.querySelector('.feature-col-7__image3');
  
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


let lastScrollPositionFeature2 = window.scrollY;
let currentOffsetImage3 = 0;
let isTicking2 = false;

function handleFeatureParallax2() {
  const featureImage3 = document.querySelector('.feature-col-6__image-left');
  
  const currentScrollPosition = window.scrollY;
  const isScrollingDown = currentScrollPosition > lastScrollPositionFeature2;
  
  // Tốc độ chuyển động của hiệu ứng
  const scrollSpeed = 0.8;
  const maxOffset = 25;

  if (featureImage3) {
    const rect1 = featureImage3.getBoundingClientRect();
    const inView1 = rect1.top < window.innerHeight && rect1.bottom > 0;

    if (inView1) {
      currentOffsetImage3 += isScrollingDown ? -scrollSpeed : scrollSpeed;
      currentOffsetImage3 = Math.max(-maxOffset, Math.min(maxOffset, currentOffsetImage3));
      featureImage3.style.transform = `translateX(${currentOffsetImage3}px)`;
    } else {
      currentOffsetImage3 = 0;
      featureImage3.style.transform = `translateX(${currentOffsetImage3}px)`;
    }
  }

  lastScrollPositionFeature2 = currentScrollPosition;
  isTicking2 = false; // Đặt lại isTicking2 sau khi hàm kết thúc
}

window.addEventListener('scroll', function() {
  if (!isTicking2) {
    requestAnimationFrame(handleFeatureParallax2);
    isTicking2 = true;
  }
});



let lastScrollPositionGallery = window.scrollY;
let isTickingGallery = false;

function handleGalleryParallax() {
  const gallerySection = document.querySelector('.gallery');
  const galleryImages = document.querySelectorAll('.gallery-image__box');

  if (!gallerySection) return;

  const currentScrollPosition = window.scrollY;
  const rect = gallerySection.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;

  if (inView) {
    const scrollPercentage = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));

    galleryImages.forEach((image) => {
      const scale = 1.8 - scrollPercentage * 0.8; // Scale từ 1.8 xuống 1
      const translateY = scrollPercentage * 750; // TranslateY đến 750px
      const opacity = 0.4 + scrollPercentage * 0.6; // Opacity từ 0.4 đến 1
      const rotateX = (scrollPercentage - 0.5) * 20; // RotateX từ -10deg đến 10deg
      const rotateY = (scrollPercentage - 0.5) * -20; // RotateY từ 10deg đến -10deg
      
      image.style.transform = `perspective(1000px) scale(${scale}) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      image.style.opacity = opacity;
    });
  } else {
    galleryImages.forEach((image) => {
      image.style.transform = `perspective(1000px) scale(1) translateY(0px) rotateX(0deg) rotateY(0deg)`;
      image.style.opacity = 0.4;
    });
  }

  lastScrollPositionGallery = currentScrollPosition;
  isTickingGallery = false;
}

window.addEventListener('scroll', function() {
  if (!isTickingGallery) {
    requestAnimationFrame(handleGalleryParallax);
    isTickingGallery = true;
  }
});

