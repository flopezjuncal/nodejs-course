const request = require("request")

// const invalidGeocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/invalidnierijio.json?access_token=pk.eyJ1IjoiZmFjdWxvIiwiYSI6ImNrbWkxcjhnaTBkMTIyd3F1ZDhub3NsdGMifQ.qEDd9dgCVadxWZl3rIEvLA&limit=1&language=es"
// const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Montevideo.json?access_token=pk.eyJ1IjoiZmFjdWxvIiwiYSI6ImNrbWkxcjhnaTBkMTIyd3F1ZDhub3NsdGMifQ.qEDd9dgCVadxWZl3rIEvLA&limit=1&language=es"


const getCoordinates = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZmFjdWxvIiwiYSI6ImNrbWkxcjhnaTBkMTIyd3F1ZDhub3NsdGMifQ.qEDd9dgCVadxWZl3rIEvLA&limit=1"

    request({url: url, json: true, method: "GET"},  (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to the location service :(", undefined)
        } else if (body.features.length === 0) {
            callback("Bad Request: location not found :( Try again!", undefined)
        } 
        else {
            const coordinates = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            
            callback(undefined, coordinates)
        }
    })

}

module.exports = {
    getCoordinates: getCoordinates
}