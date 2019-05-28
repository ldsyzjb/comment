
function getConfig(){
    return new Promise(function(res){
        chrome.storage.local.get(null, function(data){
            res(data)
        })
    })
}

export default getConfig();