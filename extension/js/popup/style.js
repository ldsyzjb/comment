import { queryEl as $, updateConfig } from './util.js';
import config from './config.js';

// 处理Style部分的效果
let color       = $('.color input')
let fontFamily  = $('.fontFamily select');
let fontSize    = $('.fontSize input')
let maxWidth    = $('.maxWidth input');
let reset       = $('.reset');
let confirm     = $('.confirm');

color.addEventListener('change', e => {
    color.nextElementSibling.innerText = color.value;
})
fontFamily.addEventListener('change', e => {
    fontFamily.nextElementSibling.style.fontFamily = fontFamily.value;
})
confirm.addEventListener('click', e => {
    let style = {
        'color': color.value,
        'font-family': fontFamily.value,
        'font-size': fontSize.value + 'px',
        'max-width': maxWidth.value + 'px'
    }
    updateConfig({style}, 'style')
})
reset.addEventListener('click', e => {
    let style = {
        'color': '#000000',
        'font-family': 'Initial',
        'font-size': 16 + 'px',
        'max-width': 220 + 'px'
    }
    updateConfig({style}, 'style')
})

config.then(function(data){
    console.log('config.then: ', data)
    let style = data.style;
    console.log(data)
    if(style){
        color.value = style.color;
        color.nextElementSibling.innerText = style.color;

        fontFamily.value = style['font-family'];
        fontFamily.nextElementSibling.style.fontFamily = style['font-family'];

        fontSize.value = parseInt(style['font-size']) ;

        maxWidth.value = parseInt(style['max-width']);
    }
})