// @ts-ignore
import { socket } from '/includes/sharedContent'

// Remove friend from list after you deleted him from db
socket.on("removeFriend succ", (id) => {
    var friendToRemove = document.getElementById(id);
    if (friendToRemove) {
        friendToRemove.remove();
        alert("Your Friend has been removed Successfully")
        location.href = "/"
    }
})


// remove friend from list after he deleted you from db
socket.on("friend deleted you", (id, username) => {
    var removeFromList = document.getElementById(id)
    if (removeFromList) {
        removeFromList.remove()
        alert(username + " deleted you as a friend!")
        location.href = "/"
    }
})

// Error While deleting friend
socket.on("removeFriend err", (err) => {
    alert(err)
})