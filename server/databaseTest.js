var db = require('./db');
var mysql = require('mysql');
// var Promise = require('bluebird');

// let queryAsync = Promise.promisify(db.dbConnection.query);

db.dbConnection.connect();

let promiseQuery = (queryString) => new Promise((resolve, reject) => {
  db.dbConnection.query(queryString, (err, results, fields) => {
    if (err) {
      reject(err);
    }
    resolve(results);
  });
});

let data = {username: 'mary', roomname: 'bedroom', text: 'hi guys'};


let username = data.username; //need to double check
let userSql = `SELECT id FROM users WHERE name='${username}'`;
let userId;
let roomname = data.roomname;
let roomSql = `SELECT id FROM rooms WHERE name='${roomname}'`;
let roomId;

promiseQuery(userSql)
  .then(results => {
    if (results.length === 0) {
      console.log('user was not found');
      let newUserSql = `INSERT INTO users (name)
            VALUES('${username}')`;
      return promiseQuery(newUserSql)
        .then(() => {
          console.log('created new user');
          console.log('we are inside 2nd query callback');
          let getNewUserIdSql = `SELECT id FROM users WHERE name='${username}'`;
          return promiseQuery(getNewUserIdSql);
        })
        .then(results => {
          userId = results[0].id;
          console.log('userId:', userId);
        });
    } else {
      userId = results[0].id;
      console.log('userId:', userId);
    }
  })
  .then(() => {
    return promiseQuery(roomSql);
  })
  .then(results => {
    if (results.length === 0) {
      console.log('room was not found');
      let newRoomSql = `INSERT INTO rooms (name)
            VALUES('${roomname}')`;
      return promiseQuery(newRoomSql)
        .then(() => {
          console.log('created new room');
          console.log('we are inside 2nd query callback');
          let getNewRoomIdSql = `SELECT id FROM rooms WHERE name='${roomname}'`;
          return promiseQuery(getNewRoomIdSql);
        })
        .then(results => {
          roomId = results[0].id;
          console.log('roomId:', roomId);
        });
    } else {
      roomId = results[0].id;
      console.log('roomId:', roomId);
    }
  })
  .then(() => {
    let date = new Date();
    let createMessageSql = `INSERT INTO messages (user, room, messageText, createdAt)
                            VALUES (${userId}, ${roomId}, '${data.text}', '${date}')`;
    console.log(createMessageSql);
    promiseQuery(createMessageSql)
      .then(() => {
        console.log('Finish message');
        db.dbConnection.end();
      });
  });

// promiseQuery(userSql)
//   .then(results => {
//     if (results.length === 0) {
//       console.log('user was not found');
//       let newUserSql = `INSERT INTO users (name)
//             VALUES('${username}')`;
//       promiseQuery(newUserSql)
//         .then(() => {
//           console.log('created new user');
//           console.log('we are inside 2nd query callback');
//           let getNewUserIdSql = `SELECT id FROM users WHERE name='${username}'`;
//           return promiseQuery(getNewUserIdSql);
//         })
//         .then(results => {
//           userId = results[0].id;
//           console.log('userId:', userId);
//         });
//     } else {
//       userId = results[0].id;
//       console.log('userId:', userId);
//     }
//   })
//   .then(() => {
//     return promiseQuery(roomSql);
//   })
//   .then(results => {
//     if (results.length === 0) {
//       console.log('room was not found');
//       let newRoomSql = `INSERT INTO rooms (name)
//             VALUES('${roomname}')`;
//       promiseQuery(newRoomSql)
//         .then(() => {
//           console.log('created new room');
//           console.log('we are inside 2nd query callback');
//           let getNewRoomIdSql = `SELECT id FROM rooms WHERE name='${roomname}'`;
//           return promiseQuery(getNewRoomIdSql);
//         })
//         .then(results => {
//           roomId = results[0].id;
//           console.log('roomId:', roomId);
//         });
//     } else {
//       roomId = results[0].id;
//       console.log('roomId:', roomId);
//     }
//   })
//   .then(() => {
//     let date = new Date();
//     let createMessageSql = `INSERT INTO messages (user, room, messageText, createdAt)
//                             VALUES (${userId}, ${roomId}, '${data.text}', '${date}')`;
//     console.log(createMessageSql);
//     promiseQuery(createMessageSql)
//       .then(() => {
//         console.log('Finish message');
//         db.dbConnection.end();
//       });
//   });
