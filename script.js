const typedText = document.getElementById("typed-text");
const words = ["hingdragon", "adam"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  typedText.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 1200);
  }
}

type();

let currentPage = 0;
let isScrolling = false;

function scrollToPage(page) {
  if (isScrolling) return;
  isScrolling = true;
  const container = document.querySelector(".scroll-container");
  container.style.transform = `translateY(-${page * 100}vh)`;
  setTimeout(() => {
    isScrolling = false;
  }, 1000);
}

// Handle mouse wheel scroll (desktop)
window.addEventListener("wheel", (e) => {
  if (isScrolling) return;
  if (e.deltaY > 50 && currentPage === 0) {
    currentPage = 1;
    scrollToPage(currentPage);
  } else if (e.deltaY < -50 && currentPage === 1) {
    currentPage = 0;
    scrollToPage(currentPage);
  }
});

// Handle swipe gestures (mobile)
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].clientY;
});

window.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].clientY;
  handleSwipe();
});

function handleSwipe() {
  if (isScrolling) return;
  const threshold = 50; // minimum distance for swipe to count
  const deltaY = touchStartY - touchEndY;

  if (deltaY > threshold && currentPage === 0) {
    // Swipe up
    currentPage = 1;
    scrollToPage(currentPage);
  } else if (deltaY < -threshold && currentPage === 1) {
    // Swipe down
    currentPage = 0;
    scrollToPage(currentPage);
  }
}
