// @ts-ignore
import { notification } from '/includes/functions/localNotification'
// @ts-ignore
import { getUrlData } from '/includes/sharedContent'
// Send notification when user is back online
window.addEventListener("online", () => {
    notification("You are back online!", "Wooohoo, you can chat with others again!", "connectionStatus")
})

// Send notification when user is gone offline
window.addEventListener("offline", () => {
    notification("You lost connection!", "Check your internet connection!", "connectionStatus")
})

// Resize webpage (For mobile)
window.addEventListener('load', () => {
    if (getUrlData("id") != null && getUrlData("id") > 0) {
        var x = window.matchMedia("(max-width: 767px)");
        let sideL = document.getElementById("sideL")
        if (sideL == null) return
        if (x.matches) {
            sideL.style.display = "none";
        } else {
            sideL.style.display = "block";
        }
    }
})

// Resize webpage (For pc)
window.addEventListener('resize', () => {
    if (getUrlData("id") != null && getUrlData("id") > 0) {
        var x = window.matchMedia("(max-width: 767px)");
        let sideL = document.getElementById("sideL")
        if (sideL == null) return
        if (x.matches) {
            sideL.style.display = "none";
        } else {
            sideL.style.display = "block";
        }
    }
})