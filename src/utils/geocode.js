const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibXVzdGFmYWFzaGZhcSIsImEiOiJja3UydWZtOXQxNWhtMm5udHNhZTA0cWx6In0.bxL_UsWYLwuAo4h95dRo-A&limit=1'
    request({url:url, json:true}, (error,response)=>{
        if (error){
            callback('unable to reach geocoding api', undefined)
        }else if(response.body.features.length === 0){
            callback('unable to find location', undefined)                    
        }else{
            const center = response.body.features[0].center
            data = {
                latitude: center[1],
                longitude: center[0],
                location: response.body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode