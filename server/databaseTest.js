var db = require('./db');
var mysql = require('mysql');

db.dbConnection.connect();
let userSql = 'SELECT * FROM users';
db.dbConnection.query(userSql, (err, results, fields) => {
  console.log('hello');
  if (err) { 
    throw err;
  }
});

// let sql = `INSERT INTO messages (user, room, text)
//           VALUES(${data.username})`
db.dbConnection.end();
 