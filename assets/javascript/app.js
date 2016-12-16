$("#add-gif-button").on("click", function(event) {
  // Preventing the button from trying to submit the form
  event.preventDefault();
  // Storing the anime title
  var anime_Name = $("#search-box").val().trim();
  console.log(anime_Name);
  getAnimeGifs(anime_Name);
});

function getAnimeGifs(animeTitle) {
  // Set var to giphy URL with anime title to search for
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animeTitle + 
                "&rating=pg-13&api_key=dc6zaTOxFJmzC&limit=20";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    //create 
    var results = response.data;

    // Printing the entire object to console
    console.log(results);

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
// $("#add-gif-button").on("click", function() {
//   //get value is search


//   // Storing our giphy API URL for a random cat image
//   var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";

//   // Perfoming an AJAX GET request to our queryURL
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })

//   // After the data from the AJAX request comes back
//   .done(function(response) {
  
//   // Saving the image_original_url property
//   var imageUrl = response.data.image_original_url;

//   // Creating and storing an image tag
//   var catImage = $("<img>");

//   // Setting the catImage src attribute to imageUrl
//   catImage.attr("src", imageUrl);
//   catImage.attr("alt", "cat image");

//   // Prepending the catImage to the images div
//   $("#images").prepend(catImage);
//   });
// });