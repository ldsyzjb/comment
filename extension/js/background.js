let contextMenuId;

/**
 *  发送消息给当前页面
 * @param {object} message 
 */
function sendMessage(message){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        if(tabs.length == 0) return;
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}

/**
 * 创建右键菜单
 */
function createContextMenu(){
    contextMenuId = chrome.contextMenus.create({
        title: "页面注释",
        onclick: function(e){
            sendMessage({event: 'trigger'});
        }
    });
}
/**
 * 删除右键菜单
 */
function removeContextMenu(){
    chrome.contextMenus.remove(contextMenuId, function(){
        contextMenuId = 0;
    })
}

/**
 * 对于使用不同的method进行对菜单的处理
 * @param {string} method method方法
 */
function contextMenuHandler(method){
    if(method == 'contextmenu' && !contextMenuId){
        createContextMenu();
    }else if(method == 'dblclick' && contextMenuId){
        removeContextMenu();
    }
}



/*
    pop页面进行设置，给background发送对应消息进行处理（是否启用右键）
    当method为contextmenu，且点击右键时给content发送trigger事件
*/
chrome.runtime.onMessage.addListener(function(msg){
    if(msg.event == 'method'){
        contextMenuHandler(msg.data.method);
    }
})


// init
chrome.storage.local.get('method', function(data){
    contextMenuHandler(data.method);
})