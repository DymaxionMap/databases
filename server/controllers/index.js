var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
        .then(results => {
          res.status(200).send(JSON.stringify(results));
        })
        .catch(err => {
          console.log(err);
          res.status(404).send('Sorry cannot find messages');
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body)
        .then(() => {
          res.status(201).send('Message posted');
        });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get()
        .then(results => {
          res.status(200).send(JSON.stringify(results));
        })
        .catch(err => {
          console.log(err);
          res.status(404).send('Sorry cannot find users');
        });
    },
    post: function (req, res) {
      models.users.post(req.body)
        .then(() => {
          res.status(201).send('User added');
        })
        .catch(err => {
          res.status(500).send('Cannot add user');
        });
    }
  }
};

