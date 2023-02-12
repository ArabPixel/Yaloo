var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'ArabPixel',      // Replace with your database username
  password: 'yaman12othman',      // Replace with your database password
  database: 'my_chat_app', // // Replace with your database Name
  charset:  'utf8mb4'
}); 
 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;

// conn.query("SELECT * FROM users WHERE name = ArabPixel", (error, respond) =>{
//   console.log(respond[0].name);
// });
