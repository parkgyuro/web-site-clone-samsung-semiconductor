const observerItem = document.querySelectorAll('.observer-ready');
const ACTIVE = 'active';

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

window.addEventListener('load', () => {
    setTransition();
})