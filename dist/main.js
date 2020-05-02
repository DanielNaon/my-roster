function fetchData(){
    let groupName = $('input').val()
    console.log(groupName)
    $.get(`/teams/${groupName}`, function(nbaObjact){
        // console.log(nbaObjact)
        renderData(nbaObjact)
        
    })
}
function renderData(nbaObjact){
    // console.log(nbaObjact)
    const source = $("#players-template").html()
    const template = Handlebars.compile(source)
    const someHTML = template({nba: nbaObjact})
    $(".players-Container").append(someHTML)
}

function getDreamTeam(){
    $.get('/dreamTeam', function(dreamTeam){
        console.log(dreamTeam)
        rednerDreamTeam(dreamTeam)
    })
}
function rednerDreamTeam(dreamTeam){
    console.log(dreamTeam)
    $(".dream-container").empty()
    for(let player of dreamTeam){
        $(".dream-container").append(`<div class="dPlayer">${player.playerName}</div>`)
    }
}
$(".players-Container").on('click', '.fave', function(){
    let name = $(this).closest('div').find('.name').text()
    let data = { playerName: name }
    $.post('/roster', data, function (response) {
    console.log("POST complete")
    })

})
