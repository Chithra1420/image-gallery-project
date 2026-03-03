let currentIndex = 0;
let slideInterval = null;

const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

/* Open Lightbox */
function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "flex";
    lightboxImg.src = images[currentIndex].src;

    lightboxImg.classList.remove("fade-out");
    lightboxImg.classList.add("fade-in");

    startSlideshow();  // 🔥 Start auto slideshow
}

/* Close Lightbox */
function closeLightbox() {
    lightbox.style.display = "none";
    stopSlideshow();   // 🔥 Stop slideshow
}

/* Change Image with Fade */
function changeImage(direction) {
    lightboxImg.classList.add("fade-out");

    setTimeout(() => {
        currentIndex += direction;

        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }

        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        lightboxImg.src = images[currentIndex].src;

        lightboxImg.classList.remove("fade-out");
        lightboxImg.classList.add("fade-in");
    }, 300);
}

/* Auto Slideshow */
function startSlideshow() {
    slideInterval = setInterval(() => {
        changeImage(1);
    }, 3000);  // 3 seconds
}

function stopSlideshow() {
    clearInterval(slideInterval);
}

/* Filter Images */
function filterImages(category) {
    images.forEach((img) => {
        if (category === "all" || img.classList.contains(category)) {
            img.style.display = "block";
        } else {
            img.style.display = "none";
        }
    });
}

/* Keyboard Navigation */
document.addEventListener("keydown", function (event) {
    if (lightbox.style.display === "flex") {

        if (event.key === "ArrowRight") {
            changeImage(1);
        }

        if (event.key === "ArrowLeft") {
            changeImage(-1);
        }

        if (event.key === "Escape") {
            closeLightbox();
        }
    }
});
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].screenX;
});

lightbox.addEventListener("touchend", function (event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (lightbox.style.display === "flex") {

        // Swipe Left → Next
        if (touchStartX - touchEndX > 50) {
            changeImage(1);
        }

        // Swipe Right → Previous
        if (touchEndX - touchStartX > 50) {
            changeImage(-1);
        }
    }
}