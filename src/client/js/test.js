fetch('http://localhost:8000/test')
.then(res => {
    return res.json()
})
.then(function(data) {
    document.getElementById('results').innerHTML = data.message
})