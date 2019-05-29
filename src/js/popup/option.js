import { queryEl as $, toggleClass, updateConfig } from './util.js';
import getConfig from './config.js';


let methodElem  = $('.method');
let entryElem   = $('.entry');

getConfig.then( data => {
    if( data && data.entry == 'confirm'){
        entryElem.classList.add('right');
    }
    if( data && data.method == 'contextmenu'){
        methodElem.classList.add('right')
    }
});

$('.container', methodElem).addEventListener('click', e => {
  
    let method = toggleClass(methodElem, 'right') ? 'contextmenu' : 'dblclick';
    
    updateConfig({method}, 'method', true)
})

$('.container', entryElem).addEventListener('click', e => {

    let entry = toggleClass(entryElem, 'right') ? 'confirm' : 'newLine';
    
    updateConfig({entry}, 'entry', true)
})