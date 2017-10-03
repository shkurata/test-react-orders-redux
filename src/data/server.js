'use strict';

var express = require('express');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
// var async = require('async');
var app = express();


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
	})
	.map(function (filename) {
    return fs.readFileAsync('./' + filename, "utf8");
	}).then(function (content) {
		res.send('[' + content.toString() + ']')
		console.log('order list loaded');
	});
  // var files = ['./order1.json', './order2.json', './order3.json'];
	// async.map(files, fs.readFile, function(err, data) {
	// 	if (err) {
	// 		throw err;
	// 	}
	// 	res.send('['+ data.toString() + ']');
	// });
	// console.log('order list loaded');
});



app.listen(1112);
