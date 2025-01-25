// @ts-ignore
import { socket, sendBtn, input, getUrlData, friendInput, addFriendBtn, deleteFriendBtn, langBtn } from '/includes/sharedContent';
// @ts-ignore
import { addFriend } from '/includes/functions/addFriend';
// @ts-ignore
import { typingTimeOut } from '/includes/functions/typingIndicator'
import { switchLang } from '/includes/functions/changeLang';
// @ts-ignore
import { removeFriend } from '/includes/functions/removeFriend'

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
    if (friendInput == null) return
    // @ts-ignore
    if (friendInput.value == null && friendInput.value <= 3) return
    addFriend(friendInput)
 })

deleteFriendBtn?.addEventListener('click', () => {
   if(getUrlData("id") == null && getUrlData("id") == undefined) return
   removeFriend(getUrlData("id"))
})

langBtn?.addEventListener('click', (e) => {
   switchLang()
})