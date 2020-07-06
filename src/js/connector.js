
window.TrelloPowerUp.initialize({
    'card-badges': function(t){
        //Return card badges
        return t.card('coordinates')
        .then(function(card){
            console.log(card)

            if(card.coordinates){
                // fetch weather data
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${card.coordinates.latitude}&lon=${card.coordinates.longitude}&appid=%%WEATHER_KEY%%`)
                .then(response => response.json())
                .then(weatherData =>{
                    console.log('Weather Data',weatherData)
                    return [{
                        text: weatherData.main.temp
                    },
                    {
                        text: weatherData.wind.speed
                    }
                ]
                });
            }

            return []
        })
        
    }
})