var animeButtonsArray = [
  "Evangelion",
  "Naruto",
  "Tokyo Ghoul",
  "Berserk",
  "Hellsing OVA",
  "FLCL",
  "Ergo Proxy"
];

//function to display buttons
function displayButtons() {
  //clear container to prevent repeat buttons
  $("#buttons-container").empty();

  //loop through animeButtonsArray
  for (var i = 0; i < animeButtonsArray.length; i++) {
    //create var to hold button tag and add class, data-attribute, and anime title
    var btn = $("<button>").addClass("anime").attr("data-anime", animeButtonsArray[i]).text(animeButtonsArray[i]);
    //append button to #buttons-container
    $("#buttons-container").append(btn);
  };
};

//function to display gifs
function displayGifs() {
  //clear container for neatness
  $("#anime-gifs-container").empty();

  //set var to anime title
  var anime = $(this).data("anime");
  //set var for giphy url
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + anime + "&rating=pg-13&api_key=dc6zaTOxFJmzC&limit=20";

  //use ajax to get data
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response){
    var results = response.data;

    for (var k = 0; k < results.length; k++) {
      //create var to create a <div> to hold each gif/rating pair
      var gifDiv = $("<div>");
      //create var to hold rating
      var rating = results[k].rating;
      //create var to hold still gif
      var stillGif = results[k].images.original_still.url;
      //create var to hold animated gif
      var animatedGif = results[k].images.original.url;
      //create var to hold <img> tag with attributes.
      var animeGif = $("<img>").attr("src", stillGif).attr("data-state", "still").attr(
                "data-still", stillGif).attr("data-animate", animatedGif).attr("class", "gif");
      //create var to hold <p> tag for rating
      var p = $("<p>").text("Rating: " + rating);

      gifDiv.append(animeGif);
      gifDiv.append(p);

      //append completed gifDiv to anime-gifs-container
      $("#anime-gifs-container").append(gifDiv);
    };
  });
};

$("#search-box").on("click", function() {
  $("#search-box").empty();
})

//jquery to register search click
$("#search-anime").on("click", function(event) {
  //prevent default function
  event.preventDefault();
  //create var to hold search value
  var animeSearchInput = $("#search-box").val().trim();
  //push new search into animeButtonsArray
  animeButtonsArray.push(animeSearchInput);
  //call render buttons function
  displayButtons();
});

//jquery to stop and start gifs
$(document).on("click", ".gif", function() {
  //create var to hold current state the gif is in
  var state = $(this).attr("data-state");
  //if state is still do...
  if (state == "still") {
    //create var to hold animated gif URL
    var animate = $(this).attr("data-animate");
    //change data-state to animate and gif src
    $(this).attr("data-state", "animate").attr("src", animate);
  }
  else
  {
    //create var to hold still gif URL
    var still = $(this).attr("data-still");
    //change data-state to still and gif src
    $(this).attr("data-state", "still").attr("src", still);
  };
});

//call displayButtons function to put initialArray in #buttons-container
displayButtons();

//jquery to let buttons clicked run displayGifs function
$(document).on("click", ".anime", displayGifs);