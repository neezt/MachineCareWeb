const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

// settings
app.set('port',  3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');

// middlewares
//app.use(morgan('dev'));

var serviceAccount = require("./account.json");

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://machinecare-17c7a.firebaseio.com"
});

// routes
app.use(require('./routes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// listening the Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});