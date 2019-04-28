// import './index.scss'

(() => {

    function queryEl(sel, parent){ return parent ? parent.querySelector(sel) : document.querySelector(sel); }
    function hide(){ document.body.className = document.body.className.replace(/pop-active/g, '')}
    function show(){ if(!document.body.className.match(/pop-active/)) document.body.className += ' pop-active'; textarea.focus(); }


    let mask = `
        <div class="pop-mask">
            <textarea class="pop-input"></textarea>
            <div>
                <button class="pop-cancel">取消</button>
                <button class="pop-confirm">确认</button>
            </div>
        </div>
    `
    let temp = document.createElement('div');
        temp.innerHTML = mask;
        mask = temp.children[0];

    let textarea = queryEl('.pop-input', mask);
    let location = null;

    // 处理输入信息
    mask.addEventListener('click', e => {
        let className = e.target.className;
        if(className == 'pop-input'){
            return;
        }
        if(className == 'pop-confirm'){
            let text = textarea.value;
            let [x, y] = location;
            let comment = document.createElement('div')
                comment.className = 'pop-comment'
                comment.style.left  = x + 'px';
                comment.style.top   = y + 'px';
                comment.innerText   = text;
            document.body.appendChild(comment)
        }

        textarea.value = '';
        hide();
    })

    document.body.appendChild(mask)
    document.addEventListener('contextmenu', function(e){
        if(e.button === 2){
            location = [e.pageX, e.pageY];
        }
    })
    
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        if(request.create === true ) show();
        // sendResponse('我收到了你的消息！');
    });
})();


