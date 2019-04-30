
function sendMessageToContentScript(message, callback){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, message, function(response){
            if(callback) callback(response);
        });
    });
}

function createContextMenu(){
    return chrome.contextMenus.create({
        title: "页面注释",
        onclick: function(e){
            sendMessageToContentScript({create: true});
        }
    });
}


let contextMenuId;

chrome.storage.local.get('method', function(data){
    if(data.method == 'contextMenu'){
        contextMenuId = createContextMenu();
    }
})

chrome.runtime.onMessage.addListener(function(data){
    if(data.method == 'contextMenu' && !contextMenuId){
        contextMenuId = createContextMenu();
    }else if(data.method == 'dblClick'){
        chrome.contextMenus.remove(contextMenuId, function(){
            contextMenuId = 0;
        });
    }
})