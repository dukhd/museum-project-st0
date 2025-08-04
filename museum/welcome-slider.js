const prevImg = document.getElementById('arrow-prev');
const nextImg = document.getElementById('arrow-next');
const slidesImg = document.querySelectorAll('.img_slide')
const squares = document.querySelectorAll('.pag_squares_item')
const pagNumber = document.querySelectorAll('.pag_text')

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

const nextWelcomeSlide = () => {
  if(index === slidesImg.length - 1) {
    index = 0;
    activeWelsomeSlide(index);
    activeWelsomeSquares(index);
    activeWelsomeNumber(index);
  } else {
    index++;
    activeWelsomeSlide(index);
    activeWelsomeSquares(index);
    activeWelsomeNumber(index);
  }
}

const prevWelcomeSlide = () => {
  if(index === 0) {
    index = slidesImg.length - 1;
    activeWelsomeSlide(index);
    activeWelsomeSquares(index);
    activeWelsomeNumber(index);
  } else {
    index--;
    activeWelsomeSlide(index);
    activeWelsomeSquares(index);
    activeWelsomeNumber(index);
  }
}

nextImg.addEventListener('click', nextWelcomeSlide);
prevImg.addEventListener('click', prevWelcomeSlide);
