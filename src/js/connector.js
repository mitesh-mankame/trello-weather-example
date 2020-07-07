
window.TrelloPowerUp.initialize({
    'card-badges': function(t){
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
                        text:`${temprature.toFixed()} °F`
                    },
                    {
                        text:`🌬️${weatherData.wind.speed.toString()} m/h`
                    },
                    {
                        icon:`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
                        text:weatherData.weather[0].main
                    }
                ]
                  
                    return returnArr
                });
            }
            return [];           
        });        
    },

    'card-back-section': function(t, options){
        return {
          title: 'My Card Back Section',
          icon: 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg', // Must be a gray icon, colored icons not allowed.
          content: {
            type: 'iframe',
            url: t.signUrl('../html/section.html'),
            height: 230 // Max height is 500
          }
        };
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
                        text:`${temprature.toFixed()} °F`
                    },
                    {
                        text:`🌬️${weatherData.wind.speed.toString()} m/h`
                    },
                    {
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