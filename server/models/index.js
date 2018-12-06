var db = require('../db');
var mysql = require('mysql');

let promiseQuery = (queryString) => new Promise((resolve, reject) => {
  db.dbConnection.query(queryString, (err, results, fields) => {
    if (err) {
      reject(err);
    }
    resolve(results);
  });
});

module.exports = {
  messages: {
    get: function () {
      db.dbConnection.connect();
      
      db.dbConnection.end();
    }, // a function which produces all the messages
    post: function (data) {
      // db.dbConnection.connect();
      // let username = data.username; //need to double check
      // let userSql = `SELECT id FROM users WHERE name=${username}`;
      // let userId;
      // let roomname = data.roomname;
      // let roomSql = `SELECT id FROM rooms WHERE name=${roomname}`;
      // let roomId;
      
      // promiseQuery(userSql)
      //   .then(results => {
      //     if (results.length === 0) {
      //       console.log('user was not found')
      //       let newUserSql = `INSERT INTO users (name)
      //             VALUES('${username}')`;
      //       promiseQuery(newUserSql)
      //         .then(() => {
      //           console.log('created new user');
      //           console.log('we are inside 2nd query callback');
      //         });
      //     } else {
      //       userId = results[0].id;
      //       console.log('userId:', userId);
      //     }
      //   })
      //   .then(() => {
      //     return promiseQuery(roomSql)
      //   })
      //   .then(results => {
      //     if (results.length === 0) {
      //       console.log('room was not found')
      //       let newRoomSql = `INSERT INTO rooms (name)
      //             VALUES('${roomname}')`;
      //       promiseQuery(newRoomSql)
      //         .then(() => {
      //           console.log('created new room');
      //           console.log('we are inside 2nd query callback');
      //           db.dbConnection.end();
      //         });
      //     } else {
      //       roomId = results[0].id;
      //       console.log('roomId:', roomId);
      //       db.dbConnection.end();
      //     }
      //   })
          
      // db.dbConnection.query(userSql, (err, results, fields) => {
      //   if (err) { 
      //     throw err;
      //   }
      //   if (results.length === 0) {
      //     let newUserSql = `INSERT INTO users (name)
      //           VALUES(${username})`;
      //     db.dbConnection.query(newUserSql, (err, results, fields) => {
      //       if (err) { 
      //         throw err;
      //       }
      //       let getNewUserIdSql = `SELECT id FROM users WHERE name=${username}`;
      //       db.dbConnection.query(newUserIdSql, (err, results, fields) => {
      //         if (err) { 
      //           throw err;
      //         }
      //         userId = results[0].id;
      //       });
      //     });
      //   } else {
      //     userId = results[0].id;
      //   }
      // });
      
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

