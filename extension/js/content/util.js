function getParent(el){
    return getComputedStyle(el).overflow !== 'visible' ? el : getParent(el.parentElement) 
}
function getOffset(el){
    let [x, y] = [0, 0];
    let current = el;
    while(true){
        if(current.offsetParent){
            x += current.offsetLeft;
            y += current.offsetTop;
            current = current.offsetParent;
        }
        break;
    }
    return [x, y]
}
function getDistance(el){
    
    let parent = getParent(el);
    let a = getOffset(el);
    let b = getOffset(parent)
    return [parent, a[0]-b[0], a[1] - b[1]];
}
function show(bool){
    if(bool === true){
        document.body.classList.add('pop-active')
    }else{
        document.body.classList.remove('pop-active')
    }
}
function buildHTML(str){
    let container = document.createElement('div');
    container.innerHTML = str;
    return container.childElementCount > 1 ? container : container.firstElementChild;
}   

function queryEl(sel, parent){
    return parent ? parent.querySelector(sel) : document.querySelector(sel); 
}



export {
    show,
    buildHTML,
    queryEl,
    getDistance
}


