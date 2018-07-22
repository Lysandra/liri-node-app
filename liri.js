require("dotenv").config();
var fs = require("fs");
var request = require("request");
// var inquirer = require("inquirer");
var keys = require("./keys");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var getArtistName = function(artist) {
    return artist.name;
}

var getSpotifyData = function(songName) {
    if (songName === undefined) {
        songName = ("I Want it That Way");
    }
    spotify.search(
        {
            type: "track",
            query: songName
        }, function(err, data) {
            if (err) {
                console.log("Error occurred" + err);
                return;
            }
            var songs = data.tracks.items;
            
            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("Artists " + songs[i].artists.map(getArtistName));
                console.log("Song Name" + songs[i].name);
                console.log("Preview Song: " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name);
                console.log("-----------------------------------------------")
            }
        }
    )
}


var getTweets = function() {
    var client = new Twitter(keys.twitter);
    var params = {screen_name: 'CoderQueen'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
    }
  }
});
};
/*
OMDB Request Code
*/
var getMeMovie = function(movieName) {
    if (movieName === undefined) {
      movieName = "Mr Nobody";
    }
  
    var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
  
    request(urlHit, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var jsonData = JSON.parse(body);
  
        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("Rated: " + jsonData.Rated);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("Rotton Tomatoes Rating: " + jsonData.Ratings[1].Value);
      }
    });
  };

var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        console.log(data);
        var dataArray = data.split(",");

        if (dataArray.length === 2) {
            pick(dataArray[0], dataArray[1]);
        }
        else if (dataArray.length === 1) {
                pick(dataArray[0]);
            }
        })
    };

var pick =  function(caseData, functionData) {
    switch(caseData) {
        case "myTweets":
        getTweets();
        break;

        case "getSong":
        getSpotifyData();
        break;

        case "getMeMovie":
        getMeMovie();
        break;

        case "doWhatItSay":
        doWhatItSays();
        break;

        default: 
        console.log("Please enter a correct request!");
    }
};

var run = function(argOne, argTwo) {
    pick (argOne, argTwo);
};

run(process.argv[2], process.argv[3]);

