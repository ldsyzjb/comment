
    function queryEl(sel, parent){ return parent ? parent.querySelector(sel) : document.querySelector(sel); }
    function hide(){ document.body.className = document.body.className.replace(/pop-active/g, '')}
    function show(){ if(!document.body.className.match(/pop-active/)) document.body.className += ' pop-active'; }
    
    function buildHTML(str){
        let container = document.createElement('div');
        container.innerHTML = str;
        if(container.childElementCount > 1){
            
        }
        return container.childElementCount > 1 ? container : container.firstElementChild;
    }
    
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
