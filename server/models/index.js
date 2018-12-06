var db = require('../db');
var mysql = require('mysql');


module.exports = {
  messages: {
    get: function () {
      db.dbConnection.connect();
      
      db.dbConnection.end();
    }, // a function which produces all the messages
    post: function (data) {
      db.dbConnection.connect();
      let username = data.username; //need to double check
      let userSql = `SELECT id FROM users WHERE name=${username}`;
      let userId;
      // db.dbConnection.query(userSql, (err, results, fields) => {
      //   if (err) throw err;
      //   if (results.length === 0) {
      //     let newUserSql = `INSERT INTO users (name)
      //           VALUES(${username})`;
      //     db.dbConnection.query(newUserSql, (err, results, fields) => {
      //       if (err) throw err;
      //       let getNewUserIdSql = `SELECT id FROM users WHERE name=${username}`;
      //       db.dbConnection.query(newUserIdSql, (err, results, fields) => {
      //         if (err) throw err;
      //         userId = results[0].id;
      //       }
      //     });      
      //   } else {
      //     userId = results[0].id;
      //   }
      // });
          
      db.dbConnection.query(userSql, (err, results, fields) => {
        if (err) { 
          throw err;
        }
        if (results.length === 0) {
          let newUserSql = `INSERT INTO users (name)
                VALUES(${username})`;
          db.dbConnection.query(newUserSql, (err, results, fields) => {
            if (err) { 
              throw err;
            }
            let getNewUserIdSql = `SELECT id FROM users WHERE name=${username}`;
            db.dbConnection.query(newUserIdSql, (err, results, fields) => {
              if (err) { 
                throw err;
              }
              userId = results[0].id;
            });
          });
        } else {
          userId = results[0].id;
        }
      });
      
      let roomname = data.roomname;
      let roomSql = `SELECT id FROM rooms WHERE name=${roomname}`;
      let roomId;
      db.dbConnection.query(roomSql, (err, results, fields) => {
        if (err) { 
          throw err;
        }
        if (results.length === 0) {
          let newRoomSql = `INSERT INTO rooms (name)
                VALUES($roomname})`;
          db.dbConnection.query(newRoomSql, (err, results, fields) => {
            if (err) { 
              throw err;
            }
            let getNewRoomIdSql = `SELECT id FROM rooms WHERE name=${roomname}`;
            db.dbConnection.query(newRoomIdSql, (err, results, fields) => {
              if (err) { 
                throw err;
              }
              roomId = results[0].id;
            });
          });      
        } else {
          roomId = results[0].id;
        }
      });
     
     
     
      let sql = `INSERT INTO messages (user, room, text)
                VALUES(${data.username})`;
                
      db.dbConnection.end();
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

