const help = require('./../config/config').help;

module.exports.run = async (bot, message, args) => {
    

    if (args[0] === 'on') bot.user.setPresence({ game: { name: help }, status: 'dnd' });
    else if (args[0] === 'off') bot.user.setPresence({ game: { name: help }, status: 'idle' });
    else message.channel.send('Invalid arguments. please use "on" or "off"');
};

module.exports.help = {
    name: "dev",
    description: "arguments: on, off | displays bot in dev mode (dnd online status) | bot owner only"
};