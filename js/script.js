// Toggle class active

const navbarNav = document.querySelector(".navbar-nav");
//ketika menu di klik
document.querySelector("#menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar sidebar untuk menghilangkan nav
const menu = document.querySelector("#menu");

document.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(".fade-slide").forEach((el) => observer.observe(el));
});

// gambar genre otomaits bergerak
const galleryControlsContainer = document.querySelector(".gallery-controls");
const galleryContainer = document.querySelector(".gallery-container");
const galleryItems = document.querySelectorAll(".gallery-item");

class Carousel {
  constructor(container, items) {
    this.carouselContainer = container;
    this.carouselArray = [...items];
    this.autoSlide();
  }

  updateGallery() {
    this.carouselArray.forEach((el) => {
      el.classList.remove(
        "gallery-item-1",
        "gallery-item-2",
        "gallery-item-3",
        "gallery-item-4",
        "gallery-item-5",
        "gallery-item-6",
        "gallery-item-7",
        "gallery-item-8",
        "gallery-item-9",
        "gallery-item-10",
        "gallery-item-11",
        "gallery-item-12"
      );
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i + 1}`);
    });
  }

  autoSlide() {
    setInterval(() => {
      this.carouselArray.push(this.carouselArray.shift());
      this.updateGallery();
    }, 3000); // setiap 3 detik slide otomatis
  }
}

const autoCarousel = new Carousel(galleryContainer, galleryItems);


const exampleCarousel = new Carousel(
  galleryContainer,
  galleryItems,
  galleryControls
);

exampleCarousel.setControls();
exampleCarousel.useControls();
function goToPage(page) {
        window.location.href = page;
      }