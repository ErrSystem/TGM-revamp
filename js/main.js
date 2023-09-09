let scrollIndex = 0;
let cooldown = true;
window.addEventListener('wheel', event => scrollDetector(event));

const scrollDetector = event => {
    if (cooldown) {
        cooldown = false;
        if (event.deltaY == 100) {
            scrollDown();
        } else {
            scrollUp();
        }
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
}

const scrollUp = () => {
    const sliderContener = document.querySelector('.slider');
    if (scrollIndex != 0) {
        const newSlide = sliderContener.children[scrollIndex-1];
        const currentSlide = sliderContener.children[scrollIndex];
        scrollIndex--;
        sliderContener.style.animation = 'fadeOut 0.5s';
        setTimeout(() => {
            newSlide.className = '';
            currentSlide.className = 'hidden';
            sliderContener.style.opacity = 0; 
            sliderContener.style.animation = 'fadeIn 0.5s';
            setTimeout(() => {
                sliderContener.style.opacity = 1;
                cooldown = true;
            }, 500);
        }, 250);
    }
}

const scrollDown = () => {
    const sliderContener = document.querySelector('.slider');
    if (scrollIndex < sliderContener.children.length -2) {
        const newSlide = sliderContener.children[scrollIndex+1];
        const currentSlide = sliderContener.children[scrollIndex];
        scrollIndex++;
        sliderContener.style.animation = 'fadeOut 0.5s';
        setTimeout(() => {
            newSlide.className = '';
            currentSlide.className = 'hidden';
            sliderContener.style.opacity = 0; 
            sliderContener.style.animation = 'fadeIn 0.5s';
            setTimeout(() => {
                sliderContener.style.opacity = 1;
                cooldown = true;
            }, 500);
        }, 250);
    }
}