'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.all('/*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/products', function(req, res) {
  fs.readFile('./products.json', 'utf8', function(err, data) {
    res.send(data);
  });
  console.log('product list loaded');
});

app.get('/clients', function(req, res) {
  fs.readFile('./customers.json', 'utf8', function(err, data) {
    res.send(data);
  });
  console.log('client list loaded');
});

app.get('/orders', function(req, res) {
	fs.readdirAsync('./').filter(function(filename) {
		return !filename.indexOf('order')
	}).map(function (filename) {
    return fs.readFileAsync('./' + filename, "utf8");
	}).then(function (content) {
		res.send('[' + content.toString() + ']')
		console.log('order list loaded');
	});
});

app.post('/save-order', function(req, res) {
	fs.writeFileSync('./order' + req.body.id + '.json', JSON.stringify(req.body, null, '\t'), 'utf8')
});

app.listen(1112);
