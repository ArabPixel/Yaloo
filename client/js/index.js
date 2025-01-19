// @ts-ignore
import { socket, chatContainer, urlParams, deletedMessage, loadedMessagesCount, loadMessageBtn, updateFirstMsgIdVar, getUrlData } from '/includes/sharedContent'
// import '/includes/events/loadMoreMsgsReq'
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
            displayMessage("sent", element.msg, element.date, element.ID, element.deleted)
         } else {
            displayMessage("received", element.msg, element.date, element.ID, element.deleted)
         }
         if (element.ID == resId) loadMessageBtn.remove()
      });
      chatContainer.scrollTop = chatContainer.scrollHeight
      loadMessageBtn.remove()
      document.getElementById("chatLoading").remove();
   })
}else{
   loadMessageBtn.remove()
   document.getElementById("chatLoading").remove();
   document.getElementById("conversation").innerHTML = "<center style='margin-top: 20px;color: black;' id='noFriends'>Go ahead and add some friends!</center>";
}