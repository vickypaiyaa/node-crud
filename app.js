'use strict';

var express = require('express');
var app = express();
var rooms = require('./rooms.json');
var uuid = require('node-uuid');
var bodyParser = require('body-parser');

app.set('views', './views');
app.set('view engine', 'jade');

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({ extender:true }));

app.get('/', function(req, res, next) {
	res.render('index', {title:"Home"});
});

app.get('/rooms', function(req, res, next) {
	res.render('rooms', {title:"Admin Rooms", rooms:rooms});
});

app.get('/rooms/add', function(req, res, next) {
	res.render('add');
});

app.post('/rooms/add', function(req, res, next) { //post data
	var room = {
		name: req.body.name,
		id: uuid.v4()
	};
	//res.send('Nothing');

	rooms.push(room);
	res.redirect('/rooms');
});

app.listen(3000, function() {
	console.log('Application Listening 3000 port');
});
