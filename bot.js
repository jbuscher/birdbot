var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var giphy = require('giphy-api')('zRB0k85tUVrcWd6RMLFo82vlelGRWAuS');

var birdWords = ["birb", "partyparrot", "birdswitharms", "crow", "owl", "bird", "parrot", "birdperson"];

var commands = [
    {name: 'bird', searchTerms: ["birb", "birds with arms", "crow", "owl", "bird", "parrot", "birdperson", "duck"]},
    {name: 'hots', searchTerms: ["bat", "batman", "bat signal"]},
    {name: 'scooby', searchTerms: ["scooby doo", "scooby"]},
    {name: 'woody', searchTerms: ["toy story", "toystory"]},
    {name: 'jojo', searchTerms: ["jojos bizarre adventure"]},
    {name: 'prequel', searchTerms: ["prequels"]},
    {name: 'max', searchTerms: ["dickbutt"]},
]

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0].toLowerCase();
       
        args = args.splice(1);

        for (var i = 0; i < commands.length; i++) {
            if(cmd == commands[i].name) {
                getGif(userID, commands[i].searchTerms, function(url) {
                    bot.sendMessage({
                        to: channelID,
                        message: url
                    });
                });
                break;
            }
        }
        if(cmd == 'chzbrgrs') {
            bot.sendMessage({
                to: channelID,
                message: 'https://giphy.com/gifs/chz-xT9Igr98EBJwfU3ijm'
            });
        }

     }
});

function getGif(user, searchTermArray, callback) {
    var index = Math.floor(Math.random() * searchTermArray.length);
    var dickbutt = user == "234532950039986186"
    var dickbuttVariation = Math.floor(Math.random() * 2);
    var searchTerm;
    if (dickbutt && dickbuttVariation == 1) {
        searchTerm = "dickbutt";
    } else {
        searchTerm = searchTermArray[index];
    }
    giphy.random(searchTerm, function (err, res) {
        var url = res.data.url;
        callback(url);
    });
}