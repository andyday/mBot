const session = require('./../core/session'),
    help = require('./../config/config').help;

module.exports.run = async (bot, message, args) => {
    if (message.member.voiceChannel) {
        if (!session.connection) {
            session.connection = await message.member.voiceChannel.join();
            bot.user.setPresence({ game: { name: `Music | ${help}` }, status: 'online' });
        } else {
            if (session.connection.channel != message.member.voiceChannel) {
                session.connection = await message.member.voiceChannel.join();
                bot.user.setPresence({ game: { name: `Music | ${help}` }, status: 'online' });
            } else message.channel.send("I'm already in that voice channel!");
        }
    } else message.channel.send('You must be in a voice channel first!');
};

module.exports.help = {
    name: "join",
    description: "join desc"
};