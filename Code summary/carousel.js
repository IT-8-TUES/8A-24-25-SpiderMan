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
    if (direction === 1) {
        slideIndex++;
        if (slideIndex >= totalSlides) {
            // If we've reached the last image, reset to the first image (without visible jump)
            setTimeout(() => {
                carousel.style.transition = "none"; // Disable transition temporarily
                carousel.style.transform = `translateX(0)`; // Jump to the start
                slideIndex = 1; // Skip the duplicated first image
            }, 500); // Wait for the transition to complete
        }
    } else {
        slideIndex--;
        if (slideIndex < 0) {
            // If we've reached the first image, reset to the last image (without visible jump)
            setTimeout(() => {
                carousel.style.transition = "none"; // Disable transition temporarily
                carousel.style.transform = `translateX(-${(totalSlides - 1) * slideWidth}px)`; // Jump to the last image
                slideIndex = totalSlides - 2; // Skip the duplicated last image
            }, 500); // Wait for the transition to complete
        }
    }

    // Save the updated slideIndex for each carousel
    if (carouselType === 'new') newSlideIndex = slideIndex;
    if (carouselType === 'trending') trendingSlideIndex = slideIndex;

    // Apply the transform to move the carousel smoothly
    carousel.style.transition = "transform 0.5s ease"; // Re-enable transition
    carousel.style.transform = `translateX(-${slideIndex * slideWidth}px)`; // Move the carousel
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
    carousel.style.transform = `translateX(-${slides[0].clientWidth + 20}px)`; // Slide past the first image
}

// Call the setupCarousel function after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupCarousel('newCarousel');
    setupCarousel('trendingCarousel');
});