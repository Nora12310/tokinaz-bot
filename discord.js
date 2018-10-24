var request = require('request');

var url = '';


function post(payload){
	request.post(url, payload, function(error, response, body){
		if (error) console.log("send failed");
		else console.log("send to discord successfull");
	})
}

module.exports = this;