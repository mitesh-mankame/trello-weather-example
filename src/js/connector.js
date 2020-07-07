
window.TrelloPowerUp.initialize({
    'card-badges': function(t){
        //Return card badges
        return t.card('all')
        .then(function(card){
            /*console.log('card.pos:',card.pos)
            return [
                {
                    text:card.pos
                }
            ]*/
            if(card.coordinates){
                console.log('Lat: '+card.coordinates.latitude,"Lng : "+card.coordinates.longitude)
                // fetch weather data
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${card.coordinates.latitude}&lon=${card.coordinates.longitude}&appid=%%WEATHER_KEY%%`)
                .then(response => response.json())
                .then(weatherData =>{
                    console.log('Weather Data',weatherData)
                    return [
                    {
                        text:card.coordinates.longitude.toString()
                    }
                ]
                });
            }else{
                return [
                    {
                        text:card.pos
                    }
                ]
            }

           
        })
        
    }
})