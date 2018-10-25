var twit = require('twit');
var config = require('./config.js');
var request = require('request');

var twitter = new twit(config);

console.log('Success!!!');

var tracking = [
	'2568138684', 						// xtradersapp
	'2312333412', 						// ethereum
	'4826209539',						// Verge
	'4135644558',						// Cardano
	'2592325530',						// NEO
	'2338506822',						// Dash
	'1051053836',						// Ripple
	'1393174363',						// Litecoin		
	'4633094778',						// ZCash		
	'3992601857',						// IOTA Token		
	'900959551263985665', 				// inschain
	'773009781644677120',				// Qtum		
	'831847934534746114',				// Omise Go	
	'759252279862104064'				// ethereum classic
];

// same result as doing { track: 'etherem','xtradersapp','inschain', }
var stream = twitter.stream('statuses/filter', { follow: tracking })

stream.on('tweet', function (tweet) {
	if (isReply(tweet)) {
		return;	
	}
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
		else console.log('send message to discord successful');
	});
})

stream.on('error',function(error){
	console.log(error);
})


function isReply(tweet) {
  if ( tweet.retweeted_status
    || tweet.in_reply_to_status_id
    || tweet.in_reply_to_status_id_str
    || tweet.in_reply_to_user_id
    || tweet.in_reply_to_user_id_str
    || tweet.in_reply_to_screen_name )
    return true
}