
const request = require('request')

const geocode = (address , callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/ '+ address +' .json?access_token=pk.eyJ1Ijoia2F3dGhhcmRoIiwiYSI6ImNrcDNyZmdpYjBkcmcycXIydTFxeHhyYjkifQ.HzmN-Klfc8UuXRvC1a0u7Q&limit=1'

    request ({ url: geoUrl , json: true} , (error,response) => {
       
        if (error) {
            callback('unable to connect to location services', undefined)
        }else if (response.body.features.length === 0 ) {
            callback('unable to find location . try another search.', undefined)
        }else {
            callback(undefined , {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            }
            )
        }
    })
}
module.exports = geocode
