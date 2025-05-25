let newSlideIndex = 0;
let trendingSlideIndex = 0;

function moveSlide(carouselType, direction) {
    let carousel;
    let slideIndex;
    
    if (carouselType === 'new') {
        carousel = document.getElementById('newCarousel');
        slideIndex = newSlideIndex;
    } else if (carouselType === 'trending') {
        carousel = document.getElementById('trendingCarousel');
        slideIndex = trendingSlideIndex;
    }

    const slides = carousel.getElementsByClassName('carousel-image');
    const totalSlides = slides.length;

    // Calculate the slideWidth based on the image size and margin
    const slideWidth = slides[0].clientWidth + 20;

    // Update the slideIndex based on the direction
    slideIndex += direction;

    // Apply the transform to move the carousel smoothly
    carousel.style.transition = "transform 0.5s ease"; // Enable transition
    carousel.style.transform = `translateX(-${slideIndex * slideWidth}px)`; // Move the carousel

    // After transition ends, check if we need to reset position for infinite loop
    carousel.addEventListener('transitionend', function handler() {
        carousel.removeEventListener('transitionend', handler);

        if (slideIndex >= totalSlides - 1) {
            // Reached the cloned last slide, reset to first real slide
            carousel.style.transition = "none"; // Disable transition
            slideIndex = 1;
            carousel.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
        } else if (slideIndex <= 0) {
            // Reached the cloned first slide, reset to last real slide
            carousel.style.transition = "none"; // Disable transition
            slideIndex = totalSlides - 2;
            carousel.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
        }

        // Update the slideIndex variable after reset
        if (carouselType === 'new') newSlideIndex = slideIndex;
        if (carouselType === 'trending') trendingSlideIndex = slideIndex;
    });

    // Update the slideIndex variable immediately for normal moves
    if (slideIndex > 0 && slideIndex < totalSlides - 1) {
        if (carouselType === 'new') newSlideIndex = slideIndex;
        if (carouselType === 'trending') trendingSlideIndex = slideIndex;
    }
}

function setupCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.getElementsByClassName('carousel-image');
    
    // Clone the images to create an infinite scroll effect
    const clonedSlides = Array.from(slides).map(slide => slide.cloneNode(true));

    // Append the cloned images to the end and start of the carousel for seamless loop
    clonedSlides.forEach(slide => {
        carousel.appendChild(slide); // Append cloned images at the end
    });
    Array.from(slides).reverse().forEach(slide => {
        carousel.insertBefore(slide.cloneNode(true), carousel.firstChild); // Insert clones at the start
    });

    // Set the initial position of the carousel (showing the first image, not the clone)
    const slideWidth = slides[0].clientWidth + 20;
    carousel.style.transition = "none";
    carousel.style.transform = `translateX(-${slideWidth}px)`; // Slide past the first image
}

// Call the setupCarousel function after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupCarousel('newCarousel');
    setupCarousel('trendingCarousel');
});
