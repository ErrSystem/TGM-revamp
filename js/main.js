let scrollIndex = 0;
let cooldown = true;
let touchStart;
const sliderContener = document.querySelector('.slider');

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        elementsFadeIn(document.querySelector('#desc_section'));
    }, 1000);
})

const wheelDetector = event => {
    cooldown = false;
    let direction = Math.sign(event.deltaY);
    if (direction == 1 && scrollIndex != 4) {
        scrollDown();
    } else if(direction == -1 && scrollIndex != 0){
        scrollUp();
    }
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    setTimeout(() => {
        cooldown = true;
    }, 1500);
}

const touchDetector = event => {
    if (cooldown) {
        let CurrentY = event.changedTouches[0].clientY;
        let direction = CurrentY > touchStart ? "up" : "down";
        if (direction == 'down' && scrollIndex != 4) {
            scrollDown();
            cooldown = false;
        } else if (direction == 'up' && scrollIndex != 0){
            scrollUp();
            cooldown = false;
        }
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
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

window.addEventListener('wheel', event => {
    if (cooldown) {
        wheelDetector(event);
        cooldown = false;
    }
});
window.addEventListener('touchstart', e => {
    if (cooldown) {
        touchStart = e.touches[0].clientY
    }
});
window.addEventListener('touchmove', touchDetector);
window.addEventListener('touchend', () => {
    setTimeout(() => {
        cooldown = true;
    }, 500);
});
document.querySelector('.scrollDown').addEventListener('click', scrollDown);