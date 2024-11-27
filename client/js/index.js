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
import { displayMessage } from '../includes/functions/displayMsg'


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
            displayMessage("sender", element.msg, element.date, element.ID)
         } else {
            displayMessage("receiver", element.msg, element.date, element.ID)
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