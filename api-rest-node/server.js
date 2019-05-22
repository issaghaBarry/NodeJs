//import
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;
const api = require('./appi');

server.use('/', api);

server.listen(PORT, ()=>{
	console.log('je marche');
})