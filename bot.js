const Discord = require('discord.js'),
    config = require('./config.json'),
    fs = require('fs'),
    token = config.token,
    prefix = config.prefix,
    bot = new Discord.Client({
        disableEveryone: true
    });

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

bot.on('ready', async () => {
    console.log(`==== ${bot.user.username} Bot is online ====`);
    console.log(bot.commands);
});

bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(prefix)) return;

    let messageArray = message.content.substring(prefix.length).split(" "),
        command = messageArray[0],
        args = messageArray.slice(1),
        cmd = bot.commands.get(command);

    if(cmd) cmd.run(bot, message, args);
    else message.channel.send('Invalid Command!');
});

bot.login(token);