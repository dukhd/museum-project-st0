document.addEventListener('DOMContentLoaded', () => {

const prevImg = document.getElementById('arrow-prev');
const nextImg = document.getElementById('arrow-next');
const slidesImg = document.querySelectorAll('.img_slide');
const squares = document.querySelectorAll('.pag_squares_item');
const pagNumber = document.querySelectorAll('.pag_text');
const welcomeSection = document.querySelector('.welcome-image');

let index = 0;

const activeWelsomeSlide = n => {
  for(img_slide of slidesImg) {
    img_slide.classList.remove('active');
  }
  slidesImg[n].classList.add('active');
}

const activeWelsomeSquares = n => {
  for(pag_squares_item of squares) {
    pag_squares_item.classList.remove('active');
  }
  squares[n].classList.add('active');
}

const activeWelsomeNumber = n => {
  for(pag_text of pagNumber) {
    pag_text.classList.remove('active');
  }
  pagNumber[n].classList.add('active');
}

const currentSlide = ind => {
  activeWelsomeSlide(ind);
  activeWelsomeSquares(ind);
  activeWelsomeNumber(ind);
}

const nextWelcomeSlide = () => {
  if(index === slidesImg.length - 1) {
    index = 0;
    currentSlide(index);
  } else {
    index++;
    currentSlide(index);
  }
}

const prevWelcomeSlide = () => {
  if(index === 0) {
    index = slidesImg.length - 1;
    currentSlide(index);
  } else {
    index--;
    currentSlide(index);
  }
}

squares.forEach((item, indexSquare) => {
  item.addEventListener('click', () => {
    index = indexSquare;
    currentSlide(index);
  })
})

nextImg.addEventListener('click', nextWelcomeSlide);
prevImg.addEventListener('click', prevWelcomeSlide);


let startX = 0;
let endX = 0;

welcomeSection.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

welcomeSection.addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  let diffX = endX - startX;
  if (Math.abs(diffX) > 20) {
    if (diffX > 0) {
      prevWelcomeSlide();
    } else {
      nextWelcomeSlide();
    }
  }
}

let isDragging = false;
let dragStartX = 0;
let dragEndX = 0;

welcomeSection.addEventListener('mousedown', e => {
  if (e.target.closest('.img_slide')) {
    e.preventDefault();
    document.body.style.userSelect = 'none';
    isDragging = true;
    dragStartX = e.clientX;
  }
});

welcomeSection.addEventListener('mouseup', e => {
  if (!isDragging) return;
  document.body.style.userSelect = '';
  isDragging = false;
  dragEndX = e.clientX;
  handleDrag();
});

welcomeSection.addEventListener('mouseleave', e => {
  if (isDragging) {
    isDragging = false;
    document.body.style.userSelect = '';
  }
});

welcomeSection.addEventListener('touchstart', e => {
  if (e.target.closest('.img_slide')) {
    document.body.style.userSelect = 'none';
    isDragging = true;
    dragStartX = e.touches[0].clientX;
  }
});

welcomeSection.addEventListener('touchend', e => {
  if (!isDragging) return;
  document.body.style.userSelect = '';
  isDragging = false;
  dragEndX = e.changedTouches[0].clientX;
  handleDrag();
});

function handleDrag() {
  const diffX = dragEndX - dragStartX;

  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      prevWelcomeSlide();
    } else {
      nextWelcomeSlide();
    }
  }
}

});