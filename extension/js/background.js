let contextMenuId;

function sendMessage(message){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        if(tabs.length == 0) return;
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}

function createContextMenu(){
    contextMenuId = chrome.contextMenus.create({
        title: "页面注释",
        onclick: function(e){
            sendMessage({event: 'trigger'});
        }
    });
}
function removeContextMenu(){
    chrome.contextMenus.remove(contextMenuId, function(){
        contextMenuId = 0;
    })
}

function contextMenuHandler(method){
    if(method == 'contextmenu' && !contextMenuId){
        createContextMenu();
    }else if(method == 'dblclick' && contextMenuId){
        removeContextMenu();
    }
}


chrome.runtime.onMessage.addListener(function(msg){
    if(msg.event == 'method'){
        contextMenuHandler(msg.data.method);
    }
})