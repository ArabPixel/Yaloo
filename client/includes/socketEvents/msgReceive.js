// @ts-ignore
import { socket, getUrlData } from '/includes/sharedContent'
// @ts-ignore
import { displayMessage } from "/includes/functions/displayMsg"
// @ts-ignore
import { notification } from '/includes/functions/localNotification'
// receive message event 
socket.on("message receive", (msg, receiver, sender, username, date, msgsCountFromDb) => {

    if (sender == getUrlData("id")) {
        displayMessage("receiver", msg, date, msgsCountFromDb)
    } else if (sender == localStorage.getItem("id")) {
        displayMessage("sender", msg, date, msgsCountFromDb)
    } else {
        notification("New message from " + username, msg, sender)
    }
});