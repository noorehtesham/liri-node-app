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

    var movieName= "";
    movieTitle = movieTitle || process.argv[3] || "Mr. Nobody";

// encode the URL with %20
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
              
              
          


        };

    })

}

function doWhatitSays() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
       

        var dataArr = data.split(",");
        
//        
        switch(dataArr[0]) {
            case "my-tweets":
                myTweets();
                break;
            case "spotify-this-song":
                spotify(dataArr[1]);
                break;
            case "movie-this":
                movieThis(dataArr[1]);
                
                break;
                
        }
       
       
    });

}
