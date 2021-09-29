const carouselWrapper = document.querySelector('.carousel-nav');
const carouselContainer = document.querySelector('.carousel-img-wrapper');
const carouselLodingBar = document.querySelectorAll('.carousel-loading-bar');
const carouselPlayBtn = document.querySelector('.carousel-play-btn');
const thirdCardFirstSection = document.querySelector('.third-card-first-section')
const thirdCardSecondSection = document.querySelector('.third-card-second-section')
const thirdCardFirstSectionContainer = document.querySelector('.third-card-first-section-item-wrapper');
const thirdCardSecondSectionContainer = document.querySelector('.third-card-second-section-item-wrapper');
const thirdCardFirstSectionLists = document.querySelector('.first-carousel-nav-container');
const thirdCardSecondSectionLists = document.querySelector('.second-carousel-nav-container');
const thirdCardFirstSectionList = document.querySelectorAll('.first-carousel-nav-container li');
const thirdCardSecondSectionList = document.querySelectorAll('.second-carousel-nav-container li');
const forthCardItemWrapper = document.querySelector('.forth-card-section');
const forthCardItemContainer = document.querySelector('.forth-card-item-container');
const subMenuBtn = document.querySelector('.sub-menu-btn');
const subMenuCancelBtn = document.querySelector('.cancel-btn');
const subMenuBg = document.querySelector('.sub-menu-bg');

const observerItem = document.querySelectorAll('.observer-ready');
const ACTIVE = 'active';

let carouselTransformValue = 0;
let loadingBarValue = 0;
let carouselIndex = 0;
let cancelCarouselAnimate;
let thirdCardTransitionValue = 0;
let forthCardTransitionValue = 0;

function setInit(){
    for(let i=0; i<thirdCardFirstSectionList.length; i++){
        thirdCardFirstSectionList[i].dataset.index = i;
        thirdCardSecondSectionList[i].dataset.index = i;
    }
}

function setTransition(){
    const io = new IntersectionObserver((item, observer) => {
        let target;
        for(let i=0; i<item.length; i++){
            target = item[i].target
            if(item[i].isIntersecting){
                target.classList.add(ACTIVE);
            }
            else{
                target.classList.remove(ACTIVE);
            }
        }
    });
    
    for(let i=0; i<observerItem.length; i++){
        io.observe(observerItem[i]);
    }
}
function resetLodingBar(){
    loadingBarValue = 0;
    carouselLodingBar[carouselIndex].style.right = `100%`;
}
function carouselClickHandler(target){
    if(target.classList.contains('right-btn')){
        carouselTransformValue -= 100;
        if(carouselTransformValue === -300){
            carouselTransformValue = 0;
        }
        resetLodingBar();
    }
    else if(target.classList.contains('left-btn')){
        carouselTransformValue += 100;
        if(carouselTransformValue === 100){
            carouselTransformValue = -200;
        }
        resetLodingBar();
    }

    carouselTransform(carouselTransformValue);
}

function carouselTransform(carouselTransformValue){
    carouselContainer.style.transform = `translateX(${carouselTransformValue}%)`;
}

function animateCarouselLodingbar(){   
    carouselLodingBar[carouselIndex].style.right = `${100 - loadingBarValue}%`;
    loadingBarValue += 0.2;

    cancelCarouselAnimate = requestAnimationFrame(animateCarouselLodingbar);

    if(loadingBarValue > 100){
        carouselTransformValue -= 100;
        if(carouselTransformValue === -300){
            carouselTransformValue = 0;
        }
        carouselTransform(carouselTransformValue);
        loadingBarValue = 0;
        carouselLodingBar[carouselIndex].style.right = `100%`;
        carouselIndex += 1;
        if(carouselIndex === 3){
            carouselIndex = 0;
        }
    }
}

function carouselPlayBtnHandler(){
    carouselPlayBtn.addEventListener('click', () => {
        if(carouselPlayBtn.classList.contains(ACTIVE)){
            carouselPlayBtn.classList.remove(ACTIVE);
            cancelAnimationFrame(cancelCarouselAnimate);
        }
        else{
            carouselPlayBtn.classList.add(ACTIVE);
            requestAnimationFrame(animateCarouselLodingbar);
        }
    });
}
function thirdCardTransform(thirdCardTransitionValue, container){
    container.style.transform = `translateX(${thirdCardTransitionValue}%)`;
}

function ThirdCardNextBtnHandler(target, container){
    if(target.classList.contains('right-btn')){
        thirdCardTransitionValue -= 100;
        if(thirdCardTransitionValue === -300){
            thirdCardTransitionValue = 0;
        }
        thirdCardTransform(thirdCardTransitionValue, container);
    }
    else if(target.classList.contains('left-btn')){
        thirdCardTransitionValue += 100;
        if(thirdCardTransitionValue === 100){
            thirdCardTransitionValue = -200;
        }
        thirdCardTransform(thirdCardTransitionValue, container);
    }
}
function forthCardTransform(forthCardTransitionValue){
    forthCardItemContainer.style.transform = `translateX(${forthCardTransitionValue}%)`
}
function forthCardNextBtnHandler(target){
    if(target.classList.contains('right-btn')){
        forthCardTransitionValue -= 100;
        if(forthCardTransitionValue === -300){
            forthCardTransitionValue = 0;
        }
    }
    else if(target.classList.contains('left-btn')){
        forthCardTransitionValue += 100;
        if(forthCardTransitionValue === 100){
            forthCardTransitionValue = -200;
        }
    }
    forthCardTransform(forthCardTransitionValue);
}

thirdCardFirstSection.addEventListener('click', (e) => {
    let target = e.target;

    ThirdCardNextBtnHandler(target, thirdCardFirstSectionContainer);
});
thirdCardSecondSection.addEventListener('click', (e) => {
    let target = e.target;

    ThirdCardNextBtnHandler(target, thirdCardSecondSectionContainer);
});
thirdCardFirstSectionLists.addEventListener('click', (e) => {
    let target = e.target;
    let index = target.dataset.index;
    if(index){
        thirdCardTransitionValue = (index * -100);
    }
    thirdCardTransform(thirdCardTransitionValue, thirdCardFirstSectionContainer);
})
thirdCardSecondSectionLists.addEventListener('click', (e) => {
    let target = e.target;
    let index = target.dataset.index;
    if(index){
        thirdCardTransitionValue = (index * -100);
    }
    thirdCardTransform(thirdCardTransitionValue, thirdCardSecondSectionContainer);
});

forthCardItemWrapper.addEventListener('click', (e) => {
    let target = e.target;

    forthCardNextBtnHandler(target);
})

carouselWrapper.addEventListener('click', (e) => {
    let target = e.target;
    
    carouselClickHandler(target);
    
    switch(carouselTransformValue){
        case 0 : carouselIndex = 0;
        break;
        case -100 : carouselIndex = 1;
        break;
        case -200 : carouselIndex = 2;
        break;
    }
});

subMenuBtn.addEventListener('click', () => {
    document.body.classList.add(ACTIVE);
});
subMenuCancelBtn.addEventListener('click', () => {
    document.body.classList.remove(ACTIVE);
});
subMenuBg.addEventListener('click', () => {
    document.body.classList.remove(ACTIVE);
})

window.addEventListener('load', () => {
    setTransition();
    animateCarouselLodingbar();
    carouselPlayBtnHandler();
    setInit();
});