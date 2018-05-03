const Discord = require('discord.js'),
    auth = require('./config/auth'),
    prefixjson = require('./config/prefix'),
    helpjson = require('./config/help'),
    adminjson = require('./config/admin'),
    fs = require('fs'),
    token = auth.token,
    prefix = prefixjson.prefix,
    help = helpjson.help,
    adminname = adminjson["admin-role-name"],
    adminid = adminjson["admin-role-id"],
    adminfnc = require('./core/admin'),
    helpmsg = require('./core/help'),
    bot = new Discord.Client({
        disableEveryone: true
    });


//// commands collection setup ////
bot.commands = new Discord.Collection();

fs.readdir('./cmds/', (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) {
        console.log('No commands to load!');
        return;
    }

    console.log(`Loading ${jsfiles.length} commands`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});
//// end commands collection setup ////

bot.on('ready', async () => {
    console.log(`==== ${bot.user.username} Bot is online ====`);
    bot.user.setPresence({ game: { name: help }, status: 'idle' });
    await adminfnc(bot);
});

//// command running ////
bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (message.content === help) {
        helpmsg.run(bot.commands, message);
        return;
    }
    if (!message.content.startsWith(prefix)) return;

    let messageArray = message.content.substring(prefix.length).split(" "),
        command = messageArray[0],
        args = messageArray.slice(1),
        cmd = bot.commands.get(command)

    if (cmd) cmd.run(bot, message, args);
    else message.channel.send('Invalid Command!');
});
//// end command running ////

bot.on('disconnect', () => {
    bot.user.setPresence({ Game: { name: null }, status: 'offline' });
    console.log("Bot disconnected. Please restart bot.");
});

bot.login(token);