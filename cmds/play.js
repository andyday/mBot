const session = require('./../core/session'),
    ytdl = require('ytdl-core'),
    qloop = require('./../core/qloop');

module.exports.run = async (bot, message, args) => {
    if (!session.connection) message.channel.send("I'm not in a voice channel right now!");
    else if (session.connection.speaking) message.channel.send("I'm already playing music!"); // will display a message saying the video went to the queue
    else {
        if (session.connection.channel == message.member.voiceChannel) {
            if (!session.q.isEmpty()) {
                let stream = ytdl(
                    session.q.head.val,
                    { filter: 'audioonly' }
                );
                session.connection.playStream(stream);
            } else message.channel.send('The song queue is empty!');
        } else message.channel.send('I need to be in the same voice channel as you to play music!');
    }
};

module.exports.help = {
    name: "play",
    description: "play desc"
};