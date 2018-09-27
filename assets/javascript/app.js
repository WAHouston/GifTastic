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

$(document).on("click", "button" ,function() {
    var newTopic = $(this).attr("data-newTopic")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newTopic + "&api_key=" + apikey + "&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {
        var results = response.data
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>")
            var rating = results[i].rating
            var p = $("<p>").text("Rating: " + rating)
            var topicImage = $("<img>")
            topicImage.attr("src", results[i].images.fixed_height.url)
            gifDiv.prepend(p)
            gifDiv.prepend(topicImage)
            $("#gif-anchor").prepend(gifDiv)
        }
    })

})
