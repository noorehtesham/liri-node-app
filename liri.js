require("dotenv").config();

var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var userArg = process.argv[2];
var keys = require("./keys.js");
var fs = require('file-system');


if (userArg == "my-tweets") {
    myTweets();
}
if (userArg == "spotify-this-song") {
    spotify();
}
if (userArg == "movie-this") {
    movieThis();

}
if (userArg == "do-what-it-says") {
    doWhatitSays();
}

function myTweets() {
    var client = new Twitter({
        consumer_key: 'fxSmjqfZB9BFY5apqOR40X1fT',
        consumer_secret: 'rbyRVg9AgEoeeECdP36iVR9W7gwwGy2bqoIPX9VaYHL0NPM2it',
        access_token_key: '976891943157366784-F8u8Q4pl2ms27mEmav6ci4pdrC7W96n',
        access_token_secret: '19JmaxoiK41lMDrDez11o3UujsmmZvVV8MN1NCSOqRPxP'

    });

    var params = {
        screen_name: 'noooorla',
        count: 20,
        lang: 'en'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets.map(tweet => tweet.text));
        } else {
            console.log(error);
        }
    });

};



function spotify(songName) {
    var songName = process.argv[3];
    var spotify = new Spotify({
        id: "9fd36a0e5ab64d36adb0bf79527dacc9",
        secret: "a710149eb69f4990bd6e276f54f9c2e1"
    });
    spotifyApi.getArtists(['2hazSY4Ef3aB9ATXW7F5w3', '6J6yx1t3nwIDyPXk5xa7O8'])
        .then(function (data) {
            console.log('Artists information', data.body);
        }, function (err) {
            console.error(err);
        });
    spotifyApi.getAlbums(['5U4W9E5WsYb2jUQWePT8Xm', '3KyVcddATClQKIdtaap4bV'])
        .then(function (data) {
            console.log('Albums information', data.body);
        }, function (err) {
            console.error(err);
        });

    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
};

function movieThis(movieTitle) {

    var movieName = "";
    var movieTitle = process.argv[3] || "Mr. Nobody";

    for (var i = 2; i < movieTitle.length; i++) {
        if (i > 2 && i < movieTitle.length) {
            movieName = movieName + "+" + movieTitle[i];
        } else {
            movieName += movieTitle[i];
        }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (err, response, body) {
        if (err) {
            return console.error(err);
        } else {
                body = JSON.parse(body);
                console.log('%s (%d) %d/10', body.Title + "\n", body.Year + "\n",  body.imdbRating + "\n", body.Ratings[1] + "\n", body.Country + "\n", body.Language + "\n", body.Plot + "\n", body.Actors + "\n");
              
              
          


            // Saw (2004) 7.6/10 
            // Two men wake up at opposite sides of a dirty, disused bathroom, chained 
            // by their ankles to pipes. Between them lies... 
        };

    })

}

function doWhatitSays() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);

        var dataArr = data.split(",");

        console.log(dataArr);
    });

}
