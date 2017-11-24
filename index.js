const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();


client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log("Bot launch successful...")
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setGame("%commands");
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});
  
// Commands
client.on('message', (message) => {
    if(!message.content.startsWith(config.prefix) || message.author.client) return;   // Stops the bot fromm accidentally sending a command which would cause an infinite loop
    console.log("I saw that command")
    //General Commands
    // 'Commands' command
    if(message.content.startsWith(config.prefix + 'commands') ) {
        message.delete(1000);
        message.author.send("Heres the list of commands:\n   scrimtimes\n   scrimremind\n   botinfo")
        message.author.send("NOTE: All commands start with '%' symbol\nMore to be added soon!")
    }

    // 'Scrimtimes' command
    if(message.content.startsWith(config.prefix + 'scrimtimes')) {
        message.delete(1000);
        message.author.send("```AU Start Times:\n    Game 1: 6:45pm\n    Game 2: 7:45pm\n    Game 3: 8:30pm\n\nNZ Start Times:\n    Game 1: 8:45pm\n    Game 2: 9:45pm\n    Game 3: 10:30pm```");

    }

    // 'Botinfo' command
    if(message.content.startsWith(config.prefix + 'botinfo')) {
        message.delete(1000);
        message.reply("Dv8_Bot is the main management bot for the Deviate Discord Server. For any inquiries, contact MegaGG#5621.");
    }

    // 'Scrimremind' command
    if(message.content.startsWith(config.prefix + 'scrimremind')) {
        message.delete(1000);
        message.channel.send("<@&380939853635911680> Reminder that there are scrims tonight! type %scrimtimes to get full list of times.")
    }
});
