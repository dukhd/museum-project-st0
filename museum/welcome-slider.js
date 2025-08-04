const prevImg = document.getElementById('arrow-prev');
const nextImg = document.getElementById('arrow-next');
const slidesImg = document.querySelectorAll('.img_slide');
const squares = document.querySelectorAll('.pag_squares_item');
const pagNumber = document.querySelectorAll('.pag_text');
const mouseMoveSlider = document.querySelector('.welcome-image');

let index = 0;

const activeWelsomeSlide = n => {
  for(img_slide of slidesImg) {
    img_slide.classList.remove('active');
  }
  slidesImg[n].classList.add('active');
}

const activeWelsomeSquares = n => {
  console.log(n);
  for(pag_squares_item of squares) {
    pag_squares_item.classList.remove('active');
  }
  squares[n].classList.add('active');
}

const activeWelsomeNumber = n => {
  console.log(n);
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
