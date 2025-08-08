const slider = document.querySelector('.slider-wrapper');
const before = document.querySelector('.slider_before');
const beforeImage = before.getElementsByTagName('img')[0];
const sliderHandle = document.querySelector('.slider_handle');

let active = false;

document.addEventListener("DOMContentLoaded", function () {
  let width = slider.offsetWidth;
  beforeImage.style.width = width + 'px';
});

window.addEventListener('resize', function () {
  let width = slider.offsetWidth;
  beforeImage.style.width = width + 'px';
})

sliderHandle.addEventListener('mousedown',function () {
  active = true;
 sliderHandle.classList.add('resize');

});

document.body.addEventListener('mouseup',function () {
  active = false;
 sliderHandle.classList.remove('resize');
});

document.body.addEventListener('mouseleave', function () {
  active = false;
  sliderHandle.classList.remove('resize');
});

document.body.addEventListener('mousemove',function (e) {
  if (!active) return;
  let x = e.pageX;
  x -= slider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(e);
});

sliderHandle.addEventListener('touchstart',function () {
  active = true;
  sliderHandle.classList.add('resize');
});

document.body.addEventListener('touchend',function () {
  active = false;
  sliderHandle.classList.remove('resize');
});

document.body.addEventListener('touchcancel',function () {
  active = false;
  sliderHandle.classList.remove('resize');
});

function slideIt(x) {
  let sliderWidth = slider.offsetWidth;
  if (x < 0) x = 0;
  if (x > sliderWidth) x = sliderWidth;

  before.style.width = x + "px";

  sliderHandle.style.left = x - (sliderHandle.offsetWidth / 2) + "px";
}

function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}