// const slider = document.querySelector('.explore-slider');
// const handle = document.querySelector('.slider-handle');
// const afterImage = document.querySelector('.after');

// let isDragging = false;

// handle.addEventListener('mousedown', (e) => {
//     isDragging = true;
//     document.body.style.cursor = 'ew-resize';
// });

// document.addEventListener('mouseup', () => {
//     isDragging = false;
//     document.body.style.cursor = 'default';
// });

// document.addEventListener('mousemove', (e) => {
//     if (isDragging) {
//         const sliderRect = slider.getBoundingClientRect();
//         const offsetX = e.clientX - sliderRect.left;

//         // Limit the handle position within the slider bounds
//         if (offsetX >= 0 && offsetX <= sliderRect.width) {
//             handle.style.left = `${offsetX}px`;
//             afterImage.style.clip = `rect(0, ${offsetX}px, ${sliderRect.height}px, 0)`;
//         }
//     }
// });