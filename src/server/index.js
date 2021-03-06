// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

// Requiring Fetch
const fetch = require('node-fetch');


// Cors for cross origin allowance
const cors = require('cors');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


const dotenv = require('dotenv');
dotenv.config();
//console.log(process.env) // remove this after you've confirmed it working

// Initialize the main project folder
app.use(express.static('dist'));

const port = 8000;
// Spin up the server
const server = app.listen(port, listening);

function listening() {
    // Callback to debug
    console.log(`running on localhost: ${port}`);
};

// Post Route

// Initialize all route with a callback function
app.get('/all', getData);

// Callback function to complete GET '/all'
function getData(req, res) {
    res.send(projectData);
}

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

//Get the Trip Data
app.post('/getCountry', async function (req, res) {
    const username = process.env.geo_username;
    const city = req.body.value.city;
    //Call The Geonames Api to get the lat & long data of the destination.
    const url = `http://api.geonames.org/searchJSON?name=${city}&maxRows=1&username=${username}`;
    const countrydata = await fetch(url);
    const jsondata = await countrydata.json();
    console.log(jsondata);
    const data = jsondata.geonames[0];
    console.log("Country Data");
    console.log(data);
    if (data == null) {
        return res.status(404).json({ Validation: "We Couldn't find a city with this name, please try again" });
    }
    else {
            //Call The Weatherbit Api to get the Weather data of the destination.
        const wurl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&&lat=${data.lat}&lon=${data.lng}&key=${process.env.weather_apiKey}`;
        const weather = await fetch(wurl);
        const jsonwdata = await weather.json();
        const dateday = req.body.value.day;
        console.log("weatherdata");
        console.log(weather);
        console.log(jsonwdata);
        const wdata = jsonwdata.data[dateday];
       console.log(wdata);
        if (wdata == null) {
            return res.status(404).json({ Validation: "An error occured, please check your input" });
        }
        else {
            //Add the weather Data to the ProjectData object. 
            projectData["hightemp"] = wdata.max_temp;
            projectData["lowtemp"] = wdata.low_temp;
            //console.log(wdata.weather.description);
            projectData["forecast"] = wdata.weather.description;
                //Call The PixaBay Api to get a photo of the destination.
            const purl = `https://pixabay.com/api/?key=${process.env.pixi_Api}&q=${city}&image_type=photo`;
            console.log("The url is ", purl);
            const photoData = await fetch(purl);
            const jsonpdata = await photoData.json();
            projectData["photoData"] = jsonpdata;
            res.send(projectData);
        }

    }
})