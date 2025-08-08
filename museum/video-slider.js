const swiper = new Swiper('.video-carousel', {
  navigation: {
    nextEl: '.next-video',
    prevEl: '.prev-video'
  },
  pagination: false,
  slidesPerView: 3,
  slidesPerGroup: 1,
  spaceBetween: 42,
  loop: true,

});


const dotsVideo = document.querySelectorAll('.video-dots .circle_nav');

function activeVideoDot(index) {
  dotsVideo.forEach(dot => dot.classList.remove('active'));
  if (dotsVideo[index]) {
    dotsVideo[index].classList.add('active');
  }
}

swiper.on('slideChange', () => {
  activeVideoDot(swiper.realIndex);
});

dotsVideo.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    swiper.slideToLoop(index);
  });
});