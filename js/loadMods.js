const contenermodel = document.querySelector('.downloadContener');
let Data;
let counter = 0;
// get data
fetch("data/mods.json")
.then(response => response.json())
.then(data => {
    data.forEach(mod => {
        let index = data.indexOf(mod);
        createContener(data[index].name, data[index].desc, data[index].img, data[index].after);
        if(index == data.length - 1){
            contenermodel.remove();
        }
    });
})
.catch(error => createContener('Error', 'Failed to get data: '+ error));

const createContener = (name, desc, img, after) => {
    const newContener = contenermodel.cloneNode(true);
    newContener.name = after;
    newContener.children[0].innerText = name;
    newContener.children[1].src = img;
    newContener.children[2].innerText = desc;
    switch (counter) {
        case 0:
            newContener.id = 'first';
        break;
        case 1:
            newContener.id = 'second';
        break;
        case 2:
            newContener.id = 'third';
        break;
    }
    if (counter > 2) {
        newContener.className = 'downloadContener hidden';
    }
    document.querySelector('#mods_section').insertAdjacentElement('beforeend', newContener);
    counter++;
}

const changePositions = () => {
    const conteners = Array.from(document.getElementsByClassName('downloadContener'));
    const shownConteners = [document.querySelector('#first'), document.querySelector('#second'), document.querySelector('#third')];
    for (let i = 0; i < shownConteners.length; i++) {
        if (i == 0) {
            shownConteners[i].id = 'third';
        } else if (i == 1) {
            shownConteners[i].id = 'first';
        } else if (i == 2) {
            let nextIndex = shownConteners[i].name;
            shownConteners[i].style.display = 'none';
            shownConteners[i].id = '';
            shownConteners[i].className = 'downloadContener hidden';
            conteners[nextIndex].id = 'second';
            conteners[nextIndex].className = 'downloadContener';
            conteners[nextIndex].style.display = 'block';
        }
    }
}

setInterval(() => {
    changePositions();
}, 5000);

setInterval(() => {
    const origin = Array.from(document.querySelector('#mods_section').children);
    const conteners = Array.from(origin.filter(element => element.className == 'downloadContener hidden'));
    conteners.forEach(element => element.style.display = 'none')
}, 10);