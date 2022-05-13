function clearfield()
{
    document.getElementById('temp').innerHTML = "";
    document.getElementById('content').innerHTML = "";
    document.getElementById('date').innerHTML = "";
    document.getElementById('city').innerHTML = "";
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