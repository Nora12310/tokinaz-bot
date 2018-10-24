var twit = require('twit');
var config = require('./config.js');
var request = require('request');

var twitter = new twit(config);

console.log('Success!!!');

twitter.get('lists/members',{slug:'news',owner_screen_name:'xtradersapp'},function(tweet){
	console.log(tweet)
});

// same result as doing { track: 'bananas,oranges,strawberries' }
var stream = twitter.stream('statuses/filter', { follow:['2568138684','2312333412']})

stream.on('tweet', function (tweet) {
	var url = 'https://discordapp.com/api/webhooks/387460095874826252/3ibDvP6j0-wIRY509WFJZU10sgf0VFrHFJnxOjJLiW-uX9XLMRmi4Fz4Ht06BselxgUM';
 	
	var options = {
  		uri: url,
  		method:'POST',
  		json: true,
  		headers: {'Content-type': 'application/json'},
  		form: {
			'content': tweet.text,
			'username': tweet.user.name,
			'avatar_url':tweet.user.profile_image_url_https,
			'tts':false
		}
	};

	request(options, function(error, response, body){
		if (error) console.log('send message failed');
		else console.log('send message to discord successful: '+ JSON.stringify(tweet));
	});
})

stream.on('error',function(error){
	console.log(error);
})