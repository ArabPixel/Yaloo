// @ts-ignore
import { chatContainer, deletedMessage } from '/includes/sharedContent'
// @ts-ignore
import { scrollToBottom } from '/includes/functions/convoScroll';
// @ts-ignore
import { DeleteMsg } from '/includes/functions/deleteMsg';

// Display message function when sending/receiving/ chat
export function displayMessage(side, msg, date, countFromDb, deleted) {

    var newMessage = document.createElement("div");
    newMessage.classList.add("message", side);
    newMessage.id = "msg" + countFromDb;
    newMessage.innerHTML = "<p></p>"
    newMessage.querySelector("p").textContent = msg;
    if (side == "sent" && !deleted){
        newMessage.innerHTML += `<button style="float: right;" type="button" class="delBtns" id="delbtn${countFromDb}">Delete</button>`;
    }
    if (newMessage && !deleted) {
        newMessage.querySelector("p").textContent = msg
        chatContainer.innerHTML += newMessage.outerHTML
    } else {
        if (side == "sent") {
            newMessage.innerHTML = `<em>You ${deletedMessage}</em>`
        } else {
            newMessage.innerHTML = `<em>The sender ${deletedMessage}</em>`
        }
        chatContainer.innerHTML += newMessage.outerHTML
    }
    scrollToBottom()
}

export function displayLoadedMessages(ID, side, date, msg, deleted) {
    let newMessageContent = `
    <div class="row message-body">
      <div class="col-sm-12 message-main-${side}">
        <div class="${side}" id="${side + ID}">
          <div class="message-text" id="msg${ID}"></div>
          <span class="message-time pull-right">${date}</span>
        </div>
      </div>
    </div>

  `

    // Step 3: Insert the new message at the top of the chat container
    chatContainer.insertAdjacentHTML("afterbegin", newMessageContent);
    let deletedMsgPos = document.getElementById("msg" + ID)
    if (deletedMsgPos != null) {
        if (deleted) {
            deletedMsgPos.innerHTML = `<em>You ${deletedMessage}</em>`
        } else {
            deletedMsgPos.textContent = msg
        }
    }
}