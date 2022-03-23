/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

//Weather Api URL 
const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
// Personal API Key for OpenWeatherMap API
const apiKey = "ebf5fc81b14e12f92687bb4f5faf6eb2&units=imperial";

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);


/* Function called by event listener */
function performAction(e) {
    const Mode = document.getElementById('feelings').value;
    getWeather()
        .then(function (data) {
            postData('/addTemp', { Temp: data.main.temp, date: newDate, Mode: Mode, City: data.name })
        })
        .then(function () {
            getAll()
        })
};


const getWeather = async () => {
    const zipCode = document.getElementById('zip').value;
    const url = baseURL + "zip=" + zipCode + ",us&appid=" + apiKey;
    console.log("we'll send this url");
    console.log(url);
    const res = await fetch(url);
    try {
        const data = await res.json();
        console.log("here is the data from browser");
        console.log(data);
        // check for response.status
        if (!res.ok) {
            throw new Error(data.message);

        }
        document.getElementById('error').style.display = 'none';
        return data;

    } catch (error) {
        handleError(error);
    }
}


/*Function to POST data */
const postData = async (url = '', data = {}) => {
    console.log("We are sending this");
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log("We'll add this to post" + newData);
        return newData;
    }
    catch (error) {
        console.log("error", error);
    }
}


/* Function to GET Project Data */
const getAll = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
        document.getElementById('content').innerHTML = allData.Mode;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('city').innerHTML = allData.City;
    }
    catch (error) {
        console.log("error", error);
    }
}

function handleError(error) {
    if (error.cod = 404) {
        document.getElementById('error').style.display = 'block';
    }
    else
    {
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').innerHTML = "Sorry an Error happened, Please Check Your inputs";
    }
}
