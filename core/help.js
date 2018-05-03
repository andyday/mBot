const Discord = require('discord.js'),
    help = require('./../config/help'),
    prefix = require('./../config/prefix');

module.exports.run = (cmds, message) => {
    let embed = new Discord.RichEmbed()
        .setColor("#ff99cc")
        .setTitle("Help")
        .setDescription(`The current prefix for bot commands is "${prefix.prefix}"`)
        .addField("Online Status", "Red: Please do not use bot commands || Yellow: Bot is not currently in a voice channel and is free to use || Green: Bot is currently in use");

    let allcmds = cmds.values();
    for (let c of allcmds) {
        embed.addField(c.help.name, c.help.description);
    }

    message.channel.send(embed);
}