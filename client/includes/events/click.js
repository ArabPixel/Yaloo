// @ts-ignore
import { socket, sendBtn, input, getUrlData, addFriendBtn, langBtn } from '/includes/sharedContent';
// @ts-ignore
import { addFriend } from '/includes/functions/addFriend';
// @ts-ignore
import { typingTimeOut } from '/includes/functions/typingIndicator'

// @ts-ignore
import { removeFriend } from '/includes/functions/removeFriend'

const deleteFriendBtn = document.getElementById("deleteFriendBtn")

//send message code
sendBtn.addEventListener("click", () => {
   var message = input.value;

   // if msg isnt empty and not messaging yourself
   if (message.trim().length > 0 && getUrlData("id") != localStorage.getItem("id") && getUrlData("id") != null && getUrlData("id") > 0) {
      socket.emit("sent message", message, getUrlData("id"), localStorage.getItem("id"));
      input.value = "";
      input.focus();
      typingTimeOut()
   }
});

addFriendBtn.addEventListener("click", () => {
   let friendName = document.getElementById("friendName")
   if (friendName == null) return
   // @ts-ignore
   if (friendName.value == null && friendName.value <= 3) return
   addFriend(friendName)
})

langBtn.addEventListener('click', () => {
   //    if (langBtn.value == "ar"){ 
   //       langBtn.value = 2
   //    }
   switch (langBtn.innerHTML) {

      case "AR": {
         langBtn.innerHTML = "EN"
         break
      }
      case "EN": {
         langBtn.innerHTML = "AR"
         break
      }
   }
})

deleteFriendBtn?.addEventListener('click', () => {
   if(getUrlData("id") == null && getUrlData("id") == undefined) return
   removeFriend(getUrlData("id"))
})