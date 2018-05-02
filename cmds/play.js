const session = require('./../core/session'),
    ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args) => {
    if (!session.connection) message.channel.send("I'm not in a voice channel right now!");
    else if (session.connection.speaking) message.channel.send("queue"); // will display a message saying the video went to the queue
    else session.connection.channel.play(ytdl(
        'https://www.youtube.com/watch?v=ZlAU_w7-Xp8',
        {filter: 'audioonly'}));
};

module.exports.help = {
    name: "play",
    description: "play desc"
};