const layoutImages = document.querySelectorAll('.imgLayout');
const images = document.querySelectorAll('.image');
let imgNum = 0;

const slideImage = (index) => {
    if (index > images.length) {imgNum = 1}
    if (index < 1) {imgNum = images.length}

    for (let i = 0; i < images.length; i++) {
        images[i].style.display = 'none';
    }
    images[imgNum-1].style.display = 'block';
    console.log(imgNum);
}

const nextAndPrev = (e) => {
    slideImage(imgNum += e);
}

const showImage = (n) => {
    document.querySelector('.noneDisplay').style.display = 'block';
    document.querySelector('#nav').style.zIndex = '-1';
    document.querySelector('#main').style.zIndex = '-1';
    imgNum = n;
    slideImage(imgNum);
}

const closeImage = () => {
    document.querySelector('.noneDisplay').style.display = 'none';
    document.querySelector('#nav').style.zIndex = '1';
    document.querySelector('#main').style.zIndex = '1';
}