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

const mainVideo = document.querySelector('.video-main iframe.video-center');
const dotsVideo = document.querySelectorAll('.video-dots .circle_nav');
const players = [];

window.onYouTubeIframeAPIReady = function() {
  document.querySelectorAll('.youtube-player').forEach((iframe, i) => {
    players[i] = new YT.Player(iframe);
  });
  
  swiper.init();
};



function updateMainVideo() {
  const activeSlide = swiper.slides[swiper.activeIndex];
  if (!activeSlide) return;
  const iframe = activeSlide.querySelector('iframe');
  if (!iframe) return;

  pauseAll();

  let newSrc = iframe.src;
  if (!newSrc.includes('enablejsapi=1')) {
    newSrc += (newSrc.includes('?') ? '&' : '?') + 'enablejsapi=1';
  }

  mainVideo.src = newSrc;
}

function pauseAll() {
  players.forEach((player, i) => {
    if (player && typeof player.pauseVideo === 'function') {
      player.pauseVideo();
    } else {
      console.log('Player not ready at index', i);
    }
  });
}

function pauseAllExcept(index) {
  players.forEach((player, i) => {
    if (player && player.pauseVideo) {
      if (i !== index) {
        player.pauseVideo();
      }
    }
  });
}

function activeVideoDot(index) {
  dotsVideo.forEach(dot => dot.classList.remove('active'));
  if (dotsVideo[index]) {
    dotsVideo[index].classList.add('active');
  }
}

swiper.on('slideChange', () => {
  pauseAll();
  updateMainVideo();
  activeVideoDot(swiper.realIndex);
});

dotsVideo.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    swiper.slideToLoop(index);
    pauseAll();
    updateMainVideo();
    activeVideoDot(index);
  });
});


document.querySelectorAll('.youtube-player').forEach((iframe, i) => {
  iframe.addEventListener('click', () => {
    players.forEach((player, j) => {
      if (!player || typeof player.pauseVideo !== 'function') return;
      if (i !== j) player.pauseVideo();
    });
  });
});