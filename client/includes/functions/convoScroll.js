// @ts-ignore
import { chatContainer } from '/includes/sharedContent'
// Auto scroll when user at the bottom of the msgs div
export function scrollToBottom() {
   const scrollThreshold = 100; // adjust this value to control how close to the bottom the user must be before auto-scrolling
   const scrollDifference = Math.abs(chatContainer.scrollTop + chatContainer.clientHeight - chatContainer.scrollHeight);
   if (scrollDifference <= scrollThreshold) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
   }
}