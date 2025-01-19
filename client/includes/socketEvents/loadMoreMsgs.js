// @ts-ignore
import { socket, loadedMessagesCountPlus, firstMsgIdOfConversation, loadMessageBtn } from '/includes/sharedContent';
// @ts-ignore
import { displayLoadedMessages } from '/includes/functions/displayMsg';
socket.on("load more messages now", (res, friendUsername) => {
    res.forEach(element => {
        loadedMessagesCountPlus()
        if (element.from_id == localStorage.getItem("id")) {
            displayLoadedMessages(element.ID, "sent", element.date, element.msg, element.deleted)
        } else {
            displayLoadedMessages(element.ID, "received", element.date, element.msg, element.deleted)
        }
        if (element.ID == firstMsgIdOfConversation) {
            loadMessageBtn.remove();
        }
    });
})