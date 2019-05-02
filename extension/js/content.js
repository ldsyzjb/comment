let config = {
    'styleClass': 'custom-style',
    style: null,
    entry: null,
    method: null,
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
function $(sel, parent){
    return parent ? parent.querySelector(sel) : document.querySelector(sel); 
}



let _location = null;
let targetEl = null;
let mask = null;
let textarea = null;


// 初始化Mask
(()=> {
    mask = `
        <div class="pop-mask">
            <textarea class="pop-input"></textarea>
            <div>
                <button class="pop-cancel">取消</button>
                <button class="pop-confirm">确认</button>
            </div>
        </div>
    `
    mask = buildHTML(mask);
    document.body.appendChild(mask);

    textarea = $('.pop-input', mask);
})()


// 初始化， 设置自定义样
function setCustomStyle(){
    let styleText = JSON.stringify(config.style).replace(/"/g, "").replace(/,/g, "; ");
    
    let elem = $("." + config.styleClass)
    if(elem){
        elem.innerHTML = '.pop-comment' + styleText;
    }else{
        let elemHTML = `<style class="custom-style">.pop-comment${styleText}</style>`;
        elem = buildHTML(elemHTML);
        document.head.appendChild(elem);
    }
}


// 处理输入信息
mask.addEventListener('click', e => {
    let className = e.target.className;
    if(className == 'pop-input'){
        return;
    }
    if(className == 'pop-confirm'){
        let text = textarea.value;
        let [offsetParent, offsetLeft, offsetTop] = getDistance(targetEl)

        let [x, y] = [_location[0] + offsetLeft, _location[1] + offsetTop];
        
        let comment = `<div class="pop-comment" style="left: ${x}px; top: ${y}px;">${text}</div>`;
            comment = buildHTML(comment);

        offsetParent.appendChild(comment)

        if(getComputedStyle(offsetParent).position == 'static'){
            offsetParent.style.position = 'relative'
        }
    }
    textarea.value = '';
    show(false);
})


function triggerHandler(e){
    if(e.type == config.method){
        _location = [e.offsetX, e.offsetY];
        targetEl = e.target; 
        if(e.type == 'dblclick'){
            show(true)
        }
    }   
}

function setCustomMethod(data){
    document.addEventListener('dblclick', triggerHandler);
    document.addEventListener('contextmenu', triggerHandler);
}


chrome.storage.local.get(null, function(data){
    Object.assign(config, data)

    setCustomStyle();
    setCustomMethod();
})

// chrome

chrome.runtime.onMessage.addListener(function(msg, origin, response){

    switch(msg.event){
        case 'trigger': show(true); break;
        case 'method' : config.method = msg.data.method; break;
        case 'entry'  : config.entry = msg.data.entry; break;
        case 'style'  : config.style = msg.data.style; setCustomStyle(); break;
        case 'print'  : print();break;
        default: console.log('not match any thing');
    }
    response({status: true})

})