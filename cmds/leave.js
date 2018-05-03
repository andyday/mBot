const session = require('./../core/session'),
    help = require('./../config/help').help;

module.exports.run = async (bot, message, args, connection) => {
    if (session.connection) {
        session.connection.channel.leave();
        session.connection = null;
        bot.user.setPresence({ game: { name: help }, status: 'idle' });
    } else message.channel.send("I'm not in a voice channel right now!");
};

module.exports.help = {
    name: "leave",
    description: "leave desc"
};