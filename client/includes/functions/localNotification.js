// @ts-ignore
import { notificationMaxBody } from '/includes/sharedContent';
export function notification(title, body, tag) {
    Notification.requestPermission().then(function (permission) {
        if (permission == "granted") {
            if (body.length > notificationMaxBody) body = body.substring(0, notificationMaxBody) + "..."
            new Notification(title, {
                body: body,
                icon: window.location.origin + "/logo",
                tag: tag
            })
        }
    })
}