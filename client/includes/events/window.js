// @ts-ignore
import { notification } from '/includes/functions/localNotification'
import { notificationData } from '/includes/sharedContent'
// @ts-ignore
import { getUrlData } from '/includes/sharedContent'
// Send notification when user is back online
window.addEventListener("online", () => {
    var lang = document.documentElement.lang
    notification(notificationData[lang].head, notificationData[lang].body, "connectionStatus")
})

// Send notification when user is gone offline
window.addEventListener("offline", () => {
    var lang = document.documentElement.lang
    notification(notificationData[lang].head, notificationData[lang].body, "connectionStatus")
})

// Resize webpage (For mobile)
window.addEventListener('load', () => {
    let usersListDiv = document.getElementById("right")
    let chatDiv = document.getElementById("chat")
    var x = window.matchMedia("(max-width: 767px)")
    if (usersListDiv == null || chatDiv == null) return
    if (x.matches) {
        if (getUrlData("id") != null && getUrlData("id") > 0) {
            usersListDiv.style.display = "none";
        } else {
            chatDiv.style.display = "none";
        }
        
    } else {
        usersListDiv.style.display = "flex";
        chatDiv.style.display = "flex"
    }

})

// Resize webpage (For pc)
window.addEventListener('resize', () => {
    if (getUrlData("id") != null && getUrlData("id") > 0) {
        var x = window.matchMedia("(max-width: 767px)");
        let usersListDiv = document.getElementById("right")
        if (usersListDiv == null) return
        if (x.matches) {
            usersListDiv.style.display = "none";
        } else {
            usersListDiv.style.display = "flex";
        }
    }
})