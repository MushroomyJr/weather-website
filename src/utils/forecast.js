const request = require ('request')

const forecast = (lat, lon, callback) =>{
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=metric&appid=a4ec86ec43c54fe2adc67ff0ac31add5'
    request({ url: url, json: true}, (error, response)=>{
        if(error){
            callback('can not access open-weather api', undefined)
        }else if(response.body.message){
            callback('can not locate given location', undefined)
        }else{
            const body = response.body
            const current = body.current
            const description = current.weather[0].description
            const hourly = body.hourly[0]
            const daily = body.daily[0]
            const high = daily.temp.max
            const low = daily.temp.min

            data= {
                temp: current.temp,
                feelsLike: current.feels_like,
                description: description,
                pop: hourly.pop,
                forecast:('Temperature of '+current.temp+', feels like '+current.feels_like+', '
                +description+'. There is a '+(hourly.pop*100)+'% chance of precipitation. The daily high is '+high+', and the low is '+low)
            }
            callback(undefined, data)
        } 
    })
}

module.exports = forecast