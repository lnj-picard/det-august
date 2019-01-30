const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

//set up the app
const app = express();

//set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

//dialogflow backend routes
require('./routes/dialogFlowRoutes.js')(app);

//start backend server
app.listen(5000);
