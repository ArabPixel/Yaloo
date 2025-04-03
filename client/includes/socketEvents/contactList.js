// @ts-ignore
import { socket, usersDiv, noFriendsMsg } from '/includes/sharedContent'
// @ts-ignore
import { displayFriend } from '/includes/functions/addFriend';
let friends
// request and receive contact list
socket.emit("give me contact list", localStorage.getItem("id"));

socket.on("update contact list", (friendslist) => {
    friends = friendslist;
    usersDiv.innerHTML = "";
    if (friends.length > 0) {
        usersDiv.innerHTML = '';
        for (var i = 0; i < friends.length; i++) {
            let friendId = friends[i].from_id == localStorage.getItem("id") ? friends[i].to_id : friends[i].from_id;
            socket.emit("get user name", friendId);
        }
    } else {
        usersDiv.innerHTML = `<center style='margin-top: 20px;color: black;' id='noFriends'>${noFriendsMsg}</center>`
    }
});

socket.on("here is user name", (res, id, status) => {
    let friend = friends.find(friend => {
        let friendId = friend.from_id == localStorage.getItem("id") ? friend.to_id : friend.from_id;
        return friendId == id;
    });
    if (friend) {
        let noFriends = document.getElementById('noFriends');
        if (noFriends) noFriends.innerText = ""; //<input type="checkbox" value="' + id + '">
        displayFriend(res, status)
    }
});