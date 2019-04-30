(()=>{
    // 初始化，创建Mask
    let mask = `
        <div class="pop-mask">
            <textarea class="pop-input"></textarea>
            <div>
                <button class="pop-cancel">取消</button>
                <button class="pop-confirm">确认</button>
            </div>
        </div>
    `
        mask = buildHTML(mask);
        document.body.appendChild(mask);

    let textarea = queryEl('.pop-input', mask);
    let location = null;
    let targetEl = null;


    // 初始化， 设置自定义样式
    chrome.storage.local.get('style', function(data){
        if(Object.keys(data.style || {}).length == 0) return;

        let styleText = '';
        for(let i in data.style){
            styleText += `${i}: ${data.style[i]};`
        }
        let customStyle = `<style>.pop-comment{${styleText}}</style>`
            customStyle = buildHTML(customStyle)
        document.head.appendChild(customStyle)
    })


    // 处理输入信息
    mask.addEventListener('click', e => {
        let className = e.target.className;
        if(className == 'pop-input'){
            return;
        }
        if(className == 'pop-confirm'){
            let text = textarea.value;
            let [offsetParent, offsetLeft, offsetTop] = getDistance(targetEl)

            let [x, y] = [location[0] + offsetLeft, location[1] + offsetTop];
            
            let comment = `<div class="pop-comment" style="left: ${x}px; top: ${y}px;">${text}</div>`;
                comment = buildHTML(comment);

            offsetParent.appendChild(comment)

            if(getComputedStyle(offsetParent).position == 'static'){
                offsetParent.style.position = 'relative'
            }
        }
        textarea.value = '';
        hide();
    })
    
    chrome.storage.local.get('method', function(data){
        if(data.method == 'dblClick'){
            document.addEventListener('dblclick', e => {
                location = [e.offsetX, e.offsetY];
                targetEl = e.target;

                show();
            })
        }else{
            // 点击右键时获取点击的信息；
            document.addEventListener('contextmenu', function(  e){
                location = [e.offsetX, e.offsetY]
                targetEl = e.target;
            })
            
            // 右键点击选择注释时触发显示框
            chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
                if(request.create === true ) show();
            });
        }
    })


    setTimeout(() => {
        
    }, 2000);
})();