const port = "8000";
function getTripData(event) {
    event.preventDefault();
    let cityName = document.getElementById('destination').value;
    let TripDate = document.getElementById('datefield').value;
    let TripEndDate = document.getElementById('enddatefield').value;

    if(cityName=="" || TripDate=="" ||TripEndDate=="")
    {
        document.getElementById('error').style.display = 'block';
        document.getElementById("error").innerHTML='You need to provide valid data';
        return;
    }
    let tripStart = Client.subtractDates(TripDate);

    let tripLength = Client.subtractTwoDates(TripDate, TripEndDate);
    
    if (TripDate>TripEndDate) {
        console.log("here");
        document.getElementById('error').style.display = 'block';
        document.getElementById("error").innerHTML = "Ending Date Can't Be before start date";
        return;
    }


    getCountry({ city: cityName, day: tripStart })
        .then(function (data) {
            showData(data, cityName, TripDate, tripStart)
        })
}
const getCountry = async (data = {}) => {
    const url = `http://localhost:${port}/getCountry`;
    const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            value: data
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    try {
        const data = await result.json();
        const newData = {};
        console.log("returned data")
        console.log(data);
        newData.highTemp = data.hightemp;
        newData.lowTemp = data.lowtemp;
        newData.forecast = data.forecast;
        newData.photoUrl = data.photoData.hits[3].largeImageURL;
        console.log(newData);

        // check for response.status
        if (!result.ok || data.cod == 404) {
            Client.clearfield();
            throw new Error(data.message);
        }
        else {
            document.getElementById('error').style.display = 'none';
            return newData;
        }
    } catch (error) {
        Client.handleError(error);
    }
}

function showData(data, city, TripDate, tripStart) {
    document.getElementById('cityImg').src = "";
    document.getElementById('Tripentry').style.display = 'block';
    console.log("final data");
    document.getElementById('city').innerHTML = city;
    document.getElementById('date').innerHTML = TripDate;
    document.getElementById('tripStart').innerHTML = tripStart;
    document.getElementById('hightemp').innerHTML = data.highTemp;
    document.getElementById('lowtemp').innerHTML = data.lowTemp;
    document.getElementById("forecast").innerHTML = data.forecast;
    document.getElementById('cityImg').src = data.photoUrl;
}

export { getTripData }