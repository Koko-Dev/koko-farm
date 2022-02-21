const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require("path");



const server = http.createServer((req, res) => {
	console.log(req.url);

	const path_name = req.url;

	if (path_name === '/store' || path_name === '/') {
		res.end('Welcome to the Store!');
	} else if (path_name === '/item') {
		res.end('This is your Item Page!')
	} else {
		res.writeHead(404);
		res.end('Page Not Found!');
	}


	// res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
	console.log('Listening to requests from client on port 8000');
})