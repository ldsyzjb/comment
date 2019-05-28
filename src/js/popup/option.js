import { queryEl as $, toggleClass, updateConfig } from './util.js';



let methodElem  = $('.method');
let entryElem   = $('.entry');

$('.container', methodElem).addEventListener('click', e => {
  
    let method = toggleClass(methodElem, 'right') ? 'contextmenu' : 'dblclick';
    
    updateConfig({method}, 'method', true)
})

$('.container', entryElem).addEventListener('click', e => {

    let entry = toggleClass(entryElem, 'right') ? 'confirm' : 'newLine';
    
    updateConfig({entry}, 'entry', true)
})