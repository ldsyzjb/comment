import { refreshConfig } from './custom';
import { toggleShow, triggerHandler } from './comment';



chrome.runtime.onMessage.addListener(function(msg, origin, response){
    console.log('receive message', msg)

    if(msg.data){
        refreshConfig(msg.data);
    }
    switch(msg.event){
        case 'trigger': triggerHandler(true); break;
        case 'print'  : print();break;
    }
    response({status: true})
})

chrome.storage.local.get(null, refreshConfig)