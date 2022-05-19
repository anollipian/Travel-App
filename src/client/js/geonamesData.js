const port = "8000";
function getTripData(event) {
    event.preventDefault();
    //Travel Destination
    let cityName = document.getElementById('destination').value;
    //Trip Start Date
    let TripDate = document.getElementById('datefield').value;
    //Trip End Date
    let TripEndDate = document.getElementById('enddatefield').value;

    //Validate The User Entered Trip Data
    if(cityName=="" || TripDate=="" ||TripEndDate=="")
    {
        document.getElementById('error').style.display = 'block';
        return;
    }
    //Counter till the trip starts.
    let tripStart = Client.subtractDates(TripDate);

    
    //Validate the start & End Trip Dates are after each other
    if (TripDate>TripEndDate) {
        document.getElementById('error').style.display = 'block';
        document.getElementById("error").innerHTML = "Ending Date Can't Be before start date";
        return;
    }

    // Calculate Trip Length
    let tripLength = Client.subtractTwoDates(TripDate, TripEndDate);
    console.log(tripLength);

//Call The Destination Data from the server using 3 Apis.
    getCountry({ city: cityName, day: tripStart})
        .then(function (data) {
            // Call the ShowData() function to display the trip information. 
            showData(data, cityName, TripDate, tripStart, tripLength)
        })
}

//Post Function to get the destination Data (takes City Name & Trip Starting date)
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
            //No Data Will be displayed. 
            Client.clearfield();
            throw new Error(data.message);
        }
        else {
            //Data will be dispalyed in the "Trip Entry" div
            document.getElementById('error').style.display = 'none';
            return newData;
        }
    } catch (error) {
        Client.handleError(error);
    }
}

//The function to display The photo , trip length & weather status of the user's destination .
function showData(data, city, TripDate, tripStart,tripLength) {
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
    document.getElementById('tripLength').innerHTML = tripLength;
}

export { getTripData }