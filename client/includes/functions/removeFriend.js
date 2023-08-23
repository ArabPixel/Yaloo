// @ts-ignore
import { socket } from '/includes/sharedContent';
// remove friend Function
export function removeFriend(id) {
   if (confirm("Are you sure you want to remove your Friend? all messages will be deleted permanently!")) {
      if (id != undefined && id != localStorage.getItem("id")) {
         socket.emit("removeFriend", localStorage.getItem("id"), localStorage.getItem("username"), id)
      }
   }
}