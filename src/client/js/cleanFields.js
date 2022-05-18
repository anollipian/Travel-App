function clearfield()
{
    document.getElementById('Tripentry').style.display = 'none';
    document.getElementById('cityImg').src = "";
    document.getElementById('city').innerHTML = "";
    document.getElementById('date').innerHTML = "";
    document.getElementById('tripStart').innerHTML = "";
    document.getElementById('hightemp').innerHTML = "";
    document.getElementById('lowtemp').innerHTML = "";
    document.getElementById("forecast").innerHTML = "";
    document.getElementById('cityImg').src = "";
    document.getElementById('tripLength').innerHTML = "";

}

function handleError(error) {
    if (error.cod = 404) {
        document.getElementById('error').style.display = 'block';
    }
    else {
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').innerHTML = "Sorry an Error happened, Please Check Your inputs";
    }
}

export { clearfield, handleError}