// @ts-ignore
import { socket, chatContainer, urlParams, deletedMessage, loadedMessagesCount, loadMessageBtn, updateFirstMsgIdVar, getUrlData } from '/includes/sharedContent'
import '/includes/events/loadMoreMsgsReq'
import '/includes/events/keyup'
import '/includes/events/keydown'
import '/includes/events/onload'
import '/includes/events/click'
import '/includes/events/window'
import '/includes/events/focus'
import '/includes/socketEvents/loadMoreMsgs'
import '/includes/socketEvents/connect'
import '/includes/socketEvents/msgReceive'
import '/includes/socketEvents/statusChanger'
import '/includes/socketEvents/msgDeleted'
import '/includes/socketEvents/removeFriend'
import '/includes/socketEvents/addFriends'
import '/includes/socketEvents/contactList'


// load msgs when joining someone's chat
if (urlParams.get("id")) {
   socket.emit("get msgs from db", getUrlData("id"), localStorage.getItem("id"), loadedMessagesCount);
   socket.on("here msgs from db", (res1, res2, resId) => {
      let receiverName = document.getElementById("receiverName")
      let receiverStatus = document.getElementById("receiverStatus")

      if (resId != undefined){
         updateFirstMsgIdVar(resId)
      }else{
         loadMessageBtn.remove();
      }

      if (receiverName && receiverStatus){
         receiverName.innerText = res2[0].Username;
         receiverStatus.innerText = res2[0].Status;
      }

      res1.forEach(element => {
         if (element.from_id == localStorage.getItem("id")) {
            chatContainer.innerHTML += '<div class="row message-body">' +
               '<div class="col-sm-12 message-main-sender">' +
               '<div class="sender" id="sender'+element.ID+'">' +
               '<div class="message-text" id="msg'+element.ID+'"></div>' +
               '<span class="message-time pull-right">' + element.date + '</span>';
               if (element.deleted == false){
                  let senderMsg = document.getElementById("sender" + element.ID)
                  if (senderMsg) senderMsg.innerHTML += '<button style="float: right;" type="button" class="delete-button" id="delbtn delbtn'+element.ID+'">Delete</button>'
               }
               chatContainer.innerHTML +=
               '</div>' +
               '</div>' +
               '</div>';
               if (element.deleted){
                  let msgElement = document.getElementById("msg" + element.ID)
                  if (msgElement) msgElement.innerHTML = "<em>" + "You " + deletedMessage + "</em>"
               }else{
                  let msgElement = document.getElementById("msg" + element.ID)
                  if (msgElement) msgElement.textContent = element.msg
               }
         } else {
            chatContainer.innerHTML += '<div class="row message-body">' +
               '<div class="col-sm-12 message-main-receiver">' +
               '<div class="receiver">' +
               '<div class="message-text" id="msg'+element.ID+'"></div>' +
               '<span class="message-time pull-right">' + element.date + '</span>' +
               '</div>' +
               '</div>' +
               '</div>';
               if (element.deleted){
                  let msgElement = document.getElementById("msg" + element.ID)
                  if (msgElement) msgElement.innerHTML = "<em>" + res2[0].Username + " " + deletedMessage + "</em>"
               }else{
                  let msgElement = document.getElementById("msg" + element.ID)
                  if (msgElement) msgElement.textContent = element.msg
               }
         }
         if (element.ID == resId) loadMessageBtn.remove()
      });
      chatContainer.scrollTop = chatContainer.scrollHeight
   })
}else{
   loadMessageBtn.remove()
}

//Groups (Future Update)

// function makegroup(){
//    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
//    let selectedCheckboxes = [];
      
//    checkboxes.forEach(checkbox => {
//          if(checkbox.checked) {
//             selectedCheckboxes.push(checkbox.value);
//          }
//    });  
//    if (selectedCheckboxes != null || selectedCheckboxes != undefined){
//       var groupName = prompt("Type below the group name..")
//       if(groupName) socket.emit("create group", selectedCheckboxes, groupName, localStorage.getItem("id"), localStorage.getItem("username"))
//    }
// }