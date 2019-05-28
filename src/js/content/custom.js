import { queryEl as $, buildHTML } from './util.js';
import store from './store.js';

let customStyleClass = 'custom-style'

function setCustomStyle(){
    // console.log('set custom style')
    if( !store.style ) return;
    let styleText = JSON.stringify(store.style).replace(/"/g, "").replace(/,/g, "; ");
    let elem = $("." + customStyleClass) || buildHTML('<style class="custom-style"></style>')
    elem.innerHTML = '.pop-comment' + styleText;
    document.head.appendChild(elem);
}

function refreshConfig(data){
    Object.assign(store, data);
    if(data.style){
        setCustomStyle();
    }
}

export {
    refreshConfig
}
