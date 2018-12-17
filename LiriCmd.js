var liribot = require('./liri');
var lbot = new liribot();
var iCmd = "";
var rQuest = "";

if (process.argv[2] != null) {
    iCmd = process.argv[2];
}
if (process.argv[3] != null) {
    rQuest = process.argv.slice(3).join(" ");
}

switch (iCmd.toLowerCase()) {
    case 'concert-this':
        lbot.BandSearch(rQuest).then(rslt => {
            console.log(rslt);
        }).catch(err => {
            console.log(err);
        });
        break;
    case 'spotify-this-song':
        lbot.SongSearch(rQuest).then(rslt => {
            console.log(rslt);
        }).catch(err => {
            console.log(err);
        });
        break;
    case 'movie-this':
        lbot.MovieSearch(rQuest).then(rslt => {
            console.log(rslt);
        }).catch(err => {
            console.log(err);
        });
        break;
    case 'do-what-it-says':
        fs.readFile('random.txt', "utf8", function(err, data) {
            if (err) {
                throw err;
            }
            content = data;
            itms = content.split(",");
            if (itms[0] === 'spotify-this-song') {
                lbot.SongSearch(itms[1]).then(rslt => {
                    console.log(rslt);
                }).catch(err => {
                    console.log(err);
                });
            };
        });
        break;
    case 'i-feel-lucky':
        lbot.DuckSearch().then(rslt => {
            console.log(rslt);
        }).catch(err => {
            console.log(err);
        });
        break;
    default:
        console.log("Please choose the one of the following: \r\n concert-this <band name> \r\n spotify-this-song <song name> \r\n movie-this <movie title> \r\n do-what-it-says \r\n i-feel-lucky");
}