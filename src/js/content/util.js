
function buildHTML(str){
    let container = document.createElement('div');
    container.innerHTML = str;
    return container.childElementCount > 1 ? container : container.firstElementChild;
}   

function queryEl(sel, parent){
    return parent ? parent.querySelector(sel) : document.querySelector(sel); 
}



export {
    buildHTML,
    queryEl
}


