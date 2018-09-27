var apikey = "AoLVNzjc4OOHvnI9sLjJfcFP9EpQQQpX"
var topics = ["Magic", "Swords", "Nerds", "Gaming", "Pizza", "Dogs"]

var makeButtons = function() {
    for (var i = 0; i < topics.length; i++) {
    $("<button>" + topics[i] + "</button>").appendTo($("#button-anchor")).attr("data-newTopic", topics[i])
    }
}

$("#create").on("click", function(event){
    event.preventDefault()
    topics.push($("#new-button").val())
    $("#button-anchor").empty()
    makeButtons()
})

makeButtons()

