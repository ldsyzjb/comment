import { show, queryEl as $, buildHTML } from './util.js';
import { Info, Config } from './data.js';

let Style = null,
    Entry = null,
    Method = null;

let config = {
    'styleClass': 'custom-style'
}

function setCustomStyle(){
    // console.log('set custom style')
    if(!Style) return;
    let styleText = JSON.stringify(Style).replace(/"/g, "").replace(/,/g, "; ");
    let elem = $("." + config.styleClass) || buildHTML('<style class="custom-style"></style>')
    elem.innerHTML = '.pop-comment' + styleText;
    document.head.appendChild(elem);
}

function triggerHandler(e){
    // console.log('trigger event', e, Method)
    // 当前触发的方式和设置的触发方式相同则更新Info信息
    if(e.type == Method){
        Info.position = [e.offsetX, e.offsetY];
        Info.parent = e.target;
        // dblclick方式则立即触发，否则等待右键点击触发
        if(e.type == 'dblclick'){
            show(true)
        }
    }   
}

function setConfig(data){
    Style = data.style;
    Entry = data.entry;
    Config.entry = data.entry;
    Method = data.method;
    // console.log('after setConfig', data, Method, Style)
}


// init 
// console.log('before init')
chrome.storage.local.get(null, setConfig)

chrome.runtime.onMessage.addListener(function(msg, origin, response){
    // console.log('receive message', msg)
    if(msg.data){
        setConfig(msg.data);
    }
    switch(msg.event){
        case 'trigger': show(true); break;
        case 'print'  : print();break;
        case 'style'  : setCustomStyle(); break;
    }
    response({status: true})
})

document.addEventListener('dblclick', triggerHandler);
document.addEventListener('contextmenu', triggerHandler);


