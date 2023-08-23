// @ts-ignore
import { requestNotificationPermission } from '/includes/functions/requestNotificationPerm'
// check notification permission when finishing loading
onload = (e) => {
    requestNotificationPermission()
}