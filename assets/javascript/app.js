var initialButtonsArray = [
  "Evangelion",
  "Naruto",
  "Tokyo Ghoul",
  "Berserk",
  "Hellsing OVA",
  "FLCL",
  "Ergo Proxy"
];

function addButton(title) {
  var button = $("<button id='anime-button' data-title='" + title + "'>" +
                title + "</button>");
  $("#buttons-container").append(button);
}

for (var j = 0; j < initialButtonsArray.length; j++) {
  addButton(initialButtonsArray[j]);
}

$("button").on("click", function() {
  var animeDataName = $(this).data("title");
  getAnimeGifs(animeDataName);
});

$("#add-gif-button").on("click", function(event) {
  // Preventing the button from trying to submit the form
  event.preventDefault();
  // Storing the anime title
  var anime_Name = $("#search-box").val().trim();
  addButton(anime_Name);
  getAnimeGifs(anime_Name);
});

function getAnimeGifs(animeTitle) {
  // Set var to giphy URL with anime title to search for
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animeTitle + 
                "&rating=pg-13&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    //create 
    var results = response.data;

    //variable to hold each search result set of gifs
    var completedGifSet = $("<div id='gif-set'>");

    for(var i = 0; i < results.length; i++) {
      //variable to hold gif and rating
      var gifDiv = $("<div class='gif-item'>");
      //variable to get rating from object at index i
      var rating = results[i].rating;
      //variable to hold image tag
      var gifImage = $("<img>");
      //variable to hold rating of gif
      var gifRating = $("<p>").text("Rating: " + rating);

      //give image source to var gifImage
      gifImage.attr("src", results[i].images.original.url);
      //append gif with rating to gifDiv
      gifDiv.append(gifImage).append(gifRating);
      //append finished gifDiv with gif and rating to completedGifSet
      completedGifSet.append(gifDiv);

      //only adds completedGifSet after last gif/rating has been created
      //sets gifs in order of search and order 
      if (i == results.length-1) {
        $("#anime-gifs-container").prepend(completedGifSet);
      }
    }
  });
}