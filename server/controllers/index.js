var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.Messages.findAll({include: [models.Users, models.Rooms]})
        .then(results => {
          res.status(200).send(JSON.stringify(results));
        })
        .catch(err => {
          console.log(err);
          res.status(404).send('Sorry cannot find messages');
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.Users.findOrCreate({where: {username: req.body.username}})
        .spread((user, created) => {
          models.Rooms.findOrCreate({where: {roomname: req.body.roomname}})
            .spread((room, created) => {
              models.Messages.create({
                userid: user.get('id'),
                roomid: room.get('id'),
                messageText: req.body.text,
                createdAt: new Date()
              })
                .then(() => res.sendStatus(201));
            });
        });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.Users.findAll()
        .then(results => {
          res.status(200).send(JSON.stringify(results));
        })
        .catch(err => {
          console.log(err);
          res.status(404).send('Sorry cannot find users');
        });
    },
    post: function (req, res) {
      models.Users.findOrCreate({ where: {username: req.body.username } })
        .spread((user, created) => {
          res.sendStatus(created ? 201 : 200);
        })
        .fail(err => {
          res.status(500).send('Cannot add user');
        });
    }
  }
};

