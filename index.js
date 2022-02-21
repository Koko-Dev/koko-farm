const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require("path");

const server = http.createServer((req, res) => {
	console.log(req.url);

	const path_name = req.url;

	if (path_name === '/store' || path_name === '/') {
		res.writeHead(200, {
			"Content-type": "text/html"
		});
		res.end('<h1>Welcome to the Store!</h1>');
	} else if (path_name === '/item') {
		res.writeHead(200, {
			"Content-type": "text/html"
		});
		res.end('<h1>This is your Item Page!</h1>')
	} else {
		res.writeHead(404, {
			"Content-type": "text/html"
		});
		res.end('<h1>Page Not Found!</h1>');
	}

	// res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
	console.log('Listening to requests from client on port 8000');
})