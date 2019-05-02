import { queryEl as $, uniqueClass } from './util.js';

// 处理header部分的效果
let root    = $('.root'),
    header  = $('header');
    
let changeMenu = uniqueClass(root, ['style', 'option']);
    changeMenu('style')
header.addEventListener('click', e => {
    if(e.target.nodeName == 'DIV'){
        changeMenu(e.target.dataset.name);
    }
})