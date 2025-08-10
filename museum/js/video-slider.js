// custom bar start --------------------------
const video = document.querySelector('.video-center');
const playBigBtn = document.querySelector('.play-big-button');
const playBtn = document.querySelector('.play-button');
const playLine = document.querySelector('.play-line');
const playLineDot = document.querySelector('.play-line-dot');
const audioBtn = document.querySelector('.audio-button');
const audioLine = document.querySelector('.audio-line');
const audioLineDot = document.querySelector('.audio-line-dot');
const fullscreenBtn = document.querySelector('.fullscreen-button');
const videoMain = video.parentElement;

let isPlaying = false;
let isMuted = false;
let isDraggingProgress = false;
let isDraggingVolume = false;

function togglePlay() {
  if (video.paused) {
    video.play();
    isPlaying = true;
    playBtn.classList.add('active');
    playBigBtn.style.opacity = '0';
    pauseAll();
  } else {
    video.pause();
    isPlaying = false;
    playBtn.classList.remove('active');
    playBigBtn.style.opacity = '1';
  }
}

playBigBtn.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);



const updatePlayProgressUI = () => {
  const progressPercent = (video.currentTime / video.duration) * 100;
  playLine.style.setProperty('--progress-percent', `${progressPercent}%`);
  playLineDot.style.left = progressPercent + '%';
};

updatePlayProgressUI();

function updateVideoTimeByPosition(clientX) {
  const rect = playLine.getBoundingClientRect();
  let pos = clientX - rect.left;
  pos = Math.min(Math.max(0, pos), rect.width);
  const percent = pos / rect.width;
  video.currentTime = percent * video.duration;
  updatePlayProgressUI();
}

playLine.addEventListener('mousedown', (e) => {
  isDraggingProgress = true;
  updateVideoTimeByPosition(e.clientX);
  video.pause();
  isPlaying = false;
  playBtn.classList.remove('active');
  playBigBtn.style.opacity = '1';
});

document.addEventListener('mouseup', () => {
  if (isDraggingProgress) {
    isDraggingProgress = false;
    if (video.currentTime >= video.duration) {
      video.pause();
      isPlaying = false;
      playBtn.classList.remove('active');
      playBigBtn.style.opacity = '1';
    } else {
      video.play();
      isPlaying = true;
      playBtn.classList.add('active');
      playBigBtn.style.opacity = '0';
    }
  }
  if (isDraggingVolume) {
    isDraggingVolume = false;
  }
});

document.addEventListener('mousemove', (e) => {
  if (isDraggingProgress) {
    updateVideoTimeByPosition(e.clientX);
  }
  if (isDraggingVolume) {
    updateVolumeByPosition(e.clientX);
  }
});

video.addEventListener('timeupdate', () => {
  if (!isDraggingProgress) {
    updatePlayProgressUI();
    if (video.currentTime >= video.duration) {
      video.pause();
      isPlaying = false;
      playBtn.classList.remove('active');
      playBigBtn.style.opacity = '1';
    }
  }
});

// volume set up start


video.volume = 0.5;

const updateVolumeUI = () => {
  const volumePercent = video.volume * 100;
  audioLine.style.setProperty('--audio-progress-percent', `${volumePercent}%`);
  audioLineDot.style.left = volumePercent + '%';

  if (video.volume === 0 || video.muted) {
    audioBtn.classList.add('muted');
  } else {
    audioBtn.classList.remove('muted');
  }
};

function updateVolumeByPosition(clientX) {
  const rect = audioLine.getBoundingClientRect();
  let pos = clientX - rect.left;
  pos = Math.min(Math.max(0, pos), rect.width);
  let volume = pos / rect.width;

  video.volume = volume;

  if (video.volume === 0) {
    video.muted = true;
    isMuted = true;
    audioBtn.classList.add('muted');
  } else {
    if (isMuted) {
      video.muted = false;
      isMuted = false;
      audioBtn.classList.remove('muted');
    }
  }
  updateVolumeUI();
}

audioBtn.addEventListener('click', () => {
  video.muted = !video.muted;
  isMuted = video.muted;
  if (isMuted) {
    audioBtn.classList.add('muted');
  } else {
    audioBtn.classList.remove('muted');
    if (video.volume === 0) {
      video.volume = 0.5;
      updateVolumeUI();
    }
  }
});

audioLine.addEventListener('mousedown', (e) => {
  isDraggingVolume = true;
  updateVolumeByPosition(e.clientX);
});

video.addEventListener('volumechange', updateVolumeUI);

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    videoMain.requestFullscreen();
    fullscreenBtn.classList.add('full_screen');
    playLine.classList.add('fullscreen');
    audioLine.classList.add('fullscreen');
  } else {
    document.exitFullscreen();
    fullscreenBtn.classList.remove('full_screen');
    playLine.classList.remove('fullscreen');
    audioLine.classList.remove('fullscreen');
  }
});


let speedDisplayTimeout;

const keyMap = {
  pausePlay: [' ', 'Space'],
  mute: ['m', 'M', 'ь', 'Ь'],
  fullscreen: ['f', 'F', 'а', 'А'],
  speedUp: [',', '<', 'б', 'Б'],
  speedDown: ['.', '>', 'ю', 'Ю'],
};

function showSpeed() {
  let speedElem = document.querySelector('.speed-display');
  if (!speedElem) {
    speedElem = document.createElement('div');
    speedElem.className = 'speed-display';
    videoMain.appendChild(speedElem);
  }
  speedElem.textContent = video.playbackRate.toFixed(1);
  speedElem.classList.remove('hidden');
  
  clearTimeout(speedElem.hideTimeout);
  speedElem.hideTimeout = setTimeout(() => {
    speedElem.classList.add('hidden');
  }, 1000);
}

window.addEventListener('keydown', (e) => {
  const tag = document.activeElement.tagName.toLowerCase();
  if (tag === 'input' || tag === 'textarea' || document.activeElement.isContentEditable) return;

  const key = e.key;

  if (keyMap.pausePlay.includes(key)) {
    e.preventDefault();
    togglePlay();
  } else if (keyMap.mute.includes(key)) {
    video.muted = !video.muted;
    isMuted = video.muted;
    if (isMuted) audioBtn.classList.add('muted');
    else audioBtn.classList.remove('muted');
  } else if (keyMap.fullscreen.includes(key)) {
    if (!document.fullscreenElement) {
      videoMain.requestFullscreen();
      fullscreenBtn.classList.add('full_screen');
      playLine.classList.add('fullscreen');
      audioLine.classList.add('fullscreen');
    } else {
      document.exitFullscreen();
      fullscreenBtn.classList.remove('full_screen');
      playLine.classList.remove('fullscreen');
      audioLine.classList.remove('fullscreen');

    }
  } else if (keyMap.speedUp.includes(key) && e.shiftKey) {
    e.preventDefault();
    video.playbackRate = Math.min(video.playbackRate + 0.25, 5);
    showSpeed();
  } else if (keyMap.speedDown.includes(key) && e.shiftKey) {
    e.preventDefault();
    video.playbackRate = Math.max(video.playbackRate - 0.25, 0.25);
    showSpeed();
  }
});

// custom bar end --------------------------


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
let players = [];


window.onYouTubeIframeAPIReady = function() {
  const iframes = document.querySelectorAll('.youtube-player');
  players = Array.from(iframes).map((iframe, i) => {
    return new YT.Player(iframe, {
      events: {
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            pauseAllExcept(i);
            pauseMainVideo()
          }
        }
      }
    });
  });
};

function updateMainVideo() {
  const activeSlide = swiper.slides[swiper.activeIndex];
  if (!activeSlide) return;

  const mp4Src = activeSlide.dataset.mp4;
  const posterSrc = activeSlide.dataset.poster;

  if (mp4Src) {
    video.setAttribute('poster', posterSrc);

    let source = video.querySelector('source');
    if (!source) {
      source = document.createElement('source');
      source.type = 'video/mp4';
      video.appendChild(source);
    }
    source.src = mp4Src;

    video.load();
  }
}

video.addEventListener('loadedmetadata', () => {
  video.duration = 0;
  isMuted = false;
  video.volume = 0.5;
  isPlaying = false;

  video.muted = isMuted; 
  if (!isMuted && video.volume === 0) {
    video.volume = 0.5;
  }

  updatePlayProgressUI();
  updateVolumeUI();

  playBigBtn.style.opacity = '1';
  playBtn.classList.remove('active');
  audioBtn.classList.remove('muted');

});

function pauseAll() {
  players.forEach((player, i) => {
    if (player && typeof player.pauseVideo === 'function') {
      player.pauseVideo();
    } else {
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

function pauseMainVideo() {
  if (!video.paused) {
    video.pause();
    playBtn.classList.remove('active');
    playBigBtn.style.opacity = '1';
    isPlaying = false;
  }
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
