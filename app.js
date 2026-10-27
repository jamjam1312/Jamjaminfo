(() => {
'use strict';
const open=document.getElementById('more-button');
const modal=document.getElementById('more-dialog');
const close=document.getElementById('close-details');
if(!open||!modal||!close)return;
open.addEventListener('click',()=>modal.showModal());
close.addEventListener('click',()=>modal.close());
modal.addEventListener('click',event=>{
 const rect=modal.getBoundingClientRect();
 if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)modal.close();
});
})();