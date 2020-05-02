const express = require('express')
const router = express.Router()
const request = require('request');
let dreamTeam = []
const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

router.get('/teams/:teamName', async function(req, res){
    let teamName = req.params.teamName
    console.log(teamToIDs[teamName])
    let teamId = teamToIDs[teamName]
  
    request('http://data.nba.net/10s/prod/v1/2018/players.json', function(err, response, body){
        let nbaGenarl = JSON.parse(body).league.standard
        // console.log(nbaGenarl)
        let nbaPlayer= nbaGenarl.filter(i=> i.teamId == teamId).filter(i=>i.isActive == true).map(m=>{
            picName =  m.lastName.replace(" ", "_").replace(".", "") + "/" + m.firstName.replace(" ", "_").replace(".", "")
            return {firstName: m.firstName, lastName: m.lastName, jersey: m.jersey, pos: m.pos, pic: picName}
        })
        res.send(nbaPlayer)
    })
})
router.put('/team/:newTeam', function(req, res){
    console.log(req.body)
    let obj= req.body
    console.log(obj)
    console.log(teamToIDs)
    if(!teamToIDs[obj.teamName]){
        teamToIDs[obj.teamName]= obj.teamId
        console.log(teamToIDs)
    }

})

router.get('/dreamTeam', function(req, res){
    res.send(dreamTeam)
})
router.post('/roster', function(req, res){
    console.log(req.body)
    let player = req.body
    console.log(player.playerName)

    // dreamTeam.push(player)
    // console.log(dreamTeam)
    if(dreamTeam.length == 0){ // if its not an empty array, since ampty array is truthy
        dreamTeam.push(player)
        console.log(dreamTeam)
    } else{
            let inGroup = false
            for(let i=0; i<dreamTeam.length - 1; i++){
                // if(dreamTeam[i].playerName != player.playerName){
                //     dreamTeam.push(player)
                //     console.log(dreamTeam)
                // }
                if(dreamTeam[i].playerName == player.playerName)
                {
                    inGroup = true;
                }
            }
        if(inGroup == false)
        {
            dreamTeam.push(player)
        }
        
    }
   
})

module.exports = router

