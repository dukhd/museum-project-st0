const pictureInnerContainer = document.querySelector(".picture-inner-container");
const images = Array.from({ length: 15 }, (_, i) => `assets/img/galery/galery${i + 1}.webp`);

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const img = entry.target;
    if (entry.isIntersecting) {
      img.style.transitionDelay = `${img.dataset.index * 20}ms`;
      img.classList.add('visible');
    } else {
      img.style.transitionDelay = '0ms';
      img.classList.remove('visible');
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.05
});

function renderGallery() {
  pictureInnerContainer.innerHTML = "";
  const shuffled = shuffle(images);

  const columns = [
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div")
  ];
  columns.forEach((col, index) => {
    col.classList.add("gallery-column");
    if (index === 1) {
      col.classList.add("gallery-column-offset-top");
    }
    pictureInnerContainer.append(col);
  });

  const spacer = document.createElement("div");
  spacer.classList.add("spacer");
  columns[2].append(spacer);

  shuffled.forEach((src, index) => {
    const img = document.createElement("img");
    img.classList.add("gallery-img");
    img.src = src;
    img.alt = `gallery picture ${index + 1}`;
    img.dataset.index = index; 

    const columnIndex = index % 3;
    columns[columnIndex].append(img);
    
    observer.observe(img);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
});