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

window.visualViewport.addEventListener('resize', handleKeyboardState);
// Add this to your window.js file
// Update window.js
let lastViewportHeight = window.visualViewport.height;
let isKeyboardOpen = false;

function handleKeyboardState() {
    const currentHeight = window.visualViewport.height;
    
    // Detect keyboard state change
    if (currentHeight < lastViewportHeight - 50 && !isKeyboardOpen) {
        // Keyboard opened
        isKeyboardOpen = true;
        adjustContentForKeyboard(true);
    } else if (currentHeight >= lastViewportHeight - 50 && isKeyboardOpen) {
        // Keyboard closed
        isKeyboardOpen = false;
        adjustContentForKeyboard(false);
    }
    
    lastViewportHeight = currentHeight;
}

function adjustContentForKeyboard(isKeyboardOpen) {
    const chatContainer = document.getElementById('chat');
    const inputContainer = document.getElementById('bottom');
    
    if (chatContainer && inputContainer) {
        if (isKeyboardOpen) {
            // Adjust for keyboard
            const keyboardHeight = lastViewportHeight - window.visualViewport.height;
            chatContainer.style.height = `calc(100svh - ${keyboardHeight}px - ${inputContainer.offsetHeight}px)`;
            chatContainer.style.overflow = 'auto';
            inputContainer.style.position = 'fixed';
            inputContainer.style.bottom = `${keyboardHeight}px`;
            inputContainer.style.width = '100%';
            inputContainer.style.zIndex = '1000';

            // Scroll to the bottom of the chat container with a small delay to ensure rendering
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
                // Fallback: scroll last child into view if any
                const lastChild = chatContainer.lastElementChild;
                if (lastChild) {
                    lastChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 50);
        } else {
            // Reset to normal
            chatContainer.style.height = `100svh`;
            chatContainer.style.overflow = 'auto';
            inputContainer.style.position = 'relative';
            inputContainer.style.bottom = '';
            inputContainer.style.zIndex = '';
        }
    }
}
