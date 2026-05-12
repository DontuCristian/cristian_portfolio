// script.js

const sliderTrack =
  document.getElementById("sliderTrack");

const nextBtn =
  document.getElementById("nextBtn");

const prevBtn =
  document.getElementById("prevBtn");

const wrapper =
  document.querySelector(".slider-wrapper");

const dotsContainer =
  document.getElementById("sliderDots");

const cards =
  document.querySelectorAll(".project-card");

const PROJECT_INDEX_KEY =
  "portfolio-slider-index";

/* LOAD SAVED INDEX */

let currentIndex =
  parseInt(
    localStorage.getItem(PROJECT_INDEX_KEY)
  ) || 0;

let autoSlide;

/* CREATE DOTS */

cards.forEach((_, index) => {

  const dot =
    document.createElement("button");

  dot.classList.add("slider-dot");

  dot.addEventListener(
    "click",
    () => {

      currentIndex = index;

      updateSlider();

      resetAutoSlide();

    }
  );

  dotsContainer.appendChild(dot);

});

/* UPDATE */

function updateSlider() {

  const activeCard =
    cards[currentIndex];

  /* RESET CLASSES */

  cards.forEach(card => {

    card.classList.remove(
      "active",
      "prev",
      "next"
    );

  });

  /* RESET DOTS */

  const dots =
    document.querySelectorAll(".slider-dot");

  dots.forEach(dot => {

    dot.classList.remove("active");

  });

  /* ACTIVE CARD */

  activeCard.classList.add("active");

  /* ACTIVE DOT */

  dots[currentIndex]
    .classList.add("active");

  /* PREV / NEXT */

  const prevIndex =
    (currentIndex - 1 + cards.length)
    % cards.length;

  const nextIndex =
    (currentIndex + 1)
    % cards.length;

  cards[prevIndex]
    .classList.add("prev");

  cards[nextIndex]
    .classList.add("next");

  /* FORCE LAYOUT RECALC */

  activeCard.getBoundingClientRect();

  /* CENTER ACTIVE CARD */

  const wrapperRect =
    wrapper.getBoundingClientRect();

  const activeRect =
    activeCard.getBoundingClientRect();

  const currentTransform =
    new DOMMatrix(
      window.getComputedStyle(sliderTrack)
      .transform
    ).m41;

  const activeCenter =
    activeRect.left +
    activeRect.width / 2;

  const wrapperCenter =
    wrapperRect.left +
    wrapperRect.width / 2;

  const difference =
    activeCenter - wrapperCenter;

  sliderTrack.style.transform =
    `translateX(${currentTransform - difference}px)`;

  /* SAVE INDEX */

  localStorage.setItem(
    PROJECT_INDEX_KEY,
    currentIndex
  );

}

/* NEXT */

function nextSlide() {

  currentIndex++;

  if(currentIndex >= cards.length) {

    currentIndex = 0;

  }

  updateSlider();

}

/* PREVIOUS */

function prevSlide() {

  currentIndex--;

  if(currentIndex < 0) {

    currentIndex =
      cards.length - 1;

  }

  updateSlider();

}

/* BUTTONS */

nextBtn.addEventListener(
  "click",
  () => {

    nextSlide();

    resetAutoSlide();

  }
);

prevBtn.addEventListener(
  "click",
  () => {

    prevSlide();

    resetAutoSlide();

  }
);

/* AUTOPLAY */

function startAutoSlide() {

  autoSlide = setInterval(() => {

    nextSlide();

  }, 5000);

}

function resetAutoSlide() {

  clearInterval(autoSlide);

  startAutoSlide();

}

/* RESIZE */

window.addEventListener(
  "resize",
  () => {

    sliderTrack.style.transform =
      "translateX(0px)";

    updateSlider();

  }
);
/* INIT */

updateSlider();

startAutoSlide();