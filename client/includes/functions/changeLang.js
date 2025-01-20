import { changeLangValues } from "/includes/sharedContent";
var html = document.documentElement;
export function switchLang() {
    switch (html.lang) {
        default:
            makeEn()
            break;
        case "en":
            makeAr()
            break;
        case "ar":
            makeEn()
            break;
    }
}

function makeEn(){
    html.style.setProperty("--direction", "ltr")
    html.style.setProperty("--anti-direction", "rtl")
    var confirmDelete = "Are you sure you want to delete this message?"
    var deletedMessage = "deleted this Message"
    var inputPlaceholderValue = "Ae..."
    var friendModalHead = "Who do you choose to be lucky to have you as a friend?"
    var noFriendsMsgValue = "Go ahead and add some friends!"
    var friendRemoved = "Friend removed successfully!"
    var friendRemovedYou = "removed you as a friend"
    var receiverStatus = document.getElementById("receiverStatus")
    changeLangValues("en", confirmDelete, deletedMessage, inputPlaceholderValue, friendModalHead, noFriendsMsgValue, receiverStatus, friendRemoved, friendRemovedYou)
}

function makeAr(){
    html.style.setProperty("--direction", "rtl")
    html.style.setProperty("--anti-direction", "ltr")
    var confirmDelete = "هل أنت متأكد أنك تريد حذف هذه الرسالة؟"
    var deletedMessage = "قام بحذف الرسالة"
    var inputPlaceholderValue = "إكتب..."
    var friendModalHead = "من تختار ليكون المحظوظ بصداقتك؟"
    var noFriendsMsgValue = "اذهب واضف بعض الاصدقاء!"
    var friendRemoved = "لقد تم حذف الصدقة بنجاح!"
    var friendRemovedYou = "قام بحذفك من الصداقة"
    var receiverStatus = document.getElementById("receiverStatus")
    changeLangValues("ar", confirmDelete, deletedMessage, inputPlaceholderValue, friendModalHead, noFriendsMsgValue, receiverStatus, friendRemoved, friendRemovedYou)
}