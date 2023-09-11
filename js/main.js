let scrollIndex = 0;
let cooldown = true;
const sliderContener = document.querySelector('.slider');

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        elementsFadeIn(document.querySelector('#desc_section'));
    }, 500);
})

const scrollDetector = event => {
    let direction = event.deltaY;
    if (cooldown) {
        console.log('ez')
        cooldown = false;
        if (direction == 100 && scrollIndex != 3) {
            scrollDown();
        } else if(direction == -100 && scrollIndex != 0){
            scrollUp();
        }
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
    setTimeout(() => {
        cooldown = true;
    }, 500);
}

const scrollUp = () => {
    if (scrollIndex != 0) {
        const newSlide = sliderContener.children[scrollIndex-1];
        const currentSlide = sliderContener.children[scrollIndex];
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
        scrollIndex--;
        document.querySelector('body').style.overflow = 'hidden';
        document.querySelector('.scrollDown').style.opacity = '1';
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
        if (scrollIndex == 3){
            document.querySelector('footer').style.display = 'block';
            document.querySelector('body').style.overflow = 'scroll';
            document.querySelector('.scrollDown').style.opacity = '0';
        }
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
}

const elementsFadeOut = section => {
    Array.from(section.children).forEach(element => {
        element.setAttribute('style', '');
    })
}

window.addEventListener('wheel', scrollDetector);