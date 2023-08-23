// @ts-ignore
import { socket } from '/includes/sharedContent'
// receive delete request from friend and delete 
socket.on("message deleted", (msgId, senderName) => {
   if (document.getElementById("msg" + msgId)) {
      var deleterName = senderName == localStorage.getItem("username") ? "You" : senderName
      let msgElement = document.getElementById("msg" + msgId)
      if (msgElement) {
         msgElement.innerHTML = "<em>" + deleterName + " Deleted this Message</em>"
      }
   }
})