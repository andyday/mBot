const Q = require('./../core/Q'),
    session = require('./../core/session');

session.q = new Q();

module.exports.run = async (bot, message, args) => {
    session.q.add(args[0]);
    message.channel.send(`I just added your song to the queue!`);
};

module.exports.help = {
    name: "queue",
    description: "queue desc"
};