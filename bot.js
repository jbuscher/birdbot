var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var giphy = require('giphy-api')('zRB0k85tUVrcWd6RMLFo82vlelGRWAuS');

var birdWords = ["birb", "partyparrot", "birdswitharms", "crow", "owl", "bird", "parrot", "birdperson"];

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
        switch(cmd) {
            // !bird
            case 'bird':
                getGif(userID, birdWords, function(url) {
                    bot.sendMessage({
                        to: channelID,
                        message: url
                    });
                });
            break;
            // !hots
            case 'hots':
                getGif('', ['bat signal'], function(url) {
                    bot.sendMessage({
                        to: channelID,
                        message: url
                    });
                });
            break;
// !woody
            case 'woody':
                getGif('', ['toystory', 'toy story'], function(url) {
                    bot.sendMessage({
                        to: channelID,
                        message: url
                    });
                });
            break;

        // !SCOOBY
            case 'scooby':
                getGif('', ['scooby', 'scooby doo'], function(url) {
                    bot.sendMessage({
                        to: channelID,
                        message: url
                    });
                });
            break;

            // !JOJO
            case 'jojo':
                getGif('', ['jojos bizarre adventure'], function(url) {
                    bot.sendMessage({
                        to: channelID,
                        message: url
                    });
                });
            break;
            // Just add any case commands if you want to..
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