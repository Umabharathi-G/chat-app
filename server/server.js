const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

var app = express();
const port = process.env.PORT || 8080;

app.use(express.static(publicPath));

app.get('/', (req, res) => {

});

app.listen(port, () => {
	console.log(`Server is up and running on ${port}`);

});