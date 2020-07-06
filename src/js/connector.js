console.log('Power up Loaded')
window.TrelloPowerUp.initialize({
    'card-badges': function(t){
        //Return card badges
        return t.card('coordinates')
        .then(function(card){
            console.log(card)

            if(card.coordinates){
                // fetch weather data
                fetch(`https://samples.openweathermap.org/data/2.5/weather?lat=${card.coordinates.latitude}&lng=${card.coordinates.longitude}&appid=%%WEATHER_KEY%%`, {'mode': 'no-cors'})
                .then(response => response.json())
                .then(weatherData =>{
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