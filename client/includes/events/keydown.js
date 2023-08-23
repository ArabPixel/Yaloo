// @ts-ignore
import { sendBtn, input } from '/includes/sharedContent'
// After clicking "Enter" on Keyboard send message

input.addEventListener("keydown", (e) => {
    if (e.key == "Enter" && !e.shiftKey) {
        e.preventDefault()
        sendBtn.click()
    }
})