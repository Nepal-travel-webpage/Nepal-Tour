const slides = document.querySelectorAll(".hero-slide");
let current = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 5000); // change image every 5 seconds
