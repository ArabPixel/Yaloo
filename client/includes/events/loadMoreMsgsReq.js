// @ts-ignore
import { socket, getUrlData, loadedMessagesCount, loadMessageBtn } from '/includes/sharedContent'
// Check if load msgs btn is clicked
loadMessageBtn.addEventListener('click', () => {
    if (getUrlData("id") <= 0 || getUrlData("id") == undefined) return
    socket.emit("load more messages", localStorage.getItem("id"), getUrlData("id"), loadedMessagesCount)
})