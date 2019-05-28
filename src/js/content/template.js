import { buildHTML } from './util';


const Comment_Root = `
    <div class="th-comment">
        <div class="th-wrapper">
            <textarea class="th-textarea"></textarea>
            <div>
                <button class="th-cancel">取消</button>
                <button class="th-confirm">确认</button>
            </div>
        </div>
        <div class="th-mask"></div>
    </div>
`

function Comment(){
    return buildHTML(Comment_Root);
}

/**
 * 
 * @param {number} x left: x
 * @param {number} y top: y
 * @param {string} val innerHTML val
 * @returns Node Comment Item
 */
function Item(x, y, val){
    let comment = `<div class="pop-comment" style="left: ${x}px; top: ${y}px;">${val}</div>`;;
    return buildHTML(comment);
}

export {
    Comment,
    Item
}