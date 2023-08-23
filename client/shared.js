// @ts-ignore
var socket = io();
var sendBtn = document.getElementById("send");                       //    Send Button
let loadMessageBtn = document.getElementById("loadMoreBtn")          //    Load Messages Button
let addFriendBtn = document.getElementById("addFriend")              //    Add friend Button
var input = document.getElementById("input");                        //    Message Input
var usersDiv = document.getElementById("usersList");                 //    Users List (Left Side of page)    
const chatContainer = document.getElementById("conversation");       //    Conversation div
let friendInput = document.getElementById("friendName")              //    Input where you search and add friends
let langBtn = document.getElementById("langBtn")                     //    User Language select
var userIdFromUrl = window.location.search;                          //    Get Url
var urlParams = new URLSearchParams(userIdFromUrl);                  //    Store URL Parameters
let timeout;                                                         //    Timeout for Typing indicator
let confirmDelete = "Are you sure you want to delete this message?"  //    Deletion confirm message
let deletedMessage = "Deleted this Message"                          //    Text shown when a message deleted (Format: username + var deletedMessage)
let loadedMessagesCount = 50                                         //    Messages that will load on enter the conversation
let firstMsgIdOfConversation                                         //    First Message id of current conversation
let notificationMaxBody = 40                                         //    This will cut and make the notification body dottet at the end

export {
    socket,
    sendBtn,
    addFriendBtn,
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
    notificationMaxBody,
    friendInput,
    langBtn
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