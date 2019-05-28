import { Item as CommentItem, Comment } from './template';
import { queryEl as $} from './util';
import store from './store';

function getNotScrollParent(el){
    return getComputedStyle(el).overflow !== 'visible' ? el : getNotScrollParent(el.parentElement) 
}
function getOffsetToBody(el){
    let current = el;
    let x = 0;
    let y = 0;

    while(current.offsetParent){
        x += current.offsetLeft;
        y += current.offsetTop;
        current = current.offsetParent;
    }
    return [x, y]
}``
function getOffsetToParent(el){
    // offsetparent 和 position有什么关系
    let parent = getNotScrollParent(el);
    let a = getOffsetToBody(el);
    let b = getOffsetToBody(parent)
    return [parent, a[0] - b[0], a[1] - b[1]];
}
function setRelative(elem){
    if( getComputedStyle(elem).position === 'static' ){
        elem.style.position = 'relative';
    }
}
function onComment(){
    let text = textarea.value;
    let [parent, left, top] = getOffsetToParent(store.parent);
    let [x, y] = store.position;
        x = x + left;
        y = y + top;
    let comment = CommentItem(x, y, text);

    parent.appendChild(comment);
    setRelative(parent);
    onClose();
}
function onClose(){
    toggleShow(false);  
    textarea.value = '';
}
function onKeyDown(e){
    if( store.entry == 'confirm' && e.key == 'Enter'){
        confirm.click();
    }
}
function toggleShow(bool){
    if(bool === true){
        document.body.classList.add('th-comment-active')
    }else{
        document.body.classList.remove('th-comment-active')
    }
}

function triggerHandler(e){
    // console.log('trigger event', e, Method)
    // 当前触发的方式和设置的触发方式相同则更新信息
    console.log(e, store)
    if(e.type == store.method){
        store.position = [e.offsetX, e.offsetY];
        store.parent = e.target;
        // dblclick方式则立即触发，否则等待右键点击触发
        if(e.type == 'dblclick'){
            toggleShow(true)
        }
    }   
}

let Editor = Comment();
    document.body.appendChild(Editor);

let textarea    = $('.th-textarea', Editor);
let confirm     = $('.th-confirm', Editor);
let cancel      = $('.th-cancel', Editor);

confirm.addEventListener('click', onComment)
cancel.addEventListener('click', onClose)
textarea.addEventListener('keydown', onKeyDown)

document.addEventListener('dblclick', triggerHandler);
document.addEventListener('contextmenu', triggerHandler);



export {
    toggleShow,
    triggerHandler
}