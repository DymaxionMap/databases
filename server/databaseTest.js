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

let data = {username: 'stephen', roomname: 'roof', text: 'hi guys'};


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
      promiseQuery(newUserSql)
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
      promiseQuery(newRoomSql)
        .then(() => {
          console.log('created new room');
          console.log('we are inside 2nd query callback');
          let getNewRoomIdSql = `SELECT id FROM rooms WHERE name='${roomname}'`;
          return promiseQuery(getNewRoomIdSql);
        })
        .then(results => {
          roomId = results[0].id;
          console.log('roomId:', roomId);
          db.dbConnection.end();
        });
    } else {
      roomId = results[0].id;
      console.log('roomId:', roomId);
      db.dbConnection.end();
    }
  });
  
// let userSql = 'SELECT * FROM users';
// db.dbConnection.query(userSql, (err, results, fields) => {
//   console.log('hello');
//   if (err) { 
//     throw err;
//   }
// });

// let username = data.username; //need to double check
// let userSql = `SELECT id FROM users WHERE name='${username}'`;
// console.log(userSql);
// let userId;

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
//           db.dbConnection.end();
//         });
//     } else {
//       userId = results[0].id;
//       console.log('userId:', userId);
//       db.dbConnection.end();
//     }
//   });

// queryAsync(userSql)
//   .then(results => {
//     if (results.length === 0) {
//       console.log('user was not found')
//       let newUserSql = `INSERT INTO users (name)
//             VALUES('${username}')`;
//       queryAsync(newUserSql)
//         .then(() => {
//           console.log('created new user');
//           console.log('we are inside 2nd query callback');
//           db.dbConnection.end();
//         });
//     } else {
//       userId = results[0].id;
//       console.log('userId:', userId);
//       db.dbConnection.end();
//     }
//   });

// db.dbConnection.query(userSql, (err, results, fields) => {
//   if (err) { 
//     throw err;
//   }
//   console.log(results);
//   if (results.length === 0) {
//     console.log('user was not found')
//     let newUserSql = `INSERT INTO users (name)
//           VALUES('${username}')`;
//     db.dbConnection.query(newUserSql, (err, results, fields) => {
//       if (err) {
//         console.log('err:', err);
//         throw err;
//       } 
      
//       console.log('we are inside 2nd query callback')
//       console.log('insert results:', results);
//       db.dbConnection.end();
//     });
//   } else {
//     userId = results[0].id;
//     console.log('userId:', userId);
//     db.dbConnection.end();
//   }
// });

    
// db.dbConnection.query(userSql, (err, results, fields) => {
//   if (err) { 
//     throw err;
//   }
//   if (results.length === 0) {
//     let newUserSql = `INSERT INTO users (name)
//           VALUES('${username}')`;
//     db.dbConnection.query(newUserSql, (err, results, fields) => {
//       if (err) { 
//         throw err;
//       }
//       let getNewUserIdSql = `SELECT id FROM users WHERE name='${username}'`;
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
  
//   console.log('userId:', userId);
// });

// let sql = `INSERT INTO messages (user, room, text)
//           VALUES(${data.username})`

 