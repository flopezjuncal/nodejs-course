console.log("cargamos un js chill")

// En vez de usar un callback, como en request, usamos .then, y a .then le pasamos el callback.
// response.json() va a recebir el json, y cuando este listo, vamos a ejecutar el callback de adentro de .then.
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


// - - - G E T   H T M L   E L E M E N T S - - -
const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const locationMsg = document.querySelector("#location")
const forecastMsg = document.querySelector("#forecast")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const location = search.value

    locationMsg.textContent = "Loading..."
    forecastMsg.textContent = ""

    fetch("/weather?address=" + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {    
            if (data.error) {
                locationMsg.textContent = data.error
            } else {
                locationMsg.textContent = "Location: " + data.location
                forecastMsg.textContent = "Temperature: " + data.forecast.temperature  
            }
        })
    })
})
