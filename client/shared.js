// @ts-ignore
var socket = io();
var sendBtn = document.getElementById("send");                       //    Send Button
let loadMessageBtn = document.getElementById("loadMoreBtn")          //    Load Messages Button
let addFriendBtn = document.getElementById("addFriend")              //    Add friend Button
var deleteFriendBtn = document.getElementById("deleteFriendBtn")     //    Delete friend Button
var input = document.getElementById("input");                        //    Message Input
var usersDiv = document.getElementById("usersList");                 //    Users List (Left Side of page)    
const chatContainer = document.getElementById("conversation");       //    Conversation div
let friendInput = document.getElementById("friendName")              //    Input where you search and add friends
let langBtn = document.getElementById("langBtn")                     //    User Language select
var userIdFromUrl = window.location.search;                          //    Get Url
var urlParams = new URLSearchParams(userIdFromUrl);                  //    Store URL Parameters
let timeout;                                                         //    Timeout for Typing indicator
var noFriendsMsg = "Go ahead and add some friends"
var friendModalHead = document.getElementById("friendAddModalHeader")//    Friend Add Modal Header
let confirmDelete = "Are you sure you want to delete this message?"  //    Deletion confirm message
let deletedMessage = "deleted this Message"                          //    Text shown when a message deleted (Format: username + var deletedMessage)
var friendRemoved = "Your Friend has been removed Successfully"      //    Text shown when a friend removed (Format: username + var friendRemoved)
var friendRemovedYou = "deleted this friend Successfully"            //    Text shown when you deleted a friend (Format: username + var friendRemovedYou)
var emojiPicker = document.getElementById('emojiPicker')             //    Emoji Picker Div
var notificationData = {                                             //    Notification data         
    ar: {
        head: "تم الإتصال بالخادم",                                 
        body: "أصبح بإمكانك التواصل مرة اخرى مع المستخدمين"          //    Arabic notification data
    },
    en: {
        head: "You are back online!",
        body: "Wooohoo, you can chat with others again!"             //    English notification data
    },
    notificationMaxBody: 40                                          //    This will cut and make the notification body dotted at the end

}
let loadedMessagesCount = 50                                         //    Messages that will load on enter the conversation
let firstMsgIdOfConversation                                         //    First Message id of current conversation

export {
    socket,
    sendBtn,
    addFriendBtn,
    deleteFriendBtn,
    input,
    usersDiv,
    chatContainer,
    userIdFromUrl,
    urlParams,
    timeout,
    confirmDelete,
    deletedMessage,
    loadedMessagesCount,
    loadMessageBtn,
    firstMsgIdOfConversation,
    notificationData,
    friendModalHead,
    friendInput,
    langBtn,
    noFriendsMsg,
    friendRemoved,
    friendRemovedYou,
    emojiPicker
}
export function updateFirstMsgIdVar(id){
    firstMsgIdOfConversation = id
}

export function getUrlData(urlParm){
    userIdFromUrl = window.location.search;
    urlParams = new URLSearchParams(userIdFromUrl);
    return urlParams.get(urlParm)
}

export function loadedMessagesCountPlus(){
    loadedMessagesCount++
}

export function setTypingTimeout(typingTimeout, time){
    timeout = setTimeout(typingTimeout, time)
}

// Changes the website text between English and Arabic
export function changeLangValues(html, confirmDeleteValue, deletedMessageValue, inputPlaceholderValue, friendModalHeadValue, noFriendsMsgValue, usersListStatus, friendRemovedValue, friendRemovedYouValue){
    document.documentElement.lang = html
    confirmDelete = confirmDeleteValue
    deletedMessage = deletedMessageValue
    input.placeholder = inputPlaceholderValue
    friendModalHead.innerText = friendModalHeadValue
    if(usersDiv.children.length == 0){
        usersDiv.innerHTML = `<center style='margin-top: 20px;color: black;' id='noFriends'>${noFriendsMsgValue}</center>`
    }
    friendRemoved = friendRemovedValue
    friendRemovedYou = friendRemovedYouValue
    if (usersListStatus.innerText) usersListStatus.innerText = html == "en" ? "Online" : "متصل"
}