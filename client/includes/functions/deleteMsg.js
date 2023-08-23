// @ts-ignore
// Delete message function
import { socket, confirmDelete, getUrlData } from '/includes/sharedContent';
export function DeleteMsg(msgId) {
   if (confirm(confirmDelete)) {
      socket.emit("deleteMsg", msgId, getUrlData("id"), localStorage.getItem("id"));
      const delBtn = document.getElementById("delbtn" + msgId)
      if (delBtn != null) {
         delBtn.remove()
      }
   }
}