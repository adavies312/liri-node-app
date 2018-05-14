require("dotenv").config();

var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
// console.log(spotify)
// console.log(client);

var song = process.argv[3];

//NPM Module for ODMB
var request = require("request");

var commands = process.argv[2]

//Do What It Says
var fs = require("fs");


switch (commands) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong(song);
        break;
    case "movie-this":
        var movieName = process.argv[3];
        movieThis(movieName);

        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        break;
}
//Function for searching spotify
function spotifyThisSong(song) {
    var song;
    if (!song) {
        song = "The Sign";
    }
    spotify.search({ type: 'track', query: song }, function (error, data) {
        if (!error) {
            // console.log(data.tracks.items[0]);
            //Show the Artist Name
            console.log("Artist(s):" + data.tracks.items[0].artists[0].name);
            //Show the Song Name
            console.log("Song Name: " + song);
            //Show the Preview Link
            console.log("Preview Link: " + data.tracks.items[0].preview_url)
            //Show the Album Name
            console.log("Album Name: " + data.tracks.items[0].album.name);

        }
    })
}
// end of spotify


// Start of Twitter
function myTweets() {
    var params = {
        screen_name: 'kanyewest',
        count: 20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {


                console.log(tweets[i].text + "---Tweeted at: " + tweets[i].created_at);
                console.log("***********************************************************************")
            }
        }
    });
}

// end of Twitter

//start of omdb
function movieThis(movieName) {
    var movieName = process.argv[3];
    if (!movieName) {
        movieName = "Mr. Nobody";
    }
    var omdbURL = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy';
    // console.log(movieName);
    request(omdbURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);
            // console.log(body);


            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMDB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);

        }
    });
};
// end of omdb

//Do What It Says
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        } else {
           var song = data.split(',');
           var songName = song[1];
           console.log(songName);
            spotifyThisSong(songName);
        }

    })
}