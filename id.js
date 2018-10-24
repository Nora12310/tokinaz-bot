var twit = require('twit');
var config = require('./config.js');
var request = require('request');

var twitter = new twit(config);

console.log('Success!!!');

twitter.get('lists/list',{screen_name:'xtradersapp'},function(tweet){
	console.log(tweet);
});
