// var db = require('../db');
// var mysql = require('mysql');
var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'student', 'student');

var Users = db.define('Users', {
  username: Sequelize.STRING
});

var Rooms = db.define('Rooms', {
  roomname: Sequelize.STRING
});

var Messages = db.define('Messages', {
  messageText: Sequelize.STRING,
  createdAt: Sequelize.STRING
});

Messages.belongsTo(Users);
Users.hasMany(Messages);

Messages.belongsTo(Rooms);
Rooms.hasMany(Messages);

Users.sync();
Rooms.sync();
Messages.sync();

exports.Users = Users;
exports.Rooms = Rooms;
exports.Messages = Messages;

