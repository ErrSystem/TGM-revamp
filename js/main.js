let scrollIndex = 0;
let cooldown = true;
const sliderContener = document.querySelector('.slider');

window.addEventListener('wheel', event => scrollDetector(event));
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        elementsFadeIn(document.querySelector('#desc_section'));
    }, 500);
})

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
    else {

    }
}

const scrollUp = () => {
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
                elementsFadeIn(newSlide);
                elementsFadeOut(currentSlide);
            }, 500);
        }, 250);
    }
}

const scrollDown = () => {
    if (scrollIndex < sliderContener.children.length -2) {
        const newSlide = sliderContener.children[scrollIndex+1];
        const currentSlide = sliderContener.children[scrollIndex];
        sliderContener.style.animation = 'fadeOut 0.5s';
        setTimeout(() => {
            sliderContener.style.opacity = 0; 
            newSlide.className = '';
            currentSlide.className = 'hidden';
            sliderContener.style.opacity = 1; 
            setTimeout(() => {
                elementsFadeIn(newSlide);
                elementsFadeOut(currentSlide);
            }, 500);
        }, 250);
        scrollIndex++;
    }
}

const elementsFadeIn = section => {
    sliderContener.style.opacity = 1;
    Array.from(section.children).forEach(element => {
        element.style.display = 'block';
        element.style.opacity = 1;
        section.children[0].style.paddingTop = '15vh';
        section.children[0].style.marginBottom = '60px';
    });
    cooldown = true;
}

const elementsFadeOut = section => {
    Array.from(section.children).forEach(element => {
        element.setAttribute('style', '');
    })
}