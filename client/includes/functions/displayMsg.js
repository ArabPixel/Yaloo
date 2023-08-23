// @ts-ignore
import { chatContainer, deletedMessage } from '/includes/sharedContent'
// @ts-ignore
import { scrollToBottom } from '/includes/functions/convoScroll';

// Display message function when sending/receiving/ chat
export function displayMessage(side, msg, date, countFromDb) {
    chatContainer.innerHTML += '<div class="row message-body">' +
        '<div class="col-sm-12 message-main-' + side + '">' +
        '<div class="' + side + '">' +
        '<div class="message-text"  id="msg' + countFromDb + '"></div>' +
        '<span class="message-time pull-right">' + date + '</span>';
    if (side == "sender") {
        chatContainer.innerHTML += '<button style="float: right;" type="button" onclick="Delete(' + countFromDb + ')">Delete</button>';
    }
    chatContainer.innerHTML +=
        '</div>' +
        '</div>' +
        '</div>';
    let msgElement = document.getElementById("msg" + countFromDb)
    if (msgElement) {
        msgElement.textContent = msg
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