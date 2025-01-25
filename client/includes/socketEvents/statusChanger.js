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
   if (status == "Online"){
      usersListStatus.classList.add("bg-emerald-500")
   } else usersListStatus.classList.remove("bg-emerald-500")

   // if user2 got online and user1 in in thier chat, change status to online
   if (getUrlData("id") && getUrlData("id") == id) {
      if (receiverStatus && status == "Online"){
          receiverStatus.innerText = statusText
      }else receiverStatus.innerText = ""
   }

})