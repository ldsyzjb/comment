
    function queryEl(sel, parent){
        return parent ? parent.querySelector(sel) : document.querySelector(sel); 
    }
    function toggleClass(elem, className){
        if(elem.classList){
            return elem.classList.toggle(className);
        }
        throw new Error('this element has no classlist')
    }
    function uniqueClass(elem, classList){
        let reg = new RegExp(classList.join('|'), 'ig');
        return function(className){
            let newClass = elem.className.replace(reg, '').replace(/ +/g, '');
                elem.className = newClass + ' ' + className;
        }
    }

    /**
     * send msg to content.js
     * @param {object} message 
     */
    function sendMessage(message){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            if(tabs.length == 0) return;
            chrome.tabs.sendMessage(tabs[0].id, message, function(res){
                if(res && res.status === true){
                    alert('update success')
                }else{
                    alert(typeof res == 'object' ? JSON.stringify(res) : res)
                }
            });
        });
    }
    
    /**
     * send msg to not content.js(background.js)
     * @param {object} message 
     */
    function sendMessage2(message){
        chrome.runtime.sendMessage(message)
    }

    /**
     * 
     * @param { obj } config 
     * @param { string } eventName 
     * @param { boolean } toAll 是否发送消息到后台 
     */
    function updateConfig(config, eventName, toAll){
        chrome.storage.local.set(config, function(){
            let obj = {
                event: eventName,
                data: config
            }
            sendMessage(obj)
            if(toAll) sendMessage2(obj);
        })
    }

    export  {
        queryEl,
        toggleClass,
        uniqueClass,
        updateConfig,
        sendMessage
    }