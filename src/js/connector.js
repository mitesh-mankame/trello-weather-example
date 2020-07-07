const getWeatherData=(t)=>{

    return t.card('coordinates')
        .then(function(card){        
            if(card.coordinates){               
                // fetch weather data
                return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${card.coordinates.latitude}&lon=${card.coordinates.longitude}&appid=%%WEATHER_KEY%%`)
                .then(response => response.json())
                .then(weatherData =>{    
                    weatherData.main.formattedTemprature =  `${(weatherData.main.temp - 273.15) * 9/5 + 32} °F`
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
                    text:`${temprature.toFixed()} °F`
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
        return t.card('coordinates')
        .then(function(card){        
            if(card.coordinates){               
                // fetch weather data
                return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${card.coordinates.latitude}&lon=${card.coordinates.longitude}&appid=%%WEATHER_KEY%%`)
                .then(response => response.json())
                .then(weatherData =>{
                   // console.log('Weather Data',weatherData)
                   let temprature = (weatherData.main.temp - 273.15) * 9/5 + 32;
                    let returnArr = [{
                        title:'Temprature',
                        text:`${temprature.toFixed()} °F`
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
                ]
                  
                    return returnArr
                });
            }
            return [];           
        });        
    }
});