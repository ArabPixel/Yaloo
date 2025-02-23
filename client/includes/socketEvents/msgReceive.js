// @ts-ignore
import { socket, getUrlData } from '/includes/sharedContent'
// @ts-ignore
import { displayMessage } from "/includes/functions/displayMsg"
// @ts-ignore
import { notification } from '/includes/functions/localNotification'
// receive message event 
socket.on("message receive", (msg, receiver, sender, username, date, msgsCountFromDb) => {

    if (sender == getUrlData("id")) {
        displayMessage("received", msg, date, msgsCountFromDb, false)
    } else if (sender == localStorage.getItem("id")) {
        displayMessage("sent", msg, date, msgsCountFromDb, false)
    } else {
        notification("New message from " + username, msg, sender)
    }
});