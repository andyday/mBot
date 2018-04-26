const Discord = require('discord.js'),
logger = require('winston'),
auth = require('./auth.json'),
prefix = '.';

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

var bot = new Discord.Client();

bot.on('ready', function(evt){
    logger.info('Bot is connected.');
});

bot.on('message', function(message){
    if(message.author.equals(bot.user)) return;
    if(!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(' ');

    switch(args[0].toLowerCase()){
        case 'ping':
            message.channel.send('pong');
            break;
        default:
            message.channel.send('Invalid Command. Check .help for command list.');
    }
});

bot.login(auth.token);