const Discord = require('discord.js'),
    config = require('./config.json'),
    token = config.token,
    prefix = config.prefix,
    bot = new Discord.Client({
        disableEveryone: true
    });

bot.on('ready', async () => {
    console.log(`==== ${bot.user.username} Bot is online ====`);
});

bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(prefix)) return;

    let messageArray = message.content.substring(prefix.length).split(" "),
        command = messageArray[0],
        args = messageArray.slice(1);

    switch(command.toLowerCase()){
        case 'myinfo':
            let embed = new Discord.RichEmbed()
                .setAuthor(message.author.username)
                .setDescription("This is the user's info!")
                .setColor("#9B59B6")
                .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
                .addField("ID", message.author.id)
                .addField("Created At", message.author.createdAt);
            
            message.channel.send(embed);
            break;
        default:
            message.channel.send("Invalid Command.");
    }
});

bot.login(token);