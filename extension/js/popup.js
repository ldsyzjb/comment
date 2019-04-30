
let method = document.querySelector('.method');
chrome.storage.local.get('method', function(data){
    if(data.method !== 'dblClick'){
        document.querySelector('.method').classList.add('right')
    }
})

method.addEventListener('click', e => {
    let result = method.classList.toggle('right');
    let status = {method: result ? 'contextMenu' : 'dblClick'};

    chrome.storage.local.set(status)
    chrome.runtime.sendMessage(status)
})