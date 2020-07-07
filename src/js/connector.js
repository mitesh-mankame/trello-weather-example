
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
                   
                    let returnArr = [{
                        text:weatherData.main.temp.toString()
                    },
                    {
                        text:weatherData.wind.speed.toString()
                    }]
                  
                    return returnArr
                });
            }
            return [];           
        });        
    }
});