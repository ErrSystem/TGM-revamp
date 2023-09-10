const contenermodel = document.querySelector('.downloadContener');
let Data;
let counter = 0;
// get data
fetch("/data/mods.json")
.then(response => response.json())
.then(data => {
    data.forEach(mod => {
        let index = data.indexOf(mod);
        createContener(data[index].name, data[index].desc, data[index].img);
        if(index == data.length - 1){
            contenermodel.remove();
        }
    });
})
.catch(error => createContener('Error', 'Failed to get data: '+ error));

const createContener = (name, desc, img) => {
    const newContener = contenermodel.cloneNode(true);
    newContener.children[0].innerText = name;
    newContener.children[1].src = img;
    newContener.children[2].innerText = desc;
    switch (counter) {
        case 0:
            newContener.className = 'downloadContener first';
        break;
        case 1:
            newContener.className = 'downloadContener second';
        break;
        case 2:
            newContener.className = 'downloadContener third';
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
    const shownConteners = conteners.filter(element => element.className != 'downloadContener hidden');
    for (let i = 0; i < shownConteners.length; i++) {
        console.log(i);
        switch (shownConteners[i].className) {
            case 'downloadContener first':
                console.log('first');
                shownConteners[i].className = 'downloadContener third';
            break;
            case 'downloadContener second':
                console.log('second')
                shownConteners[i].className = 'downloadContener first';
            break;
            case 'downloadContener third':
                console.log('third')
                shownConteners[i].style.display = 'none';
                shownConteners[i].className = 'downloadContener hidden';
                let nextIndex = conteners.indexOf(shownConteners[i]) + 1;
                if (nextIndex == conteners.length){
                    nextIndex = 0;
                }
                conteners[nextIndex].className = 'downloadContener second';
                conteners[nextIndex].style.display = 'block';
            break;
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