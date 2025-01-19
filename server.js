const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const conn = require('./db/db');
const io = new Server(server);
const port = 8080;
const settingsURL = io.of("/settings")

// website urls
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/client/login.html');
});

app.get('/index-old', (req, res) => {
  res.sendFile(__dirname + '/client/index-old.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/client/register.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/settings', (req, res) => {
  res.sendFile(__dirname + '/client/settings.html');
});

// css and js files
app.get('/css/index', (req, res) => {
  res.sendFile(__dirname + '/client/css/index.css');
});

app.get('/css/app', (req, res) => {
  res.sendFile(__dirname + '/client/css/app.css');
});

app.get('/css/app-light', (req, res) => {
  res.sendFile(__dirname + '/client/css/app-light.css');
});

app.get('/js/index', (req, res) => {
  res.sendFile(__dirname + '/client/js/index.js');
});

app.get('/logo', (req, res) => {
  res.sendFile(__dirname + '/client/images/logo.ico');
});

/////////////////// Includes ///////////////////
app.get('/includes/sharedContent', (req, res) => {
  res.sendFile(__dirname + '/client/shared.js');
});

app.get('/includes/functions/addFriend', (req, res) => {
  res.sendFile(__dirname + '/client/includes/functions/addFriend.js');
});

app.get('/includes/functions/convoScroll', (req, res) => {
  res.sendFile(__dirname + '/client/includes/functions/convoScroll.js');
});

app.get('/includes/functions/deleteMsg', (req, res) => {
  res.sendFile(__dirname + '/client/includes/functions/deleteMsg.js');
});

app.get('/includes/functions/displayMsg', (req, res) => {
  res.sendFile(__dirname + '/client/includes/functions/displayMsg.js');
});

app.get('/includes/functions/localNotification', (req, res) => {
  res.sendFile(__dirname + '/client/includes/functions/localNotification.js');
});


app.get('/includes/functions/removeFriend', (req, res) => {
  res.sendFile(__dirname + '/client/includes/functions/removeFriend.js');
});


app.get('/includes/functions/requestNotificationPerm', (req, res) => {
  res.sendFile(__dirname + '/client/includes/functions/requestNotificationPerm.js');
});

app.get('/includes/functions/changeLang', (req, res) => {
  res.sendFile(__dirname + '/client/includes/functions/changeLang.js');
});

app.get('/includes/functions/typingIndicator', (req, res) => {
  res.sendFile(__dirname + '/client/includes/functions/typingIndicator.js');
});

app.get('/includes/events/click', (req, res) => {
  res.sendFile(__dirname + '/client/includes/events/click.js');
});

app.get('/includes/events/loadMoreMsgsReq', (req, res) => {
  res.sendFile(__dirname + '/client/includes/events/LoadMoreMsgsReq.js');
});

app.get('/includes/events/keydown', (req, res) => {
  res.sendFile(__dirname + '/client/includes/events/keydown.js');
});

app.get('/includes/events/keyup', (req, res) => {
  res.sendFile(__dirname + '/client/includes/events/keyup.js');
});

app.get('/includes/events/window', (req, res) => {
  res.sendFile(__dirname + '/client/includes/events/window.js');
});

app.get('/includes/events/focus', (req, res) => {
  res.sendFile(__dirname + '/client/includes/events/focus.js');
});

app.get('/includes/events/onload', (req, res) => {
  res.sendFile(__dirname + '/client/includes/events/onload.js');
});

app.get('/includes/socketEvents/loadMoreMsgs', (req, res) => {
  res.sendFile(__dirname + '/client/includes/socketEvents/loadMoreMsgs.js');
});

app.get('/includes/socketEvents/connect', (req, res) => {
  res.sendFile(__dirname + '/client/includes/socketEvents/connect.js');
});

app.get('/includes/socketEvents/msgReceive', (req, res) => {
  res.sendFile(__dirname + '/client/includes/socketEvents/msgReceive.js');
});

app.get('/includes/socketEvents/statusChanger', (req, res) => {
  res.sendFile(__dirname + '/client/includes/socketEvents/statusChanger.js');
});

app.get('/includes/socketEvents/msgDeleted', (req, res) => {
  res.sendFile(__dirname + '/client/includes/socketEvents/msgDeleted.js');
});

app.get('/includes/socketEvents/removeFriend', (req, res) => {
  res.sendFile(__dirname + '/client/includes/socketEvents/removeFriend.js');
});

app.get('/includes/socketEvents/addFriends', (req, res) => {
  res.sendFile(__dirname + '/client/includes/socketEvents/addFriends.js');
});

app.get('/includes/socketEvents/contactList', (req, res) => {
  res.sendFile(__dirname + '/client/includes/socketEvents/contactList.js');
});




// var ip = req.socket.remoteAddress; get user ip (might be used later).
var msgsCountFromDb
var usersList = new Map();
// Make all users offline in DB at the start of the server
conn.query(`UPDATE users SET Status = "Offline"`, (err, res) => {
  if (err) console.error(err)
})
// Import all users in a List to grab users faster
conn.query(`SELECT * FROM users`, (err, res) => {
  res.forEach(user => {
    usersList.set(user.ID.toString(), { username: user.Username, socketId: null, status: "Offline" })
  });
})

conn.query(`SELECT COUNT(*) FROM messages`, (err, res) => {
  msgsCountFromDb = res[0]['COUNT(*)']
  console.log(res[0]['COUNT(*)'])
})

setInterval(() => {
  conn.query(`SELECT COUNT(*) FROM messages`, (err, res) => {
    if (msgsCountFromDb != res[0]['COUNT(*)']) {
      console.log(res[0]['COUNT(*)'])
    }
    msgsCountFromDb = res[0]['COUNT(*)']
  })
}, 150000);
// On user connection
io.on("connection", (socket) => {
  //set username and id 
  socket.on("update my socketID", (username, id) => {
    usersList.set(id, { username: username, socketId: socket.id, status: "Online" })
    sendStatus(id, "Online", socket)
    conn.query(`UPDATE users SET status = 'Online' WHERE ID = '${id}'`, () => { })
    socket.emit("update client socketId", socket.id);
  })

  //login
  socket.on("check login", (username, password) => {
    if (username != undefined && password != undefined) {
      conn.query(`SELECT * FROM users WHERE Username = '${username}' AND Password = '${password}'`, (err, res) => {
        if (res.length > 0) {
          socket.emit("result", res);
        } else socket.emit("errResult", "No user found")
      });
    }
  });

  //register
  socket.on("check register", (user, pass) => {
    if (user != null && pass != null) {
      conn.query(`SELECT * FROM users WHERE Username = '${user}'`, (err, res) => {
        if (res.length == 0) {
          conn.query(`INSERT INTO users(Username, Password, Status, Activation)VALUES('${user}', '${pass}', 'Offline', '1')`, (err, res) => {
            if (err) throw err
            socket.emit("Register result")
          })
        } else {
          socket.emit("User Exists", user)
        }
      });
    }
  });
  // send contact list back to 
  socket.on("give me contact list", (id) => {
    conn.query(`SELECT * FROM friends WHERE from_id = '${id}' OR to_id = '${id}'`, (err, res) => {
      socket.emit("update contact list", res);
    });
    //get Groups list if exists(Future update)
  })


  socket.on("get user name", (id) => {
    conn.query(`SELECT ID, Username, Status FROM users WHERE ID = '${id}'`, (err, res) => {
      socket.emit("here is user name", res, id);
    });
  })

  //send message
  socket.on("sent message", (msg, receiver, sender) => {
    // Check for login
    conn.query(`SELECT from_id, to_id FROM friends WHERE from_id = '${receiver}' AND to_id = '${sender}' OR from_id = '${sender}' AND to_id = '${receiver}'`, (err, res) => {
      if (res.length <= 0) return
      var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
      if (usersList.has(receiver)) {
        var userInfo = usersList.get(receiver);
        msgsCountFromDb++
        // socket.emit("message sent", msgsCountFromDb)
        io.to(userInfo.socketId).to(usersList.get(sender).socketId).emit("message receive", msg, receiver, sender, usersList.get(sender).username, date, msgsCountFromDb);
      }
      conn.query(`INSERT INTO messages(from_id, to_id, msg, date)VALUES('${sender}', '${receiver}', '${msg}', '${date}')`, (err, res) => {
        if (err) throw err;
        console.log(res)
        msgsCountFromDb = res.insertId
        console.log(msgsCountFromDb)
      })
    })
  });

  //get messages from database
  socket.on("get msgs from db", (id, lId, limit) => { // LId = LocalStorage id
    conn.query(`SELECT from_id, to_id FROM friends WHERE from_id = '${id}' AND '${lId}' OR from_id = '${lId}' AND to_id = '${id}'`, (err, res) => {
      if (res.length <= 0) return
      conn.query(`SELECT * FROM ( SELECT * FROM messages WHERE (from_id = '${id}' AND to_id = '${lId}') OR (from_id = '${lId}' AND to_id = '${id}') ORDER BY ID DESC LIMIT ${limit} ) subquery ORDER BY ID ASC`, (err, res) => {
        conn.query(`SELECT * FROM users WHERE ID = '${id}'`, (err, ress) => {
          conn.query(`SELECT ID FROM messages WHERE from_id = '${id}' AND to_id = '${lId}' OR from_id = '${lId}' AND to_id = '${id}' LIMIT 1`, (errId, resId) => {
            if (resId[0] == undefined || resId[0] == null) {
              socket.emit("here msgs from db", res, ress);
            } else {
              socket.emit("here msgs from db", res, ress, resId[0]['ID']);
            }
          })
        })
      })
    })
  })

  // get all users to be displayed in search bar to be added as friends
  socket.on("prepare user search", (id) => {
    conn.query(`SELECT * FROM users WHERE ID != '${id}'`, (err, res) => {
      socket.emit("user search", res);
    })
  })

  //Add friend request
  socket.on("addFriend", (name, from_id) => {
    conn.query(`SELECT ID, Username, Status FROM users WHERE Username = '${name}'`, (err, res) => {
      if (err || res.length == 0) return
      conn.query(`SELECT from_id, to_id FROM friends WHERE from_id = '${res[0].ID}' AND to_id = '${from_id}' OR from_id = '${from_id}' AND to_id = '${res[0].ID}'`, (errorno, resulty) => {
        if (errorno) throw errorno
        if (resulty.length == 0) {
          conn.query(`INSERT INTO friends(from_id, to_id, status)VALUES('${from_id}','${res[0].ID}','1')`, (err, ress) => {
            socket.emit("friend added successfully", res);
          })
          if (usersList.has(res[0].ID.toString())) {
            var userInfo = res[0];
            conn.query(`SELECT ID, Username, Status FROM users WHERE ID = '${from_id}'`, (err, result) => {
              socket.to(usersList.get(userInfo.ID.toString()).socketId).emit("friend added you", result);
            })
          }
        }
      })
    })
  })

  // remove friend
  socket.on("removeFriend", (userid, username, friendId) => {
    if (friendId.length <= 0) return
    conn.query(`DELETE FROM friends WHERE from_id = '${userid}' AND to_id = '${friendId}' OR from_id = '${friendId}' AND to_id = '${userid}'`, (err, res) => {
      if (err) throw err
      conn.query(`DELETE FROM messages WHERE from_id = '${userid}' AND to_id = '${friendId}' OR from_id = '${friendId}' AND to_id = '${userid}'`, (err, res) => {
        if (err) throw err
        console.log(res)
        socket.emit("removeFriend succ", friendId)
        if (usersList.has(friendId)) {
          socket.to(usersList.get(friendId).socketId).emit("friend deleted you", userid, username)
        }
      })
    })
  })
  //on disconnect change status to offline
  socket.on("disconnecting", () => {
    //convert map to array to get the key from a value and update status by storing the object inside variable user
    let key = Array.from(usersList.keys()).find(k => usersList.get(k).socketId === socket.id);
    if (usersList.get(key) == undefined) return
    let user = usersList.get(key)
    user.status = 'Offline'
    usersList.set(key, user)
    conn.query(`UPDATE users SET Status = 'Offline' WHERE ID = '${key}'`, (err, res) => {
      if (err) throw err

      sendStatus(key, "Offline", socket)

    })
  })

  // Send typing indicator
  socket.on("typing", (sender, receiver, typing) => {
    if (sender == receiver) return
    if (typing == undefined) {
      typing = usersList.get(sender).status
    }
    if (usersList.has(receiver)) {
      io.to(usersList.get(receiver).socketId).emit("changeUserStatus", typing, sender)
    }
  })

  //groups 
  // Store group in the database then display it to all users that are in that group

  // socket.on("create group", (userids, groupName, id, creator) => {
  //   var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  //   var idsList = id;
  //   userids.forEach(element => {
  //      idsList += "," + element  
  //   });
  //   conn.query(`INSERT INTO groups(name, creator, users, date)VALUES('${groupName}', '${creator}', '${idsList}', '${date}')`, (err,res) => {
  //     if (err) throw err
  //     socket.emit() // display group for creator and then if others online then display for them too.
  //   })
  // })

  socket.on("deleteMsg", (msgId, receiver, sender) => {
    if (!usersList.has(receiver)) return
    if (usersList.get(sender).status != "Online") return
    socket.emit("message deleted", msgId, usersList.get(sender).username)
    conn.query(`UPDATE messages SET deleted = 1 WHERE ID = '${msgId}'`, (err, res) => {
      if (err) throw err
      console.log(res)
    })
    if (usersList.get(receiver).status != "Online") return
    io.to(usersList.get(receiver).socketId).emit("message deleted", msgId, usersList.get(sender).username)
  })

  socket.on("load more messages", (id, urlId, offset) => {
    if (urlId == undefined || urlId == null) return
    conn.query(`SELECT * FROM messages WHERE from_id = '${id}' AND to_id = '${urlId}' OR from_id = '${urlId}' AND to_id = '${id}' ORDER BY date DESC LIMIT 2 OFFSET ${offset}`, (err, res) => {
      socket.emit("load more messages now", res, usersList.get(urlId).username)
    })
  })
})

io.of("/settings").on('connection', (socket) => {

});

// send offline/online status to friends
function sendStatus(key, status, socket) {
  conn.query(`SELECT from_id, to_id FROM friends WHERE from_id = '${key}' OR to_id = '${key}'`, (erro, ress) => {
    if (erro) throw erro
    // send user status to all friends exept him
    ress.forEach(element => {
      let id = element.from_id == key ? element.to_id : element.from_id
      // if nobody from friends is online, don't send
      if (usersList.get(id.toString()) == undefined) return
      let getUserUid = usersList.get(id.toString())
      if (getUserUid.status == "Online") {
        io.to(getUserUid.socketId).emit("changeUserStatus", status, key)
      }
    });
  })
}


server.listen(port, () => {
  console.log('listening on *:' + port);
});