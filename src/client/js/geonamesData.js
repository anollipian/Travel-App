const port = "8000";
function getTripData(event){
    event.preventDefault();
    let cityName = document.getElementById('destination').value;
    console.log(cityName)
    /*let zipcode = document.getElementById('zipcode').value;
    console.log(zipcode)*/
    let TripDate = document.getElementById('datefield').value;
    console.log(TripDate);
    let days = Client.suntractDates(TripDate);



    getCountry({ city: cityName,day:days /*zip: zipcode*/ })
       // .then(function (data) {
        //    getweather({ city: data.name, lat: data.lat, lon: data.lng, day:days })
            .then(function (data) {
                showData(data)
            })
          //  .then(function(){
            //    getPhoto({city: cityName})
            //})
      //  })
       
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
        //console.log(data.temp);
        newData.temp = data.temp;
        newData.photoUrl = data.photoData.hits[2].largeImageURL;
        //console.log(data.photoData.hits[2].largeImageURL);
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

const getweather = async (data = {}) => {
    const url = `http://localhost:${port}/getWeather`;
    console.log(data);
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
        console.log(data)
        // check for response.status
        if (!result.ok || data.cod == 404) {
            Client.clearfield();
            throw new Error(data.message);
        }
        else {
            document.getElementById('error').style.display = 'none';
            return data;
        }
    } catch (error) {
        Client.handleError(error);
    }
}


const getPhoto = async (data = {}) => {
    const url = `http://localhost:${port}/getPicture`;
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
        console.log("returned photo")
        console.log(data)
        // check for response.status
        if (!result.ok || data.cod == 404) {
            Client.clearfield();
            throw new Error(data.message);
        }
        else {
            document.getElementById('error').style.display = 'none';
            return data;
        }
    } catch (error) {
        Client.handleError(error);
    }
}
 
function showData (data)
{
    console.log("final data")
    document.getElementById('temp').innerHTML=data.temp;
    document.getElementById('cityImg').src = data.photoUrl;
}

export { getTripData }