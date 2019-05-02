import { queryEl as $, sendMessage} from './util.js';

$('.print').addEventListener('click', e => {
    sendMessage({event: 'print'})
})