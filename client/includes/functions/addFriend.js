// Add Friends function
// @ts-nocheck
import { socket, usersDiv } from '/includes/sharedContent'
export function addFriend(name) {
    if (name) {
        if (name.value.trim().length > 3) {
            socket.emit("addFriend", name.value, localStorage.getItem("id"));
            name.value = ''
        } else return
    } else return
}

// display friend in html webpage
export function displayFriend(res){
    usersDiv.innerHTML += `<a href="?id=${res[0].ID}" id="${res[0].ID}"><div class="row sideBar-body">
    <div class="col-sm-3 col-xs-3 sideBar-avatar">
    <div class="avatar-icon">
    <img src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg">
    </div>
    </div>
    <div class="col-sm-9 col-xs-9 sideBar-main">
    <div class="row">
    <div class="col-sm-8 col-xs-8 sideBar-name">
    <span class="name-meta">${res[0].Username}</span>
    </div>
    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
    <span class="time-meta pull-right" id="${res[0].ID}">${res[0].Status}</span>
    </div>
    </div>
    </div>
    </div></a>`
}