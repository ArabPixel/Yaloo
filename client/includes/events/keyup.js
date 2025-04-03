// @ts-ignore
import { socket, timeout, setTypingTimeout, getUrlData, input } from '/includes/sharedContent'
// @ts-ignore
import { typingTimeOut } from '/includes/functions/typingIndicator'
// Typing status event
input.addEventListener("keyup", function (e) {
    // if enter clicked, don't send typing indicator
    if (e.key == "Enter") return
    // send typing indicator
    socket.emit("typing", localStorage.getItem("id"), getUrlData("id"), 2)
    clearTimeout(timeout)
    setTypingTimeout(typingTimeOut, 2000)
});