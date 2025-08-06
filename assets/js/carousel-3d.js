(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const imageUrls = [
      'assets/images/carousel3d-01.jpg',
      'assets/images/carousel3d-02.jpg',
      'assets/images/carousel3d-03.jpg',
      'assets/images/carousel3d-04.jpg',
      'assets/images/carousel3d-05.jpg',
      'assets/images/carousel3d-06.jpg',
      'assets/images/carousel3d-07.jpg',
      'assets/images/carousel3d-08.jpg',
      'assets/images/carousel3d-09.jpg',
      'assets/images/carousel3d-10.jpg',
      'assets/images/carousel3d-11.jpg',
      'assets/images/carousel3d-12.jpg'
    ];

    const carousel = document.getElementById('carousel3d');
    if (!carousel) return;

    const itemCount = imageUrls.length;
    const angle = 360 / itemCount;
    const radius = 650;

    imageUrls.forEach((url, i) => {
      const item = document.createElement('div');
      item.className = 'carousel-3d__item';
      item.style.backgroundImage = `url('${url}')`;

      const rotY = i * angle;
      item.style.transform = `rotateY(${rotY}deg) translateZ(${radius}px)`;
      item.dataset.angle = rotY;
      carousel.appendChild(item);
    });

    function updateVisibility() {
      const items = document.querySelectorAll('.carousel-3d__item');
      const matrix = getComputedStyle(carousel).transform;

      let currentAngle = 0;
      if (matrix.startsWith('matrix3d')) {
        const values = matrix.match(/matrix3d\((.+)\)/)[1].split(',').map(parseFloat);
        const cosA = values[0];
        const sinA = values[2];
        currentAngle = Math.atan2(sinA, cosA) * (180 / Math.PI);
      }

      items.forEach(item => {
        const itemAngle = parseFloat(item.dataset.angle);
        let relativeAngle = (itemAngle - currentAngle + 360) % 360;

        if (relativeAngle > 40 && relativeAngle < 320) {
          let opacity = 1;

          if (relativeAngle < 70) {
            opacity = (relativeAngle - 40) / 30;
          } else if (relativeAngle > 290) {
            opacity = (320 - relativeAngle) / 30;
          }

          item.style.opacity = opacity.toString();
          item.style.pointerEvents = 'auto';
        } else {
          item.style.opacity = '0';
          item.style.pointerEvents = 'none';
        }
      });

      requestAnimationFrame(updateVisibility);
    }

    updateVisibility();
  });
})();
