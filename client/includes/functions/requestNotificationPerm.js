// Request Notification permission to be able to send notifications later
export async function requestNotificationPermission() {
   try {
      const permission = await Notification.requestPermission();
      if (permission === "denied") {
         // alert("Notifications are denied. Please allow notifications to receive alerts about new messages.");
      }
   } catch (error) {
      console.error("Error while requesting notification permission:", error);
   }
}