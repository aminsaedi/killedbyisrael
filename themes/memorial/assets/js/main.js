// Image Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel-container');
  if (!carousel) return;

  const images = carousel.querySelectorAll('.carousel-image');
  const indicators = carousel.querySelectorAll('.carousel-indicator');
  const thumbnails = carousel.querySelectorAll('.carousel-thumbnail');
  const prevButton = carousel.querySelector('.carousel-prev');
  const nextButton = carousel.querySelector('.carousel-next');
  
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function showImage(index) {
    // Hide all images
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
    
    // Update indicators
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    
    // Update thumbnails
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
    
    // Update button states
    if (prevButton) prevButton.disabled = index === 0;
    if (nextButton) nextButton.disabled = index === images.length - 1;
    
    currentIndex = index;
  }

  function nextImage() {
    if (currentIndex < images.length - 1) {
      showImage(currentIndex + 1);
    }
  }

  function prevImage() {
    if (currentIndex > 0) {
      showImage(currentIndex - 1);
    }
  }

  // Button controls
  if (prevButton) {
    prevButton.addEventListener('click', prevImage);
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', nextImage);
  }

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showImage(index));
  });

  // Thumbnail clicks
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => showImage(index));
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!carousel.contains(document.activeElement)) return;
    
    if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  });

  // Touch/swipe support
  const carouselMain = carousel.querySelector('.carousel-main');
  if (carouselMain) {
    carouselMain.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carouselMain.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left
        nextImage();
      } else {
        // Swiped right
        prevImage();
      }
    }
  }

  // Initialize first image
  showImage(0);
});