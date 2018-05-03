const help = require('./../config/help').help,
    auth = require('./../config/auth');

module.exports.run = async (bot, message, args) => {
    if (message.author.id === auth.ownerid) {
        if (args[0] === 'on') bot.user.setPresence({ game: { name: help }, status: 'dnd' });
        else if (args[0] === 'off') bot.user.setPresence({ game: { name: help }, status: 'idle' });
        else message.channel.send('Invalid argument. please use "on" or "off"');
    } else message.channel.send("You do not have permission to use this command!");
};

module.exports.help = {
    name: "dev",
    description: "arguments: on, off | displays bot in dev mode (dnd online status) | bot owner only"
};