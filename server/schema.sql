DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

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

CREATE TABLE messages (
  id int AUTO_INCREMENT PRIMARY KEY,
  user int,
  room int, 
  messageText text,
  FOREIGN KEY (user) REFERENCES users (id),
  FOREIGN KEY (room) REFERENCES rooms (id)
  /* this is our main table that contains all the messages data.*/
);



/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

