// @ts-ignore
import { socket } from '/includes/sharedContent'
// @ts-ignore
import { displayFriend } from '/includes/functions/addFriend'

// Display friend after you added him
socket.on("friend added successfully", (res) => {
    displayFriend(res)
})

// Display friend after he added you
socket.on("friend added you", (res) => {
    displayFriend(res)
})