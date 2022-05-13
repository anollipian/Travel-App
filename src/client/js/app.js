
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);



let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
const port = "8000";

/* Function called by event listener */
function performAction(e) {
    const Mode = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;

    getWeather('getWeather',{zip:zipCode})
      .then(function (data) {
          console.log(data)
            postData('addTemp', { Temp: data.main.temp, date: newDate, Mode: Mode, City: data.name })
        })
        .then(function () {
            getAll()
        })
};
const getWeather = async (url = '', data = {}) => {
    url = `http://localhost:${port}/${url}`;
    const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            value: data
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    try {
        const data = await result.json();
        console.log("returned data")
        // check for response.status
        if (!result.ok|| data.cod== 404) {
            Client.clearfield();
            throw new Error(data.message);
        }
        else
        {
        document.getElementById('error').style.display = 'none';
        return data;
        }
    } catch (error) {
        Client.handleError(error);
    }
}


/*Function to POST data */
const postData = async (url = '', data = {}) => {
    url = `http://localhost:${port}/${url}`;
    console.log(data, url);
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
        console.log("We'll add this to post")
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */
const getAll = async () => {
    url = `http://localhost:${port}/all`
    console.log(url);
    const request = await fetch(url);
    try {
        console.log("we are getting data")
        const allData = await request.json();
        console.log(allData)
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
        document.getElementById('content').innerHTML = allData.Mode;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('city').innerHTML = allData.City;
    }
    catch (error) {
        console.log("error", error);
    }
}

