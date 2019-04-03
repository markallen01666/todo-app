// ToDo app - NodeJS demonstration using Express, MongoDB, Mongoose, Ejs, and Body-Parser
// M. Allen 2019

var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// Template engine
app.set('view engine', 'ejs');

// Use static files from public folder
app.use(express.static('./public'));

// Initialise controllers
todoController(app);

// Listen to port 3000
app.listen(3000);
console.log('Loaded... Listening to port: 3000,', Date());



