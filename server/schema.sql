CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id int AUTO_INCREMENT PRIMARY KEY,
  user varchar(255),
  room varchar(255), 
  messageText text
  FOREIGN KEY(user) references users(id),
  FOREIGN KEY(room) references rooms(id)
  /* this is our main table that contains all the messages data.*/
);

CREATE TABLE users (
  id int AUTO_INCREMENT PRIMARY KEY,
  name varchar(255)
  /* this is our user data table.*/
);

CREATE TABLE rooms (
  id int AUTO_INCREMENT PRIMARY KEY,
  name varchar(255)

  /* this is our room data table.*/
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

