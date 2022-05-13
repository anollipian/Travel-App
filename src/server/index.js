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


console.log(`Your API key is ${process.env.oldWeatherApi}`);

const BASE_API_URL = "https://api.meaningcloud.com/sentiment-2.1";
const textapi = process.env.oldWeatherApi;
console.log("textapi", textapi)


// Post Route
app.post('/addTemp', addTempData);

function addTempData(req, res) {
    console.log("we are here");
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.Temp;
    projectData['Mode'] = req.body.Mode;
    projectData['City'] = req.body.City;
    console.log("the project data")
    res.send(projectData);
}

// Initialize all route with a callback function
app.get('/all', getData);

// Callback function to complete GET '/all'
function getData(req, res) {
    res.send(projectData);
}

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

/*app.post('/getWeather', async function (req, res) {
    const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
    const url = `${baseURL}zip=${req.body.value.zip},us&appid=${textapi}&units=imperial`;
    const weather = await fetch(url);
    const data = await weather.text();
    console.log(weather.text);
    console.log(projectData);
    res.send(data);
})*/

// app.post('/getCountry', async function (req, res) {
//     const username = process.env.geo_username;
//     const city = req.body.value.city;
//     //console.log(req);
//     //const zip = req.body.value.zip;
//     //const url = "http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=8775&country=CH&radius=10&username=anollipian"
//     //const url = `http://api.geonames.org/countryInfoJSON?username=${username}`;
//     //const url = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${zip}&placename=${city}&maxRows=10&username=${username}`;
//     const url = `http://api.geonames.org/searchJSON?name=${city}&maxRows=1&username=${username}`;
//     console.log("The url is ", url);
//     const countrydata = await fetch(url);
//     const jsondata = await countrydata.json();
//     const data = jsondata.geonames[0];
//     console.log(data);
//     if(data == null)
//     {
//         return res.status(404).json({Validation: "We Couldn't find a city with this name, please try again"});
//     }
//     res.send(data);
// })

// app.post('/getWeather',async function (req,res){
//     const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${req.body.value.city}&&lat=${req.body.value.lat}&lon=${req.body.value.lon}&key=${process.env.weather_apiKey}`;
//     console.log("The url is ", url);
//     const weather = await fetch(url);
//     const jsondata = await weather.json();
//     const dateday = req.body.value.day;
//     console.log(dateday);
//     const data = jsondata.data[dateday];
//     console.log(data);
//     if(data == null)
//     {
//         return res.status(404).json({Validation: "An error occured, please check your input"});
//     }
//     res.send(data);

// })

// app.post('/getPicture',async function (req,res){
//     const url = `https://pixabay.com/api/?key={process.env.pixi_Api}&q={req.body.value.city}&image_type=photo`;
//     console.log("The url is ", url);
//     const photoData = await fetch(url);
//     const jsondata = await photoData.json();
//     const photoLink = req.body.value.imageURL;
//     console.log(photoLink);
//     //const data = jsondata.data[dateday];
//     //console.log(data);

//     if(photoLink == null)
//     {
//         return res.status(404).json({Validation: "An error occured, please check your input"});
//     }
//     res.send(photoLink);

// })


app.post('/getCountry', async function (req, res) {
    const username = process.env.geo_username;
    const city = req.body.value.city;
    const url = `http://api.geonames.org/searchJSON?name=${city}&maxRows=1&username=${username}`;
    const countrydata = await fetch(url);
    const jsondata = await countrydata.json();
    const data = jsondata.geonames[0];
    //console.log(data);
    if (data == null) {
        return res.status(404).json({ Validation: "We Couldn't find a city with this name, please try again" });
    }
    else {
        const wurl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&&lat=${data.lat}&lon=${data.lng}&key=${process.env.weather_apiKey}`;
       //console.log(wurl);
        const weather = await fetch(wurl);
        const jsonwdata = await weather.json();
        const dateday = req.body.value.day;
        //console.log(dateday);
        const wdata = jsonwdata.data[dateday];
       console.log(wdata);
        if (wdata == null) {
            return res.status(404).json({ Validation: "An error occured, please check your input" });
        }
        else {
            projectData["temp"] = wdata.temp;
            const purl = `https://pixabay.com/api/?key=${process.env.pixi_Api}&q=${city}&image_type=photo`;
            console.log("The url is ", purl);
            const photoData = await fetch(purl);
            // $.getJSON(purl, function(data){
            //     if (parseInt(data.totalHits) > 0)
            //     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
            //     else
            //         console.log('No hits');
            //     });
            const jsonpdata = await photoData.json();
            projectData["photoData"] = jsonpdata;
           // const photoLink = jsonpdata.largeImageURL;
            //console.log(photoLink);
            res.send(projectData);
        }

    }
})