// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

// Cors for cross origin allowance
const cors = require('cors');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;
// Spin up the server
const server = app.listen(port, listening);

function listening() {
    // Callback to debug
    console.log(`running on localhost: ${port}`);
};

// Post Route
app.post('/addTemp', addTempData);

function addTempData(req, res) {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.Temp;
    projectData['Mode'] = req.body.Mode;
    projectData['City'] = req.body.City;
    res.send(projectData);
}

// Initialize all route with a callback function
app.get('/all', getData);

// Callback function to complete GET '/all'
function getData(req, res) {
    res.send(projectData);
}
