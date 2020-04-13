const request=require('request')

const forecast = (latitude, longitude, callback)=>{
    const url='https://api.darksky.net/forecast/d284cac31e3f996fce238921e83dbd2e/'+latitude+','+longitude+'?units=si&lang=it'

    request({url, json:true}, (error, {body}={})=>{

        if(error){
            callback ('Errore di connessione a forecast', undefined)
        } else if (body.error){
            callback ('Errore:'+body.error, undefined)
        } else {
            callback(undefined, {
                forecast: 'Attualmente vi sono '+body.currently.temperature+' gradi. Vi è lo '+body.currently.precipProbability+' % di probabilità di pioggia. In pratica '+body.currently.summary,
                minTemperature: body.daily.data[0].temperatureMin,
                maxTemperature: body.daily.data[0].temperatureMax
        })
    }
})
}

module.exports=forecast