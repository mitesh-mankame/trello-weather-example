const promise = window.TrelloPowerUp.Promise;

const getWeatherData=(t)=>{
    return promise.all([t.card('coordinates'),t.get('card', 'shared', 'locationDetails')])
    .spread((card,cacheData)=>{
        if(!card.coordinates) return [];

        if(cacheData &&  
           cacheData.coordinates.latitude == card.coordinates.latitude && 
           cacheData.coordinates.longitude == card.coordinates.longitude &&
           cacheData.weatherdata &&
           cacheData.expires >= Date.now()){
            console.log('From Cache',cacheData.weatherdata)
               return cacheData.weatherdata;
           }

        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${card.coordinates.latitude}&lon=${card.coordinates.longitude}&appid=%%WEATHER_KEY%%`)
        .then(response => response.json())
        .then(weatherData =>{  
            const temprature=  (weatherData.main.temp - 273.15) * 9/5 + 32;
            weatherData.main.formattedTemprature =  `${temprature.toFixed()} °F`;

            if(t.memberCanWriteToModel('card')){               
            t.set('card', 'shared', 'locationDetails',{
                coordinates:{
                             latitude:card.coordinates.latitude,
                             longitude:card.coordinates.longitude,
                            },
                expires: Date.now() + (1000 * 60 * 30),
                weatherdata:weatherData
            })
        }
        console.log('From Serive ',weatherData)
            return weatherData
        });

    })





    return t.card('coordinates')
        .then(function(card){        
            if(card.coordinates){               
                // fetch weather data
                return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${card.coordinates.latitude}&lon=${card.coordinates.longitude}&appid=%%WEATHER_KEY%%`)
                .then(response => response.json())
                .then(weatherData =>{  
                    const temprature=  (weatherData.main.temp - 273.15) * 9/5 + 32;
                    weatherData.main.formattedTemprature =  `${temprature} °F`
                    return weatherData
                });
            }
            return null;           
        });
}

getWeatherDataBadges = (weatherData)=>{
    if(!weatherData) return[];
    return  [{
                    title:'Temprature',
                    text:weatherData.main.formattedTemprature
                },
                {
                    title:'Wind Speed',
                    text:`🌬️${weatherData.wind.speed.toString()} m/h`
                },
                {
                    title:'Conditions',
                    icon:`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
                    text:weatherData.weather[0].main
                }
            ];
}

window.TrelloPowerUp.initialize({
    'card-badges': function(t){
        return getWeatherData(t)
        .then(getWeatherDataBadges);
    },

   
      'card-detail-badges': function(t){
        //Return card badges
        return  getWeatherData(t)
        .then(getWeatherDataBadges);
      }
});