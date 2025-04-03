// @ts-ignore
import { notificationData } from '/includes/sharedContent';
export function notification(title, body, tag, url) {
    Notification.requestPermission().then(function (permission) {
        if (permission == "granted") {
            if (body.length > notificationData.notificationMaxBody) body = body.substring(0, notificationData.notificationMaxBody) + "..."
            var disPlayNotification = new Notification(title, {
                body: body,
                icon: window.location.origin + "/logo",
                tag: tag
            })
            disPlayNotification?.addEventListener('click', (e) => {
                if (url) location.href = window.location.origin + url
            })
        }
    })
}