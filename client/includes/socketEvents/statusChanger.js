// @ts-ignore
import { socket, getUrlData } from '/includes/sharedContent'
// Change user status (offline/online/typing)
socket.on("changeUserStatus", (status, id) => {
   // i(ID)
   //recieverStatus
   var usersListStatus = document.getElementById("i" + id)
   var receiverStatus = document.getElementById("receiverStatus")
   // change status in sidebar
   if (usersListStatus) usersListStatus.innerText = status;
   // if user2 got online and user1 in in thier chat, change status to online
   if (getUrlData("id") && getUrlData("id") == id) {
      if (receiverStatus) receiverStatus.innerText = status
   }
})