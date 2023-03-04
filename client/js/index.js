// $(document).ready(function(){
//     $('#action_menu_btn').click(function(){
//         $('.action_menu').toggle();
//     });
// });

// ///////////////////////////////////////////////////

// const chatcard = document.getElementById("chatcard");
// const userslist = document.getElementById("userslist");
var socket = io();
      var btn = document.getElementById("send");
      var input = document.getElementById("input");
      var usersDiv = document.getElementById("usersList");
      var userIdFromUrl = window.location.search;
      var urlParams = new URLSearchParams(userIdFromUrl);
      var msgSentCounter = 0;

      // connect code
      socket.on("connect", () => {
         // if not logged in, go to login
         if (localStorage.getItem("uid") && localStorage.getItem("username") && localStorage.getItem("id")) {
            // request an update for the socketId
            socket.emit("update my socketID", localStorage.getItem("username"), localStorage.getItem("id"))
         } else {
            location.href = "/login";
         }
         // change socketId for the client
         socket.on("update client socketId", (socketID) => {
            localStorage.setItem("uid", socketID);
         })
      });
      // request and receive contact list
      socket.emit("give me contact list", localStorage.getItem("id"));
      let friends = [];

      socket.on("update contact list", (friendslist) => {
         friends = friendslist;
         usersDiv.innerHTML = "";
         if (friends.length >= 0) {
            usersDiv.innerHTML = '';
            for (var i = 0; i < friends.length; i++) {
               let friendId = friends[i].from_id == localStorage.getItem("id") ? friends[i].to_id : friends[i].from_id;
               socket.emit("get user name", friendId);
            }
         } else {
            usersDiv.innerHTML = "<center style='margin-top: 20px;color: black;' id='noFriends'>No firends found!</center>";
         }
      });

      socket.on("here is user name", (res, id) => {
         let friend = friends.find(friend => {
            let friendId = friend.from_id == localStorage.getItem("id") ? friend.to_id : friend.from_id;
            return friendId == id;
         });
         if (friend) {
            let status = res[0].Status;
            let username = res[0].Username;
            let noFriends = document.getElementById('noFriends');
            if (noFriends) noFriends.innerText = ""; //<input type="checkbox" value="' + id + '">
            usersDiv.innerHTML += '<a href="?id=' + id + '" id="list' + id + '"><div class="row sideBar-body">' +
               '<div class="col-sm-3 col-xs-3 sideBar-avatar">' +
               '<div class="avatar-icon">' +
               '<img src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg">' +
               '</div>' +
               '</div>' +
               '<div class="col-sm-9 col-xs-9 sideBar-main">' +
               '<div class="row">' +
               '<div class="col-sm-8 col-xs-8 sideBar-name">' +
               '<span class="name-meta">' + username + '</span>' +
               '</div>' +
               '<div class="col-sm-4 col-xs-4 pull-right sideBar-time">' +
               '<span class="time-meta pull-right" onclick="removeFriend(' + id + ');">X</span>' + // soon
               '<span class="time-meta pull-right" style="margin-top: -10px;" id="i' + id + '">' + status + '</span>' +
               '</div>' +
               '</div>' +
               '</div>' +
               '</div></a>'
         }
      });

      if (urlParams.get("id")) {
         socket.emit("get msgs from db", urlParams.get("id"), localStorage.getItem("id"));
         socket.on("here msgs from db", (res1, res2) => {
            document.getElementById("recieverName").innerText = res2[0].Username;
            document.getElementById("recieverStatus").innerText = res2[0].Status;
            res1.forEach(element => {
               if (element.from_id == localStorage.getItem("id")) {
                  document.getElementById("conversation").innerHTML += '<div class="row message-body">' +
                     '<div class="col-sm-12 message-main-sender">' +
                     '<div class="sender">' +
                     '<div class="message-text" id="msg'+element.ID+'"></div>' +
                     '<span class="message-time pull-right">' + element.date + '</span>' +
                     '</div>' +
                     '</div>' +
                     '</div>';
                     document.getElementById("msg" + element.ID).textContent = element.msg
               } else {
                  document.getElementById("conversation").innerHTML += '<div class="row message-body">' +
                     '<div class="col-sm-12 message-main-receiver">' +
                     '<div class="receiver">' +
                     '<div class="message-text" id="msg'+element.ID+'"></div>' +
                     '<span class="message-time pull-right">' + element.date + '</span>' +
                     '</div>' +
                     '</div>' +
                     '</div>';
                     document.getElementById("msg" + element.ID).textContent = element.msg
               }
            });
         })
      }

      //send message code
      btn.addEventListener("click", () => {
         var message = input.value;
         var userIdFromUrl = window.location.search;
         var urlParams = new URLSearchParams(userIdFromUrl);

         // if msg isnt empty and not messaging yourself
         if (message.trim().length > 0 && urlParams.get("id") != localStorage.getItem("id") && urlParams.get("id") != null && urlParams.get("id") > 0) {
            socket.emit("sent message", message, urlParams.get("id"), localStorage.getItem("id"));
            var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            msgSentCounter++
            document.getElementById("conversation").innerHTML += '<div class="row message-body">' +
               '<div class="col-sm-12 message-main-sender">' +
               '<div class="sender">' +
               '<div class="message-text"  id="msg'+msgSentCounter+'"></div>' +
               '<span class="message-time pull-right">' + date + '</span>' +
               '</div>' +
               '</div>' +
               '</div>';
            document.getElementById("msg" + msgSentCounter).textContent = message
            input.value = "";
            input.focus();
            typingTimeOut()
         }
      });

      // receive message event 
      socket.on("message recive", (msg, reciever, sender, username, date) => {
         var userIdFromUrl = window.location.search;
         var urlParams = new URLSearchParams(userIdFromUrl);
         if (sender == urlParams.get("id")) {
            msgSentCounter++
            document.getElementById("conversation").innerHTML += '<div class="row message-body">' +
               '<div class="col-sm-12 message-main-receiver">' +
               '<div class="receiver">' +
               '<div class="message-text"  id="msg'+msgSentCounter+'"></div>' +
               '<span class="message-time pull-right">' + date + '</span>' +
               '</div>' +
               '</div>' +
               '</div>';
               document.getElementById("msg" + msgSentCounter).textContent = msg
         } else {
            alert(username + " has just sent you a message!")
         }
      });

      socket.emit("prepare user search", localStorage.getItem("id"));
      socket.on("user search", (res) => {
         res.forEach(element => {
            document.getElementById("dataList").innerHTML += `<option value="${element.Username}">`;
         });
      })


      socket.on("changeUserStatus", (status, id) => {
         // i(ID)
         //recieverStatus
         var usersListStatus = document.getElementById("i" + id);
         var recieverStatus = document.getElementById("recieverStatus")
         // change status in sidebar
         usersListStatus.innerText = status;
         // if user2 got online and user1 in in thier chat, change status to online
         if (urlParams.get("id") && urlParams.get("id") == id) {
            recieverStatus.innerText = status
         }
      })

         // Typing status event
         input.addEventListener("keyup", function (e) {
            socket.emit("typing", localStorage.getItem("id"), urlParams.get("id"), "typing..")
            clearTimeout(timeout)
            timeout = setTimeout(typingTimeOut, 2000)
         });

         // socket.on("typing", (sender, typing) => {
         //    if (urlParams.get("id") != sender) return
            
         // })

      function addFriend() {
         var name = document.getElementById("searchText");
         if (name.value.trim().length > 3) {
            socket.emit("addFriend", name.value, localStorage.getItem("id"));
            name.value = ''
         }

         socket.on("friend added successfully", (res) => {
            usersDiv.innerHTML += '<a href="?id=' + res[0].ID + '" id="list' + res[0].ID + '"><div class="row sideBar-body">' +
               '<div class="col-sm-3 col-xs-3 sideBar-avatar">' +
               '<div class="avatar-icon">' +
               '<img src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg">' +
               '</div>' +
               '</div>' +
               '<div class="col-sm-9 col-xs-9 sideBar-main">' +
               '<div class="row">' +
               '<div class="col-sm-8 col-xs-8 sideBar-name">' +
               '<span class="name-meta">' + res[0].Username + '</span>' +
               '</div>' +
               '<div class="col-sm-4 col-xs-4 pull-right sideBar-time">' +
               '<span class="time-meta pull-right" onclick="removeFriend(' + res[0].ID + ');"></span>' + //soon
               '<span class="time-meta pull-right" style="margin-top: -10px;" id="' + res[0].ID + '">' + res[0].Status + '</span>' +
               '</div>' +
               '</div>' +
               '</div>' +
               '</div></a>';
         })
      }

      socket.on("friend added you", (res) => {
         usersDiv.innerHTML += '<a href="?id=' + res[0].ID + '"  id="list' + res[0].ID + '"><div class="row sideBar-body">' +
            '<div class="col-sm-3 col-xs-3 sideBar-avatar">' +
            '<div class="avatar-icon">' +
            '<img src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg">' +
            '</div>' +
            '</div>' +
            '<div class="col-sm-9 col-xs-9 sideBar-main">' +
            '<div class="row">' +
            '<div class="col-sm-8 col-xs-8 sideBar-name">' +
            '<span class="name-meta">' + res[0].Username + '</span>' +
            '</div>' +
            '<div class="col-sm-4 col-xs-4 pull-right sideBar-time">' +
            '<span class="time-meta pull-right" onclick="removeFriend(' + res[0].ID + ');"></span>' + // soon
            '<span class="time-meta pull-right" style="margin-top: -10px;" id="' + res[0].ID + '">' + res[0].Status + '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div></a>';
      })

      function removeFriend(id) {
         if (confirm("Are you sure you want to remove your Friend? all messages will be permanently deleted!")) {
            if (id != undefined && id != localStorage.getItem("id")) {
               socket.emit("removeFriend", localStorage.getItem("id"), localStorage.getItem("username"), id)
            }
         }
      }

      socket.on("removeFriend succ", (id) => {
         var friendToRemove = document.getElementById("list" + id);
         friendToRemove.remove();
         alert("Your Friend has been removed Successfully")
         location.href = "/"
      })

      socket.on("friend deleted you", (id, username) => {
         var removeFromList = document.getElementById("list" + id)
         removeFromList.remove()
         alert(username + " deleted you as a friend!")
         location.href = "/"
      })

      socket.on("removeFriend err", () => {
         alert("could not unfriend!")
      })
      const chatContainer = document.getElementById("conversation");

      let currentHeight = chatContainer.scrollHeight;

      // Scroll when new message appears !!(Try to scroll when new incomming message)!!
      setInterval(function () {
         if (urlParams.get("id") != null && urlParams.get("id") > 0) {
            var x = window.matchMedia("(max-width: 767px)");
            if (x.matches) {
               document.getElementById("sideL").style.display = "none";
            } else {
               document.getElementById("sideL").style.display = "block";
            }
            if (chatContainer.scrollHeight > currentHeight) {
               if (chatContainer.scrollTop + chatContainer.clientHeight >= currentHeight) {
                  chatContainer.scrollTop = chatContainer.scrollHeight;
               }
               currentHeight = chatContainer.scrollHeight;
            }
         }
      }, 700);

      let timeout
      function typingTimeOut(){
         socket.emit("typing", localStorage.getItem("id"), urlParams.get("id"))
      }



      //Groups (Future Update)

      // function makegroup(){
      //    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
      //    let selectedCheckboxes = [];
            
      //    checkboxes.forEach(checkbox => {
      //          if(checkbox.checked) {
      //             selectedCheckboxes.push(checkbox.value);
      //          }
      //    });  
      //    if (selectedCheckboxes != null || selectedCheckboxes != undefined){
      //       var groupName = prompt("Type below the group name..")
      //       if(groupName) socket.emit("create group", selectedCheckboxes, groupName, localStorage.getItem("id"), localStorage.getItem("username"))
      //    }
      // }