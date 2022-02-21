const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require("path");

// Todo: Read and Parse data.json file
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf8');
const parsed_data = JSON.parse(data);

// Todo: Read all templates
const store_template = fs.readFileSync(
	`${__dirname}/templates/store.html`,
	'utf8'
);
const item__template = fs.readFileSync(
	`${__dirname}/data/item.html`,
	'utf8'
);

// Todo:  Create Server
const server = http.createServer((req, res) => {
	console.log(req.url);

	const path_name = req.url;

	// Store front
	if (path_name === '/store' || path_name === '/') {
		res.writeHead(200, {
			"Content-type": "text/html"
		});
		res.end('<h1>Welcome to the Store!</h1>');

		// Item Page
	} else if (path_name === '/item') {
		res.writeHead(200, {
			"Content-type": "text/html"
		});
		res.end('<h1>This is your Item Page!</h1>')

		// API
	} else if (path_name === '/api') {
		res.writeHead(200, {
			"Content-Type": "application/json"
		})
		res.end(data);

		// All other Incorrect URLs
	} else {
		res.writeHead(404, {
			"Content-type": "text/html"
		});
		res.end('<h1>Page Not Found!</h1>');
	}

	// res.end('Hello from the server!');
});

// Todo:  Create Listener
server.listen(8000, '127.0.0.1', () => {
	console.log('Listening to requests from client on port 8000');
})