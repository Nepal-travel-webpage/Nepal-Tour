const track = document.getElementById("sliderTrack");
const items = document.querySelectorAll(".slider-item");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentIndex = 1;

function updateSlider() {
  items.forEach((item, index) => {
    item.classList.toggle("active", index === currentIndex);
  });

  const itemWidth = items[0].offsetWidth + 30; // Width + Gap
  const trackContainerWidth = track.parentElement.offsetWidth;
  const centerOffset =
    currentIndex * itemWidth - trackContainerWidth / 2 + itemWidth / 2;

  track.style.transform = `translateX(${-centerOffset}px)`;
}

nextBtn.addEventListener("click", () => {
  currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
  updateSlider();
});

window.addEventListener("resize", updateSlider);
updateSlider();
