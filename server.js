const { Console } = require('console');
const { captureRejectionSymbol } = require('events');
const express = require('express');
const app = express();
const http = require('http');
const { stringify } = require('querystring');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { resume } = require('./db/db');
const conn = require('./db/db');
const io = new Server(server);
const port = 80;


app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/client/login.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/client/register.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/test', (req, res) => {
  res.sendFile(__dirname + '/client/groups.html');
});

// var ip = req.socket.remoteAddress; get user ip (migt be used later).

var usersList = new Map();

io.on("connection", (socket) => {
  //set username and id 
  socket.on("update my socketID", (username, id) => {
    usersList.set(id, { username: username, socketId: socket.id, status: "Online" })
    sendStatus(id, "Online", socket)
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
  socket.on("sent message", (msg, reciever, sender) => {
    conn.query(`SELECT from_id, to_id FROM friends WHERE from_id = '${reciever}' AND to_id = '${sender}' OR from_id = '${sender}' AND to_id = '${reciever}'`, (err, res) => {
      if (res.length <= 0) return
      var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
      if (usersList.has(reciever)) {
        var userInfo = usersList.get(reciever);
        io.to(userInfo.socketId).emit("message recive", msg, reciever, sender, usersList.get(sender).username, date);
      }
      conn.query(`INSERT INTO messages(from_id, to_id, msg, date)VALUES('${sender}', '${reciever}', '${msg}', '${date}')`, (err, res) => {
        if (err) throw err;
      })
    })
  });

  //get messages from database
  socket.on("get msgs from db", (id, lId) => {
    conn.query(`SELECT from_id, to_id FROM friends WHERE from_id = '${id}' AND '${lId}' OR from_id = '${lId}' AND to_id = '${id}'`, (err, res) => {
      if (res.length <= 0) return
      conn.query(`SELECT * FROM messages WHERE from_id = '${id}' AND to_id = '${lId}' OR from_id = '${lId}' AND to_id = '${id}'`, (err, res) => {
        conn.query(`SELECT * FROM users WHERE ID = '${id}'`, (err, ress) => {
          socket.emit("here msgs from db", res, ress);
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
      if (err || res.length == 0) { socket.emit("removeFriend", err); } else {
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
          } else {
            socket.emit("removeFriend", errorno)
          }
        })
      }
    })
  })

  // remove friend
  socket.on("removeFriend", (userid, username, friendId) => {
    if (friendId.length <= 0) return
    conn.query(`DELETE FROM friends WHERE from_id = '${userid}' AND to_id = '${friendId}' OR from_id = '${friendId}' AND to_id = '${userid}'`, (err, res) => {
      if (err) throw err
      conn.query(`DELETE FROM messages WHERE from_id = '${userid}' AND to_id = '${friendId}' OR from_id = '${friendId}' AND to_id = '${userid}'`, (err, res) => {
        if (err) throw err
        socket.emit("removeFriend succ", friendId)
        if (usersList.has(friendId)) {
          socket.to(usersList.get(friendId).socketId).emit("friend deleted you", userid, username)
        }
      })
    })
  })
  //on disconnect chage status to offline
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
})

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
        socket.to(getUserUid.socketId).emit("changeUserStatus", status, key)
      }
    });
  })
}


server.listen(port, () => {
  console.log('listening on *:' + port);
});