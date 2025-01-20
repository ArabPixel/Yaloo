// @ts-ignore
import { socket, friendRemoved, friendRemovedYou } from '/includes/sharedContent'

// Remove friend from list after you deleted him from db
socket.on("removeFriend succ", (id) => {
    var friendToRemove = document.getElementById(id);
    if (friendToRemove) {
        friendToRemove.remove();
        alert(friendRemoved)
        location.href = "/"
    }
})


// remove friend from list after he deleted you from db
socket.on("friend deleted you", (id, username) => {
    var removeFromList = document.getElementById(id)
    if (removeFromList) {
        removeFromList.remove()
        alert(username + " " + friendRemovedYou)
        location.href = "/"
    }
})

// Error While deleting friend
socket.on("removeFriend err", (err) => {
    alert(err)
})