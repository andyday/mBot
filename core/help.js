const Discord = require('discord.js'),
    config = require('./../config/config');

module.exports.run = (cmds, message) => {
    let embed = new Discord.RichEmbed()
        .setColor("#ff99cc")
        .setTitle("Help")
        .setDescription(`The current prefix for bot commands is "${config.prefix}"`)
        .addField("Online Status", "Red: Please do not use bot commands || Yellow: Bot is not currently in a voice channel and is free to use || Green: Bot is currently in use");

    let allcmds = cmds.values();
    for (let c of allcmds) {
        embed.addField(c.help.name, c.help.description);
    }

    message.channel.send(embed);
}