require("dotenv").config();
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var req = require("request");
var ddg = require("node-ddg-api").DDG;
var Items = require("./items");
var spotify = new Spotify(keys.spotify);
var verbose = process.env.Verbose;
process.env.spotify

function LogToFile(fn = "log.txt", data, vrb = false) {
    data = `${moment()} \r\n` + data;
    fs.appendFile(fn, data, function(err) {
        if (err) {
            console.log(err);
        }
        if (vrb === true) {
            console.log(`The data was appended to ${fn}`);
        }
    });
};

class Liri {
    constructor() {

    };


    SongSearch(song) {
        return new Promise((resolve, reject) => {
            if (verbose) {
                var msg = `Searching for song: ${song} \r\n`;
                LogToFile("log.txt", msg, verbose);
            }
            spotify.search({ type: 'track', query: song }, function(err, data) {
                if (err) {
                    LogToFile("liri.log", err, verbose);
                    return console.log('Error occurred: ' + err);
                }
                var song = new Items.Song(data.tracks.items[0].album.artists[0].name, data.tracks.items[0].name, data.tracks.items[0].preview_url, data.tracks.items[0].album.name)

                var opt = {
                    Artist: song.artist,
                    Track: song.name,
                    Link: song.link,
                    Album: song.album
                };

                LogToFile("log.txt", opt, verbose);
                resolve(opt);


            })
        });

    }

    BandSearch(band) {
        return new Promise((resolve, reject) => {
            if (verbose) {
                var msg = `Searching for band: ${band} \r\n`;
                LogToFile("log.txt", msg, verbose);
            }

            var url = `https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`
            var iBand = band;
            req(url, function(err, response, rBody) {
                if (err) {
                    LogToFile("liri.log", err, verbose);
                    return console.log('Error occurred: ' + err);
                }
                var rtn = JSON.parse(rBody);
                var opt = "";
                if (Object.keys(rtn).length > 0) {
                    var concert = new Items.Concert(rtn[0].lineup.join(','), rtn[0].venue.name, rtn[0].venue.city + "," + rtn[0].venue.region, moment(rtn[0].datetime).format("YYYY-MM-DD"))
                    opt = {
                        Artist: concert.artist,
                        Venue: concert.venue,
                        Location: concert.location,
                        Date: concert.date
                    };
                    LogToFile("log.txt", opt, verbose);
                    resolve(opt);
                } else {
                    opt = `There is no concert for ${iBand}`;
                    LogToFile("log.txt", opt, verbose);
                    reject(opt);
                }
            });
        });
    };

    MovieSearch(movie) {
        return new Promise((resolve, reject) => {
            if (verbose) {
                var msg = `Searching for movie: ${movie} \r\n`;
                LogToFile("log.txt", msg, verbose);
            }
            var url = `https://www.omdbapi.com/?apikey=trilogy&t=${movie.trim()}`
            var iMovie = movie;
            req(url, function(err, response, rBody) {
                if (err) {
                    LogToFile("liri.log", err, verbose);
                    return console.log('Error occurred: ' + err);
                }
                var rtn = [];
                rtn = JSON.parse(rBody);
                var opt = "";
                if (Object.keys(rtn).length > 2) {
                    var movie = new Items.Movie(rtn.Title, rtn.Year, rtn.Ratings[0].Value, rtn.Country, rtn.Language, rtn.Plot, rtn.Actors);
                    opt = {
                        Title: movie.title,
                        Year: movie.productionyear,
                        IMDB_Rating: movie.imdb,
                        Country: movie.country,
                        Language: movie.language,
                        Plot: movie.plot,
                        Actor: movie.actors
                    };
                    LogToFile("log.txt", opt, verbose);
                    resolve(opt);
                } else {
                    opt = `There is no movie by the name ${iMovie}`;
                    LogToFile("log.txt", opt, verbose);
                    reject(opt);
                }

            });
        });
    }

    DuckSearch() {
        return new Promise((resolve, reject) => {
            if (verbose) {
                var msg = `Trying DuckDuckGo Instasearch\r\n`;
                LogToFile("log.txt", msg, verbose);
            }
            var iSearch = new ddg('Liribot');
            iSearch.instantAnswer('superman', { skip_disambig: '0' }, function(err, response) {
                if (!err) {
                    var rslt = `${response.RelatedTopics[0].Text}\r\n`;
                    LogToFile("log.txt", rslt, verbose);
                    resolve(opt);
                } else {
                    LogToFile("log.txt", rslt, verbose);
                    reject(opt);
                }
            });
        });
    }

}

module.exports = Liri;