// @ts-ignore
import { socket, getUrlData } from '/includes/sharedContent'
// Change user status (offline/online/typing)
socket.on("changeUserStatus", (status, id) => {
   // i(ID)
   //recieverStatus
   if (localStorage.getItem("id") == id) return;
   var usersListStatus = document.getElementById("i" + id)
   var receiverStatus = document.getElementById("receiverStatus")
   // change status in sidebar
   var statusText = document.documentElement.lang == "ar" ? "متصل" : "Online";
   var typingText = document.documentElement.lang == "ar" ? "يكتب.." : "typing..";
   if (status == 1){
      usersListStatus.classList.add("bg-emerald-500")
   } else usersListStatus.classList.remove("bg-emerald-500")

   // if user2 got online and user1 in in thier chat, change status to online
   switch(status){
      default:
         receiverStatus.innerText = ""
         break;
      case 1:
         receiverStatus.innerText = statusText
         break;
      case 2:
         receiverStatus.innerText = typingText
         break;
   }

})