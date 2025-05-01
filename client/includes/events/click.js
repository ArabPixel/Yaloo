// @ts-ignore
import { socket, sendBtn, input, getUrlData, friendInput, addFriendBtn, deleteFriendBtn, langBtn, emojiPicker } from '/includes/sharedContent';
// @ts-ignore
import { addFriend } from '/includes/functions/addFriend';
// @ts-ignore
import { typingTimeOut } from '/includes/functions/typingIndicator'
import { switchLang } from '/includes/functions/changeLang';
// @ts-ignore
import { removeFriend } from '/includes/functions/removeFriend'
import { DeleteMsg } from '/includes/functions/deleteMsg'

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

document.body.addEventListener('click', (event) => {
   if (event.target.classList.contains('delBtns')) {
       const buttonId = event.target.id; // Get the ID of the clicked button
       const messageId = buttonId.replace("delbtn", ""); // Extract the message ID
       DeleteMsg(messageId);
   }
});

emojiPicker.addEventListener('click', (e) => {
   if(document.querySelector('emoji-picker').style.display === 'block'){
      // Check if the clicked element is not the emoji picker itself
      // and hide the emoji picker if it is not
      if(e.target.classList.contains('ePickerClass')) return
      document.querySelector('emoji-picker').style.display = 'none'
   }else{
      document.querySelector('emoji-picker').style.display = 'block'
   }
})

document.querySelector('emoji-picker').addEventListener('emoji-click', event =>{
   document.getElementById('input').value += event.detail.unicode;
});