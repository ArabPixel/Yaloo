// @ts-ignore
import { socket, getUrlData } from '/includes/sharedContent'
// remove typing indicator
export function typingTimeOut() {
    socket.emit("typing", localStorage.getItem("id"), getUrlData("id"))
}