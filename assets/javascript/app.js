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
    $("#new-button").val("")
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
            topicImage.attr("src", results[i].images.fixed_height_still.url)
            topicImage.attr("data-still", results[i].images.fixed_height_still.url)
            topicImage.attr("data-animate", results[i].images.fixed_height.url)
            topicImage.attr("data-state", "still")
            gifDiv.prepend(p)
            gifDiv.prepend(topicImage)
            $("#gif-anchor").prepend(gifDiv)
        }
    })

})

$(document).on("click", "img", function() {
    var state = $(this).attr("data-state")
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate")
    } else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
    } 
})