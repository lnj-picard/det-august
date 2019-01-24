const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = http.Server(app);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

require('./routes/dialogFlowRoutes.js')(app);


//start backend server
app.listen(3000, () => {
	console.log('Server started on port 3000');
});
