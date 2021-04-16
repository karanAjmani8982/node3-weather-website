const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7d3d01f2f38a4aa189de67ee651efdf8&query=' + latitude + ',' + longitude

    request({ url, json: true }, ( error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location!', undefined)
        } else {
            // console.log(body.current.humidity)
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out. Humidity is ' + body.current.humidity + '.')
        }
    })
}

module.exports = forecast