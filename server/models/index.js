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
      let username = data.username; //need to double check
      let userSql = `SELECT id FROM users WHERE name='${username}'`;
      let userId;
      let roomname = data.roomname;
      let roomSql = `SELECT id FROM rooms WHERE name='${roomname}'`;
      let roomId;

      promiseQuery(userSql)
        .then(results => {
          if (results.length === 0) {
            let newUserSql = `INSERT INTO users (name)
                  VALUES('${username}')`;
            return promiseQuery(newUserSql)
              .then(() => {
                let getNewUserIdSql = `SELECT id FROM users WHERE name='${username}'`;
                return promiseQuery(getNewUserIdSql);
              })
              .then(results => {
                userId = results[0].id;
              });
          } else {
            userId = results[0].id;
          }
        })
        .then(() => {
          return promiseQuery(roomSql);
        })
        .then(results => {
          if (results.length === 0) {
            let newRoomSql = `INSERT INTO rooms (name)
                  VALUES('${roomname}')`;
            return promiseQuery(newRoomSql)
              .then(() => {
                let getNewRoomIdSql = `SELECT id FROM rooms WHERE name='${roomname}'`;
                return promiseQuery(getNewRoomIdSql);
              })
              .then(results => {
                roomId = results[0].id;
              });
          } else {
            roomId = results[0].id;
          }
        })
        .then(() => {
          let date = new Date();
          let createMessageSql = `INSERT INTO messages (user, room, messageText, createdAt)
                                  VALUES (${userId}, ${roomId}, '${data.text}', '${date}')`;
          promiseQuery(createMessageSql)
            .then(() => {
              db.dbConnection.end();
            });
        });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

