!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(e){let[t,n]=[0,0],r=e;for(;;){r.offsetParent&&(t+=r.offsetLeft,n+=r.offsetTop,r=r.offsetParent);break}return[t,n]}function o(e){let t=function e(t){return"visible"!==getComputedStyle(t).overflow?t:e(t.parentElement)}(e),n=r(e),o=r(t);return[t,n[0]-o[0],n[1]-o[1]]}function i(e){!0===e?document.body.classList.add("pop-active"):document.body.classList.remove("pop-active")}function l(e){let t=document.createElement("div");return t.innerHTML=e,t.childElementCount>1?t:t.firstElementChild}function u(e,t){return t?t.querySelector(e):document.querySelector(e)}let c,s;n.r(t);let a,p={get position(){return c},set position(e){c=e},get parent(){return s},set parent(e){s=e}},d={get entry(){return a},set entry(e){a=e}},f=l('\n    <div class="pop-mask">\n        <textarea class="pop-input"></textarea>\n        <div>\n            <button class="pop-cancel">取消</button>\n            <button class="pop-confirm">确认</button>\n        </div>\n    </div>\n');document.body.appendChild(f);let y=u(".pop-input",f);f.addEventListener("click",e=>{let t=e.target.className;if("pop-input"!=t){if("pop-confirm"==t){let e=p.parent,t=p.position,n=y.value,[r,i,u]=o(e),[c,s]=[t[0]+i,t[1]+u],a=`<div class="pop-comment" style="left: ${c}px; top: ${s}px;">${n}</div>`;a=l(a),r.appendChild(a),"static"==getComputedStyle(r).position&&(r.style.position="relative")}y.value="",i(!1)}}),y.addEventListener("keydown",e=>{"confirm"==d.entry&&"Enter"==e.key&&u(".pop-confirm").click()});let m=null,v=null,b=null,g={styleClass:"custom-style"};function h(e){e.type==b&&(p.position=[e.offsetX,e.offsetY],p.parent=e.target,"dblclick"==e.type&&i(!0))}function k(e){m=e.style,v=e.entry,d.entry=e.entry,b=e.method}chrome.storage.local.get(null,k),chrome.runtime.onMessage.addListener(function(e,t,n){switch(e.data&&k(e.data),e.event){case"trigger":i(!0);break;case"print":print();break;case"style":!function(){if(!m)return;let e=JSON.stringify(m).replace(/"/g,"").replace(/,/g,"; "),t=u("."+g.styleClass)||l('<style class="custom-style"></style>');t.innerHTML=".pop-comment"+e,document.head.appendChild(t)}()}n({status:!0})}),document.addEventListener("dblclick",h),document.addEventListener("contextmenu",h)}]);