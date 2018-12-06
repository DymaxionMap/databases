// var express = require('express');
// var db = require('./db');

// // Middleware
// var morgan = require('morgan');
// var parser = require('body-parser');

// // Router
// // var router = require('./routes.js');

// var app = express();
// module.exports.app = app;

// // Set what we are listening on.
// app.set('port', 3000);

// // Logging and parsing
// app.use(morgan('dev'));
// app.use(parser.json());

// // Set up our routes
// // app.use('/classes', router);

// // Serve the client files
// app.use(express.static(__dirname + '/../client'));

// app.post('classes/messages', function (req, res) {
//       // Get all the info from the request
//       console.log(req);
//       console.log('body:', req.body);
//       // call model messages.post(info)
//     } // a function which handles posting a message to the database);

// // If we are being run directly, run the server.
// if (!module.parent) {
//   app.listen(app.get('port'));
//   console.log('Listening on', app.get('port'));
// }


