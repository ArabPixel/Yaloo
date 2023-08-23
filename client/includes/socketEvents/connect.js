// @ts-ignore
import { socket } from '/includes/sharedContent'
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