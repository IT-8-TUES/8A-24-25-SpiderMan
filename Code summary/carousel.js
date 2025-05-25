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

    
    const slideWidth = slides[0].clientWidth + 20;

    
    slideIndex += direction;

    
    carousel.style.transition = "transform 0.5s ease"; 
    carousel.style.transform = `translateX(-${slideIndex * slideWidth}px)`; 

    carousel.addEventListener('transitionend', function handler() {
        carousel.removeEventListener('transitionend', handler);

        if (slideIndex >= totalSlides - 1) {
            
            carousel.style.transition = "none"; 
            slideIndex = 1;
            carousel.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
        } else if (slideIndex <= 0) {
            
            carousel.style.transition = "none";
            slideIndex = totalSlides - 2;
            carousel.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
        }

        
        if (carouselType === 'new') newSlideIndex = slideIndex;
        if (carouselType === 'trending') trendingSlideIndex = slideIndex;
    });

    
    if (slideIndex > 0 && slideIndex < totalSlides - 1) {
        if (carouselType === 'new') newSlideIndex = slideIndex;
        if (carouselType === 'trending') trendingSlideIndex = slideIndex;
    }
}

function setupCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.getElementsByClassName('carousel-image');
    
    
    const clonedSlides = Array.from(slides).map(slide => slide.cloneNode(true));

    
    clonedSlides.forEach(slide => {
        carousel.appendChild(slide); 
    });
    Array.from(slides).reverse().forEach(slide => {
        carousel.insertBefore(slide.cloneNode(true), carousel.firstChild); 
    });

    
    const slideWidth = slides[0].clientWidth + 20;
    carousel.style.transition = "none";
    carousel.style.transform = `translateX(-${slideWidth}px)`; 
}


document.addEventListener('DOMContentLoaded', () => {
    setupCarousel('newCarousel');
    setupCarousel('trendingCarousel');
});
