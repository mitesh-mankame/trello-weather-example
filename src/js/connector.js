console.log('Power up Loaded')
window.TrelloPowerUp.initialize({
    'card-badges': function(t){
        //Return card badges
        return t.card('all')
        .then(function(card){
            console.log(card)
            return [
                {
                    text:card.idShort
                }
            ]
        })
        
    }
})