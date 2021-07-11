const request = require('request')

const forecast = (latitude , longitude , callback) => {
const url = 'https://api.darksky.net/forecast/421874e487085cf568368e6787a8c910/'+ latitude +','+longitude+'?units=si'
    request ({url: url , json: true} , (error,response) => {
        if (error){
            callback('unable to connect' , undefined)
        }else if (response.body.error) {
            callback('unable to find location.Try another search.' , undefined)
        }else {
            callback(undefined , response.body.daily.data[0].summary + 'it is currently ' + response.body.currently.temperature + 'degress out. there is a ' + response.body.currently.precipProbability + '% chance of rain.')
        
        }
    })
}

module.exports = forecast 