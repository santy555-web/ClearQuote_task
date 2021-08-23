var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/db');

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    next();
});
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());

require('./app/api.js')(app);

app.listen(port);
console.log("App listening on port " + port);
