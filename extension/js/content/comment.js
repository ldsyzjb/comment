import { queryEl as $, buildHTML, getDistance, show } from './util.js';
import { Info } from './data.js';

// 初始化Mask
let mask = buildHTML(`
    <div class="pop-mask">
        <textarea class="pop-input"></textarea>
        <div>
            <button class="pop-cancel">取消</button>
            <button class="pop-confirm">确认</button>
        </div>
    </div>
`);
    document.body.appendChild(mask);

let textarea = $('.pop-input', mask);


// 处理输入信息
mask.addEventListener('click', e => {
    let className = e.target.className;
    if(className == 'pop-input'){
        return;
    }
    if(className == 'pop-confirm'){
        
        let parent = Info.parent,
            position = Info.position;

        let text = textarea.value;
        let [offsetParent, offsetLeft, offsetTop] = getDistance(parent)

        let [x, y] = [position[0] + offsetLeft, position[1] + offsetTop];
        
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
