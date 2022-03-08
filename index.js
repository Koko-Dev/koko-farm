const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require("path");
const template_replacement = require('./handlers/template_replacement');
const slugify = require('slugify');

// Todo: Read and Parse data.json file
let data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf8');
let parsed_data = JSON.parse(data);


// todo:  Create an array of all the slugs
const slugs = parsed_data.map(el => slugify(el.itemName, {lower: true}));
/*  OUTPUT:
 [
 'grapes',
 'tomatoes',
 'lemons',
 'mango',
 'sweet-potatoes',
 'pineapple',
 'cucumber',
 'cayenne-pepper'
 ] */
// console.log(slugs);

/*
 FIXME: Replace item id with slug
 TODO:
 1. Add slug to each object in array,
 2. change href attribute inside of card_template,
 3. update the output inside of template_replacement
 4. implement the path to the item page */

// Todo: Read all templates

parsed_data.forEach((el, index) => {
	el["slug"] = slugs[index];
})

const store_template = fs.readFileSync(
	`${__dirname}/templates/store.html`,
	'utf8'
);
const item_template = fs.readFileSync(
	`${__dirname}/templates/item.html`,
	'utf8'
);
const card_template = fs.readFileSync(
	`${__dirname}/templates/card.html`,
	'utf8'
);

// Todo:  Create Server
const server = http.createServer((req, res) => {
	console.log('I am req.url', req.url);
	const path_name = req.url;


	// Store front
	if (path_name === '/store' || path_name === '/') {
		res.writeHead(200, {
			"Content-type": 'text/html'
		})
		const item_cards = parsed_data
			.map(card_element => template_replacement(card_template, card_element))
			.join('');
		const store_output = store_template
			.replace('{%ITEM_CARDS%}', item_cards);
		res.end(store_output);

		// Item Page
	} else if (path_name === '/item') {
		res.writeHead(200, {
			"Content-type": "text/html"
		});

		res.end(item_template);

		// API
	} else if (path_name === '/api') {
		res.writeHead(200, {
			"Content-Type": "application/json"
		})
		res.end(data);

		// All URLs with id in the query string
	} else if (path_name.includes('id')) {
		const query = req.url.split('?')[1]; // id=mango
		const itemID = query.split("=")[1];  // mango
		const item = parsed_data.filter(el => {
			return el.slug === itemID;
		})
		let output = template_replacement(item_template, item[0]);
		res.end(output);

		// All other Incorrect URLs
	} else {
		res.writeHead(404, {
			"Content-type": "text/html"
		});
		res.end('<h1>Page Not Found!</h1>');
	}
});

// Todo:  Create Listener
server.listen(8000, '127.0.0.1', () => {
	console.log('Listening to requests from client on port 8000');
})