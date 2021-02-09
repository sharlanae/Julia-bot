const Discord = require('discord.js')
const client = new Discord.Client()
const fetch = require('node-fetch')
const prefix = '-';
const querystring = require('querystring')

client.on('message', async message => {
    
	const args = message.content.substring(prefix.length).split(" ")
    
	if (message.content.startsWith(`${prefix}urban`)) {	
        message.channel.send(args);	
		const searchString = querystring.stringify({ term: args.slice(1).join(" ") })
        message.channel.send(searchString);
        if (!args.slice(1).join(" ")) return message.channel.send(new Discord.MessageEmbed()
            .setColor("PURPLE")
            .setDescription(`You need to specify something you want to search the urban dictionary`)
        )

        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${searchString}`).then(response => response.json())

        try {
            const [answer] = list

            const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str)

            const embed = new Discord.MessageEmbed()
                .setColor("PURPLE")
                .setTitle(answer.word)
                .setURL(answer.permalink)
                .addFields(
                    { name: 'Definition', value: trim(answer.definition, 1024) },
                    { name: 'Example', value: trim(answer.example, 1024) },
                    { name: 'Rating', value: `${answer.thumbs_up} 👍. ${answer.thumbs_down} 👎.` },
                )
            message.channel.send(embed)
        } catch (error) {
            console.log(error)
            return message.channel.send(new Discord.MessageEmbed()
                .setColor("PURPLE")
                .setDescription(`No results were found for **${args.slice(1).join(" ")}**`)
            )
        }
	}		
})

// const Discord = require('discord.js');

// const client =  new Discord.Client();

// const prefix = '-';

// const fs = require('fs'); // to get into other js files

// client.commands = new Discord.Collection();

// const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); // make sure we only read js files
// for(const file of commandFiles){
//     const command = require(`./commands/${file}`);

//     client.commands.set(command.name, command);

// }

// client.once('ready', () => {
//     console.log('¡Julia está lista!');
// });
// // 2 ways to run the code which makes julia appear as online
// // node . [in the terminal for this file]
// // node index.js (just the name of this file)
// client.on('message', message => {
//     if(!message.content.startsWith(prefix) || message.author.bot) return; // do nothing if there is no prefix or the message is from the bot itself

//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();

//     if(command === 'marco'){
//         //message.channel.send('polo')
//         client.commands.get('marco').execute(message, args);
//     } else if (command == 'google'){
//         message.channel.send('https://www.google.com');
//     }
// });
// client.login(''); // MUST BE AT THE END
