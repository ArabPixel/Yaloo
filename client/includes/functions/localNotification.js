// @ts-ignore
import { notificationData } from '/includes/sharedContent';
export function notification(title, body, tag) {
    Notification.requestPermission().then(function (permission) {
        if (permission == "granted") {
            if (body.length > notificationData.notificationMaxBody) body = body.substring(0, notificationData.notificationMaxBody) + "..."
            new Notification(title, {
                body: body,
                icon: window.location.origin + "/logo",
                tag: tag
            })
        }
    })
}