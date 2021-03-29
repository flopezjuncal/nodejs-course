const request = require("request")

const invalidWeatherUrl = "http://api.weatherstack.com/current?access_key=46d4f6e2ced7b66ba656ab974c4a71f7&query=&units=s"
const weatherUrl = "http://api.weatherstack.com/current?access_key=46d4f6e2ced7b66ba656ab974c4a71f7&query=-34.9011,-56.1645&units=s"

const getForecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=46d4f6e2ced7b66ba656ab974c4a71f7&query=" + latitude + "," + longitude

    request({url: url, json: true, method: "GET"},  (error, { body } = {}) => {
        if (error){
            callback("Unable to connect to the forecast service :(", undefined)
        } else if (body.error) {
            callback("Bad Request: invalid location :( Try again!", undefined)
        } else {
            const forecast = {
                temperature: body.current.temperature,
                region: body.location.region
            }

            callback(undefined, forecast)
        }
    })
}

module.exports = {
  getForecast: getForecast
}
