const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready", ready => {
    client.user.setPresence({game:{name:'Rapid ', type:'PLAYING'}});
    console.log(`Bot on with: ${client.guilds.size} servers`)
})

client.on('message', (message) => {
	let prefix = 'R!';
    if (message.author.bot) return
    if (message.content.substring(0, prefix.length) === prefix) {
        var args = message.content.substring(prefix.length).trim().split(/ +/g);
        
        switch (args[0].toUpperCase()) {
            case 'HELP': {
				var msg = new Discord.RichEmbed()
				.setColor('#ff9900')
				.addField('Commands', 'Rapid Commands!', false)
				.addField('R!purge', 'To delete embarassing messages you dont like use purge command wich can remove 1-100 messages!', false)
				.addField('R!mod', 'Moderate users which are able to do some commands! - R!mod ***User ID***', false)
				.addField('R!8ball', 'Its like a answering machine', false);
				message.channel.send(msg);
				break;
            }
            case 'CREDITS': {
                message.channel.send('Husnainmb36 is founder of bot the scripter is Swiftingly');
                break;
            }
            case 'GTG': {
                message.channel.send(`${message.author} has to go!`);
                break;
            }
            case 'BUGS': {
                message.channel.send('Rapid is currenly experiencing issues staying online!');
                break;
            }
            case 'CMDS': {
                message.channel.send('!help - for help  !bugs - to check bugs updates !gtg - u need to go ');
                break;
            }
			case 'RULES': {
				var msg = new Discord.RichEmbed()
				.setColor('#ff9900')
				.addField('RULE 1', 'No SPAMMING with bot', false)
				.addField('CREDITS', 'The person who helped develop the bot is @Swiftingly#6445 the person who invented the bot is @Husnainmb36#4763', false)
				.addField('LIEING', 'If someone lies about the bot check !rules ', false)
				.addField('VACCANT', 'COMING SOON', false);
				message.channel.send(msg);
				break;
			}
			case 'ADMIN': {
				if (!args[1]) return;
				var mem = message.guild.members.find('id', args[1]);
				var role = message.guild.roles.find('name', 'Admin');
				mem.addRole(role);
				message.channel.send(`Added admin role to ${mem}`);
				break;
			}
			case 'DELADMIN': {
				if (!args[1]) return;
				var mem = message.guild.members.find('id', args[1]);
				var role = message.guild.roles.find('name', 'Admin');
				mem.removeRole(role);
				message.channel.send(`Removed admin role from ${mem}`);
				break;
			}
			case 'MOD': {
				if (!args[1]) return;
				var mem = message.guild.members.find('id', args[1]);
				var role = message.guild.roles.find('name', 'Mod');
				mem.addRole(role);
				message.channel.send(`Added mod role to ${mem}`);
				break;
			}
			case 'DELMOD': {
				if (!args[1]) return;
				var mem = message.guild.members.find('id', args[1]);
				var role = message.guild.roles.find('name', 'Mod');
				mem.removeRole(role);
				message.channel.send(`Removed mod role from ${mem}`);
				break;
			}
			case '8BALL': {
				var myArray = [
					"It is certain",
					"It is decidedly so",
					"Without a doubt",
					"Yes, definitely",
					"You may rely on it",
					"As I see it, yes",
					"Most likely",
					"Outlook good",
					"Yes",
					"Signs point to yes",
					"Reply hazy try again",
					"Ask again later",
					"Better not tell you now",
					"Cannot predict now",
					"Concentrate and ask again",
					"Don't count on it",
					"My reply is no",
					"My sources say no",
					"Outlook not so good",
					"Very doubtful"
				];
				
				var randomItem = myArray[Math.floor(Math.random()*myArray.length)];

				message.channel.send({
					"embed": {
					"title": "<:blob_8ball:349679658033348618> 8Ball",
					"description": `Q: ${message.content.split(' ').slice(1).join(' ')}\nA: ${randomItem}`,
					"color": 2829099
					}
				  });
				  break;
			}
			case 'PURGE': {
				
    // Checks for Manage Messages permission
    if(!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send({
      "embed": {
        "title": "Error",
        "description": "You do not have the \"Manage Messages\" permission.",
        "color": 16711680,
        "footer": {
          "text": "Please contact a server admin."
        }
      }
    })
    
    // Gets number of messages to delete
    let deleteCount = parseInt(message.content.split(' ').slice(1).join(' '));
    deleteCount++

    // Checks if delete count is valid
    if(!deleteCount || deleteCount < 2)
      return message.channel.send({
        "embed": {
          "title": "Error",
          "description": "Invalid amount of messages to delete",
          "color": 16711680,
          "footer": {
            "text": "Please provide a number higher than 0."
          }
        }
      })

    // Purges
    message.channel.bulkDelete(deleteCount)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	  break;
			}
			case 'EMBED': {
				message.channel.send({
  "embed": {
    "description": message.content.split(' ').slice(1).join(' ')
    }
  })
  message.delete().catch(O_o=>{});
  break;
			}
			case 'BAN': {
				if(!message.member.hasPermission('BAN_MEMBERS'))
  return message.channel.send({
    "embed": {
      "title": "Error",
      "description": "You do not have the \"Ban Members\" permission.",
      "color": 16711680,
      "footer": {
        "text": "Please contact a server admin."
      }
    }
  })

    let member = message.mentions.members.first();
    if(!member)
    return message.channel.send({
        "embed": {
          "title": "Error",
          "description": "Invalid member",
          "color": 16711680,
          "footer": {
            "text": "Please mention a user in the server."
          }
        }
      })
    if(!member.bannable) 
      return message.channel.send({
        "embed": {
          "title": "Error",
          "description": "I cannot ban this user",
          "color": 16711680,
          "footer": {
            "text": "Make sure I have ban permissions, and I have a role above the user you want me to ban."
          }
        }
      })
    
    var reason = message.content.split(' ').slice(2).join(' ')

    if(!reason){
      var reason = "No reason provided!"}

    member.ban({ reason: reason+" | Banned by: "+message.author.tag })
    
    message.channel.send({
        "embed": {
          "title": "<:banhammer:401563204586700800> User Banned",
          "description": `${member} \(\`${member.user.tag}\`\) has been banned by ${message.author} \(\`${message.author.tag}\`\) for: ${reason}`,
          "color": 16721960,
          "footer": {
            "text": `ID: ${member.user.id}`
          }
        }
      })
	  break;
			}
			case 'KICK': {
				if(!message.member.hasPermission('KICK_MEMBERS'))
  return message.channel.send({
    "embed": {
      "title": "Error",
      "description": "You do not have the \"Kick Members\" permission.",
      "color": 16711680,
      "footer": {
        "text": "Please contact a server admin."
      }
    }
  })

    let member = message.mentions.members.first();
    if(!member)
    return message.channel.send({
        "embed": {
          "title": "Error",
          "description": "Invalid member",
          "color": 16711680,
          "footer": {
            "text": "Please mention a user in the server."
          }
        }
      })
    if(!member.kickable) 
      return message.channel.send({
        "embed": {
          "title": "Error",
          "description": "I cannot kick this user",
          "color": 16711680,
          "footer": {
            "text": "Make sure I have kick permissions, and I have a role above the user you want me to kick."
          }
        }
      })
    
    var reason = message.content.split(' ').slice(2).join(' ')

    if(!reason){
      var reason = "No reason provided!"}

    member.kick(reason+" | Kicked by: "+message.author.tag)
    
    message.channel.send({
        "embed": {
          "title": "User Kicked",
          "description": `${member} \(\`${member.user.tag}\`\) has been kicked by ${message.author} \(\`${message.author.tag}\`\) for: ${reason}`,
          "color": 16721960,
          "footer": {
            "text": `ID: ${member.user.id}`
          }
        }
      })
				break;
			}
			case 'FLIP': {
				var myArray = [
					"Heads",
					"Tails"
				];
				  
				var randomItem = myArray[Math.floor(Math.random()*myArray.length)];

				message.channel.send({
					"embed": {
					  "title": "Coin Flip",
					  "description": `You got ${randomItem}.`,
					  "color": 12632256
					}
				})
				break;
			}
        }
    }
});
client.login('NDA5NTM5MDE2MDE5NTQyMDE2.DVgFZA.5Zf9Iq6SnR_e39KdpaRCaNDtibA')

