const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});


const Discord = require('discord.js');
const client = new Discord.Client();
const cmd = require("node-cmd");
const ms = require("ms");
const fs = require('fs');
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const simpleytapi = require('simple-youtube-api')
const util = require("util")
const gif = require("gif-search");
const jimp = require("jimp");
const guild = require('guild');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const pretty = require("pretty-ms");
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');

//السورس

const prefix = "$"
const developers = "764157419416584193"

//كود التيكت

const category = "722189456135946361";//تعديل مهم ايدي الكاتيجوري
let mtickets = true;
let tchannels = [];
let current = 0;
//جميع الحقوق محفوظة للمبرمج Тигр#0080 و سيرفر ME CODES و GAMES NETWORK
 

client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  let args = message.content.split(" ");
  let author = message.author.id;
  if (args[0].toLowerCase() === `${prefix}thelp`) {
    let embed = new Discord.RichEmbed()
      .addField(``);
    await message.channel.send(
      ``
    );
    await message.channel.send(embed);
  } else if (args[0].toLowerCase() === `${prefix}new`) {
        if (message.channel.id !== "767862710082732074")//تعديل مهم ايدي روم انشاء التذاكر
      return message.reply(
        `**YOU CANT OPEN TICKET HERE PLEAS MOVE TO <#745287486040965230>**`
      );
    if (mtickets === false)
      return message.channel.send(
        `**TICKET FEATURE IS CURRENTLY DISABLE**`
      );
    if (!message.guild.roles.exists(gg => gg.name === "Support team 🔧"))
      return message.channel.send(`**YOU NEED TO DO THIS ROLE \`Support team 🔧\`**`);
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        `**I DO NOT HAVE ENOUGH PERMISSIONS**`
      );
    console.log(current);
    let openReason = "";
    current++;
    message.guild.createChannel(`ticket-${current}`, "text").then(c => {
      tchannels.push(c.id);
      c.setParent(category);
       let Reason = message.content.split(" ").slice(1).join(" ");
 if(!Reason) Reason = 'NONE';
      const done = new Discord.RichEmbed()
 .setColor(`GREEN`)
 .setTitle(`CREATE TICKET`)
 .setDescription(`**OPEN TICKET CHANNEL NAME :** ${message.channel.name}
 **CREATOR :** <@${message.author.id}>
 **REASON :** ${Reason}`)
 .setTimestamp()
 .setThumbnail(`https://cdn.discordapp.com/emojis/732739356447735808.png?v=1`)
 .setFooter("MADE BY Тигр#0080")
 let log = message.guild.channels.find("name", "tickets-log");
 if(log) log.send(done)
      message.channel.send(`**YOUR TICKET HAS BEEN CREATED**`) .then(m => m.delete(5000));
              let role = message.guild.roles.find(gg => gg.name === "Support team 🔧");
        let role2 = message.guild.roles.find(gg => gg.name === "@everyone");
        c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
      c.overwritePermissions(message.guild.id, {
        READ_MESSAGES: false,
        SEND_MESSAGES: false
      });
      c.overwritePermissions(message.author.id, {
        READ_MESSAGES: true,
        SEND_MESSAGES: true
      });

      if (args[1])
        openReason = `\nTICKET REASON : ${args.slice(1).join(" ")}`;
      let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor("GREEN")
        .setDescription(`HELLO ${message.author}

THANKS FOR CONTACTING US PLEASE WAIT FOR THE SUPPORT TEAM
       ${openReason}`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/761375497292480532/762631308412452864/ticket_1.png`)        
        .setFooter("MADE BY Тигр#0080")
            c.send(`<@&722396729504432210 >`);//تعديل مهم ايدي رتبة السوبورت
      c.send(`HERE IS YOUR TICKET ${message.author}`);
      c.send(embed); 
    });
  } else if (args[0].toLowerCase() === `${prefix}opentickets`) {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        `**YOU ARE NOT FROM THE ADMINISTARTION**`
      );
    if (args[1] && args[1].toLowerCase() === "enable") {
      mtickets = true;
      message.channel.send(
        `**TICKET FEATURE HAS BEEN OPENED**`
      );
    } else if (args[1] && args[1].toLowerCase() === "disable") {
      mtickets = false;
      message.channel.send(
        `**TICKET FEATURE LOCKED**`
      );
    } else if (!args[1]) {
      if (mtickets === true) {
        mtickets = false;
        message.channel.send(
          `**TICKET FEATURE LOCKED**`
        );
      } else if (mtickets === false) {
        mtickets = true;
        message.channel.send(
          `**TICKET FEATURE HAS BEEN OPENED**`
        );
      }
    }
  } else if (args[0].toLowerCase() === `${prefix}close`) {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
      `**YOU ARE NOT FROM THE ADMINISTARTION**`
      );
    if (
      !message.channel.name.startsWith("ticket-") &&
      !tchannels.includes(message.channel.id)
    )
      return message.channel.send(`**THIS IS NOT TICKET**`);
     let Reason = message.content.split(" ").slice(1).join(" ");
 if(!Reason) Reason = 'NONE';
let closee = new Discord.RichEmbed()
.setColor(`RED`)
.setAuthor(`CLOSED TICKET`)
.setDescription(`**DELETE TICKET CHANNEL NAME :** ${message.channel.name}
**DELETER :** <@${message.author.id}>
**REASON :** ${Reason}`)
.setTimestamp()
.setThumbnail(`https://cdn.discordapp.com/emojis/732739369231974400.png?v=1`)
.setFooter("MADE BY Тигр#0080")
let log = message.guild.channels.find("name", "tickets-log"); 
if(log) log.send(closee)
 
    message.channel.send(
      `**TICKET DELETED AFTER 5 SECONDS**`
    );
    tchannels.splice(tchannels.indexOf(message.channel.id), 1);
    setTimeout(() => message.channel.delete(), 5000);
   //جميع الحقوق محفوظة للمبرمج Тигр#0080 و سيرفر ME CODES و GAMES NETWORK
    } if(message.content.startsWith(prefix + `closeall`)) {
     if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**I DONT HAVE PERMISSIONS**`)
     if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('**YOU DONT HAVE PERMISSIONS**');
      message.guild.channels.filter(c => c.name.toLowerCase().startsWith("ticket-")).forEach(channel => { channel.delete(); })
const ttt = new Discord.RichEmbed()
.setColor("GREEN")
.addField(`**SUCCESSFULLY DELETE ALL TICKETS**`,`** **`)
message.channel.send(ttt)
let log = message.guild.channels.find("name", "tickets-log");
const rr = new Discord.RichEmbed()
.setColor("e8a21e")
.setAuthor(`DELETE ALL TICKETS`)
.setDescription(`**DELETER :** <@${message.author.id}>`)
.setThumbnail(`https://cdn.discordapp.com/attachments/728371655474413649/762442788200644608/warning.png`)
.setFooter("MADE BY Тигр#0080")
.setTimestamp();
if(log) return log.send(rr)
 //جميع الحقوق محفوظة للمبرمج Тигр#0080 و سيرفر ME CODES و GAMES NETWORK
} if(message.content.startsWith(prefix + `add`)) {
  if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**I DONT HAVE PERMISSIONS**`)
 if(!message.channel.name.startsWith("ticket-")) return message.channel.send(`**هذا الأمر فقط للحصول على التذاكر**`);
let member = message.mentions.members.first();
if(!member) return message.channel.send(`**MENTION THE USER**`);
if(message.channel.permissionsFor(member).has(['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'])) return message.channel.send(`**THIS MEMBER IS IN THIS TICKET**`);
message.channel.overwritePermissions(member.id, { SEND_MESSAGES: true, VIEW_CHANNEL: true, READ_MESSAGE_HISTORY: true });
message.channel.send(`**SUCCESSFULLY ADDED THIS MEMBER**`)
let tgt = new Discord.RichEmbed()
.setColor(`GREEN`)
.setAuthor(`MEMBER ADDED`)
.setDescription(`**TICKET CHANNEL NAME :** #${message.channel.name}
**MEMBER ADDED NAME :** ${member}
**BY :** <@${message.author.id}>`)
.setThumbnail(`https://cdn.discordapp.com/emojis/732739356447735808.png?v=1`)
.setFooter("MADE BY Тигр#0080")
.setTimestamp();
let log = message.guild.channels.find("name", "tickets-log");
if(log) return log.send(tgt);
} if(message.content.startsWith(prefix + `remove`)) {
 if(!message.channel.name.startsWith("ticket-")) {
     return message.channel.send(`**هذا الأمر فقط للحصول على التذاكر**`);
 }
 let member = message.mentions.members.first();
 if(!member || member.id === client.user.id) {
     return message.channel.send(`**MENTION THE USER**`);
 }
 if(!message.channel.permissionsFor(member).has(['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'])) {
     return message.channel.send(`**THIS MEMBER IS NOT IN THIS TICKET**`);
 }
 message.channel.overwritePermissions(member.id, { SEND_MESSAGES: false, VIEW_CHANNEL: false, READ_MESSAGE_HISTORY: false });
 message.channel.send(`**SUCCESSFULLY REMOVE THIS MEMBER**`)
 let gtg = new Discord.RichEmbed()
.setColor(`RED`)
.setAuthor(`MEMBER REMOVED`)
.setDescription(`**TICKET CHANNEL NAME :** ${message.channel.name}
**MEMBER REMOVED NAME :** ${member}
**BY :** <@${message.author.id}>`)
.setThumbnail(`https://cdn.discordapp.com/emojis/732739369231974400.png?v=1`)
.setFooter("MADE BY Тигр#0080")
.setTimestamp();
let log = message.guild.channels.find("name", "tickets-log");
if(log) return log.send(gtg);
 }
 
 });
//جميع الحقوق محفوظة للمبرمج Тигр#0080 و سيرفر ME CODES و GAMES NETWORK

client.on('message', message => {
if (message.content.startsWith(prefix+"set tickets-log")) {
    var args = message.content.split(" ").slice(1);
    var argrst = args.join(' ');
                message.guild.createChannel(`${argrst}`, 'text')
      }
});
//جميع الحقوق محفوظة للمبرمج Тигр#0080 و سيرفر ME CODES و GAMES NETWORK
      

/////////
client.on('message', wolf => {
  if (wolf.content === prefix + "thelp") {////هنا  الامر
let embed = new Discord.RichEmbed()
.setColor("GREEN")////لون الامبد
.setDescription(`___قائمة الاوامر : :tickets:___

_${prefix}new : لفتح تذكرة_

_${prefix}close : لقفل تذكرة_

_${prefix}closeall : لقفل كل التذاكر_

_${prefix}add : لاضافة شخص من التذكرة_

_${prefix}remove : لازالة شخص من التذكرة_

_${prefix}rename : لتغيير اسم التذكرة_

_${prefix}opentickets enable : لتفعيل خاصية فتح التذاكر_

_${prefix}opentickets disable : لقفل خاصية فتح التذاكر_

_${prefix}set tickets-log : لاضافة اللوق الخاص بالتذكرة_`)////هنا الاوامر
.setFooter("MADE BY Тигр#0080")
wolf.channel.send({embed:embed});
}
});
//جميع الحقوق محفوظة للمبرمج Тигр#0080 و سيرفر ME CODES و GAMES NETWORK

client.on("message" , mecodes => {
if (mecodes.content.startsWith(prefix + "rename")) {
    var nwame = mecodes.content.split(" ").slice(1);
    if (!mecodes.channel.name.startsWith(`ticket-`))
      return mecodes.channel.send(
        `**THIS IS NOT TICKET**`
      );
    mecodes.channel.setName("ticket" + " " + nwame);
  }
});
//جميع الحقوق محفوظة للمبرمج Тигр#0080 و سيرفر ME CODES و GAMES NETWORK
//تم انشاء هذا الكود تاريخ 7 اكتوبر 2020 بواسطة Тигр#0080


//كود الاقتراحات و التحذيرات

const sug = require("./suggestions.json")
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", msg => {
    let message = msg;
    let messageArray = msg.content.split(" ");
    let args = messageArray.slice(1); 
            let caseid = Date.now() + msg.author.discriminator
    if (msg.content.startsWith(prefix + "sug" || msg.content.startsWith(prefix + "sug"))){
            let suggestionchat = msg.guild.channels.find(channel => channel.name === "ㄨ𝖲𝖴𝖦𝖦𝖤𝖲𝖳𝖨𝖮𝖭𝖲") 
            let suggestion =  args.join(' '); 
            if(!suggestion) return message.channel.send('_الرجاء وضع اقتراحك بعد الأمر_');
            if(!suggestionchat) return message.channel.send('_لا يمكنني ايجاد الشات_');
            let suggestionembed = new Discord.RichEmbed()
                .setAuthor('NEW SUGGESTION')
                .addField('SUGGESTION BY :', `**NAME :** ${message.author.tag} **ID :** ${message.author.id}`, true)
                .addField('SUGGESTION FROM SERVER :', `**NAME :** ${message.guild.name} **ID :** ${message.guild.id}`)
                .addField('SUGGESTION :', `_${suggestion}_`)
                .setColor('BLUE')
                .setFooter(`MADE BY Тигр#0080`)
                .setThumbnail(message.author.avatarURL)
                .setTimestamp();
            suggestionchat.send(suggestionembed).then(send =>{
            sug[caseid] = {
                message: suggestion,
                by: msg.author.id,
                Time: message.createdAt,
                thisisimportant: send.id
               }
               fs.writeFile("./suggestions.json", JSON.stringify(sug, null , 4), err =>{
                console.log(err);
                })
              })
            message.channel.send("_تم أرسال اقتراحك_")
              }
 
  if (msg.content.startsWith(prefix + "allsuggestions")){
    let data = undefined;
  for(i in sug){
      if (data === undefined) {
        data = "";
      }
      let data1 = sug[i].message
      let data2 = sug[i].by
      const stuff = `${data1} **By** <@${data2}>`;
      data += (stuff) + "\n\n";
    }
    if (data !== undefined) {
      const richEmbed = new Discord.RichEmbed();
      richEmbed.addField("Messages", data)
      msg.channel.send(richEmbed)
    }else if(data === undefined) return message.channel.send("Couldn't find any suggestion")
  }
  if (msg.content.startsWith(prefix + "dsug")){
        let that = args.join(' ')
        if(!that) return message.channel.send("Hmmm please put an id")
        if(sug[that] === undefined) return message.channel.send("Couldn't find that suggestion id!")
            message.channel.send("Deleted!")
            message.guild.channels.find(ch => ch.name === "الاقتراحات").fetchMessage(sug[that].thisisimportant).then(msg => msg.delete());
            delete sug[that];
            fs.writeFile("./suggestions.json", JSON.stringify(sug, null , 4), err =>{
                console.log(err)
              })
            }
        
})

client.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    var messages = message.content.split(" ").slice(1);

    let args = messages.slice(1); 

    var prefix = ":";
    if(message.content.startsWith(prefix+'report')){
        let msg = message;


        if(message.guild.member(message.author).roles.get(msg.guild.roles.find(role => role.name === `banned_report`))) return message.reply('**لقد تم حظرك لا يمكنك ابلاغ احد**').then(m => {m.delete(3000)}); //لو حد عنده هل رتبة ما رح يقدر يسوي ريبورت 

        var reports_channel = message.guild.channels.find('name', 'ㄨ𝖱𝖤𝖯𝖮𝖱𝖳𝖲') // اسم الروم الي تجيه الريبورتات

        if(!reports_channel) return message.reply('**I cant find reports room.**').then(m => {m.delete(3000)});
        
        var mention = message.mentions.users.first();
        
        if(!mention) return message.reply('**Please, mention a member.**').then(m => {m.delete(3000)});

        if(mention.id == message.author.id) return message.reply('**You cant report yourself**').then(m => {m.delete(3000)});
        
        if(message.guild.member(mention).hasPermission("MANAGE_MESSAGES")) return message.reply('**You cant report this user.**').then(m => {m.delete(3000)}) //لو شخص عنده هل برمشن ماحد رح يقدر يسويله ريبورت
        
        if(mention.id == message.guild.owner.id) return message.reply('**You cant report the owner.**').then(m => {m.delete(3000)});


        var reason = args.join(" ");

        if(!reason) return message.reply('**Please, specify a reason.**').then(m => {m.delete(3000)});
        var embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`NEW REPORT`)
        .setThumbnail(message.author.avatarURL)
        .addField('**REPORTER USER NAME : **', `**MENTION :** <@${message.author.id}> **ID :** ${message.author.id}`, true)
        .addField('**REPORTED USER NAME : **', `**MENTION :** ${mention} **ID :** ${mention.id}`, true)
        .addField('**TIME : ** ', `${moment(message.createdAt).format('D/MM/YYYY h:mm a')}`, true)
        .addField('**REASON : **', `_${reason}_`, true)
        .addField('**CHANNEL : **', `${message.channel}`, true)
        reports_channel.send(embed)
        message.channel.send('_تم البلاغ نشكرك على  مساعدتنا_').then(message => {message.delete(3000)});
    }
});


//كود الحماية

//كود منع دخول البوتات

let antibots = JSON.parse(fs.readFileSync('./antibots.json' , 'utf8'));
  client.on('message', message => {
    
      if(message.content.startsWith(prefix + "antibots on")) {
          if(!message.channel.guild) return;
          if(!message.member.hasPermission('ADMINISTRATOR')) return;
  antibots[message.guild.id] = {
  onoff: 'On',
  }
  message.channel.send(`**ANTI BOTS JOIN IS ON NOW ✓**`)
            fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
              if (err) console.error(err)
              .catch(err => {
                console.error(err);
            });
              });
            }
    
          })

  client.on('message', message => {
    if(message.content.startsWith(prefix + "antibots off")) {
          if(!message.channel.guild) return;
          if(!message.member.hasPermission('ADMINISTRATOR')) return;
  antibots[message.guild.id] = {
  onoff: 'Off',
  }
  message.channel.send(`**ANTI BOTS JOIN IS OFF NOW ✕**`)
            fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
              if (err) console.error(err)
              .catch(err => {
                console.error(err);
            });
              });
            }
  
          })    
  
  client.on("guildMemberAdd", member => {
    if(!antibots[member.guild.id]) antibots[member.guild.id] = {
  onoff: 'Off'
  }
    if(antibots[member.guild.id].onoff === 'Off') return;
  if(member.user.bot) return member.kick()
  })
  
  fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
  if (err) console.error(err)
  .catch(err => {
  console.error(err);
  });
  
  })


//كود منع التهكير

let anti = JSON.parse(fs.readFileSync("./antigreff.json", "UTF8"));//btrolie
let config = JSON.parse(fs.readFileSync("./config.json", "UTF8"));
client.on("message", message => {
    if(!message.channel.guild) return;
    let user = anti[message.guild.id+message.author.id]
    let num = message.content.split(" ").slice(1).join(" ");
    if(!anti[message.guild.id+message.author.id]) anti[message.guild.id+message.author.id] = {
        actions: 0
    }//btrolie
    if(!config[message.guild.id]) config[message.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,//btrolie
        kickLimits: 3,
        roleCrLimits: 3,
        time: 30
    }
if(message.content.startsWith(prefix + "limit")) {//btrolie

 
    if(!message.member.hasPermission('MANAGE_GUILD')) return;
    if(message.content.startsWith(prefix + "limitbans")) {
        if(!num) return message.channel.send("**SUPPLY A NUMBER**");
        if(isNaN(num)) return message.channel.send("**SUPPLY A NUMBER**");//btrolie
        config[message.guild.id].banLimit = num;
        message.channel.send(`**BANS LIMIT CHANGED TO: ${config[message.guild.id].banLimit}**`)//btrolie
    }
    if(message.content.startsWith(prefix + "limitkicks")) {
        if(!num) return message.channel.send("**SUPPLY A NUMBER**");
        if(isNaN(num)) return message.channel.send("**SUPPLY A NUMBER**");//btrolie 
        config[message.guild.id].kickLimits = num;
        message.channel.send(`**KICK LIMIT CHANGED TO ${config[message.guild.id].kickLimits}**`)
    }
    if(message.content.startsWith(prefix + "limitroleDelete")) {
        if(!num) return message.channel.send("**SUPPLY A NUMBER**");
        if(isNaN(num)) return message.channel.send("**SUPPLY A NUMBER**");
        config[message.guild.id].roleDelLimit = num;
        message.channel.send(`**ROLE DELETING LIMIT CHANGED TO ${config[message.guild.id].roleDelLimit}**`)
    }
    if(message.content.startsWith(prefix + "limitroleCreate")) {
        if(!num) return message.channel.send("**SUPPLY A NUMBER**");//btrolie
        if(isNaN(num)) return message.channel.send("**SUPPLY A NUMBER**");
        config[message.guild.id].roleCrLimits = num;
        message.channel.send(`**ROLE CREATION LIMIT CHANGED TO ${config[message.guild.id].roleCrLimits}**`)
    }//Zine , Mohamed Tarek , Kbosh
    if(message.content.startsWith(prefix + "limitchannelDelete")) {
        if(!num) return message.channel.send("**SUPLLY A NUMBER**");
        if(isNaN(num)) return message.channel.send("**SUPPLY A NUMBER**");
        config[message.guild.id].chaDelLimit = num;
        message.channel.send(`**CHANNEL DELITING LIMIT CHANGED TO ${config[message.guild.id].chaDelLimit}**`)
    }
    if(message.content.startsWith(prefix + "limittime")) {
        if(!num) return message.channel.send("**SUPLLY A NUMBER**");
        if(isNaN(num)) return message.channel.send("**SUPLLY A NUMBER**");
        config[message.guild.id].time = num;//btrolie//btrolie
        message.channel.send(`**TIMES LIMIT CHANGED TO ${config[message.guild.id].time}**`)
    }
    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
        if(e) throw e;
    });//btrolie
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
        if(e) throw e;
        });
    }
});
client.on("channelDelete", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_DELETE'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor//btrolie
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3//btrolie
    }
    if (!anti[channel.guild.id + entry.id]) {//btrolie
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)//btrolie
        console.log("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)//btrolie
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].chaDelLimit) {
            channel.guild.members.get(entry.id).ban().catch(e => channel.guild.owner.send(`**${entry.username} DELETE MANY CHANNELS ⚠**`))
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {//btrolie
                if (e) throw e;
            });//btrolie
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }//btrolie
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});//btrolie

client.on("roleDelete", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'ROLE_DELETE'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,//btrolie
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {//btrolie
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].roleDelLimit) {
            channel.guild.members.get(entry.id).ban().catch(e => channel.guild.owner.send(`**${entry.username} DELETE MANY ROLES ⚠**`))
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }//btrolie

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("roleCreate", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'ROLE_CREATE'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,//btrolie
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        console.log("TETS");//btrolie
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].roleCrLimits) {
            channel.guild.members.get(entry.id).ban().catch(e => channel.guild.owner.send(`**${entry.username} CREATE MANY ROLES ⚠**`))
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});


//كود منع دخول الوهميين

client.on('message', message => {
    if(message.content.startsWith(prefix + "antifake on")) {
        if(!message.channel.guild) return message.reply('**THIS COMMAND ONLY FOR SERVERS**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**SORRY BUT YOU DONT HAVE PERMISSIONS**' );
antijoin[message.guild.id] = {
onoff: 'On',
}
message.channel.send(`**ANTI FAKE ACCOUNTS JOIN IS ON NOW ✓**`)
          fs.writeFile("./antijoin.json", JSON.stringify(antijoin), (err) => {
            if (err) return console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }
 
        })
 
 
 
client.on('message', message => {
    if(message.content.startsWith(prefix + "antifake off")) {
        if(!message.channel.guild) return message.reply('**THIS COMMAND ONLY FOR SERVERS**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**SORRY BUT YOU DONT HAVE PERMISSIONS**' );
antijoin[message.guild.id] = {
onoff: 'Off',
}
message.channel.send(`**ANTI FAKE ACCOUNTS JOIN IS OFF NOW ✕**`)
          fs.writeFile("./antijoin.json", JSON.stringify(antijoin), (err) => {
            if (err) return console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }
 
        })
         client.on('message', message => {
          if (!message.channel.guild) return;
   if(message.content.startsWith(prefix + "setfake")) {
          let time = message.content.split(" ").slice(1).join(" ");
       if(!message.channel.guild) return message.reply('**THIS COMMAND ONLY FOR SERVERS**');
       if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**SORRY BUT YOU DONT HAVE PERMISSIONS**`' );
if (!time) return message.channel.send('PLEASE TYPE THE ACCOUNTS CREATED TIME [Days]');
let embed = new Discord.RichEmbed()
.setTitle('**DONE**')
.addField('ACCOUNT CREAT TIME :', `${time}.`)
.addField('REQUESTED BY :', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
antijoin[message.guild.id] = {
created: time,
onoff: 'On',
}
fs.writeFile("./antijoin.json", JSON.stringify(antijoin), (err) => {
if (err) console.error(err)
})
   }})
 
client.on("guildMemberAdd", async member => {
  if(!antijoin[member.guild.id]) antijoin[member.guild.id] = {
    onoff: 'Off'
  }
  if(antijoin[member.guild.id].onoff === 'Off') return;
  if(!member.user.bot) return;
    let accounttime = `${antijoin[member.guild.id].created}`
    let moment2 = require('moment-duration-format'),
        moment = require("moment"),
        date = moment.duration(new Date() - member.user.createdAt).format("d");
 
    if(date < accounttime) {
      member.ban(`MEMBER ACCOUNT AGE IS LAXER THAN ${antijoin[member.guild.id].created} days.`)
    }
});

//منع الروابط

let spread = JSON.parse(fs.readFileSync('./spread.json' , 'utf8'));
 
 
client.on('message', message => {
    if(message.content.startsWith(prefix + "antilink off")) {
        if(!message.channel.guild) return message.reply('**THIS COMMAND ONLY FOR SERVERS**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**SORRY BUT YOU DONT HAVE PERMISSIONS**' );
spread[message.guild.id] = {
onoff: 'Off',
}
message.channel.send(`**ANTI LINK IS OFF NOW ✕**`)
          fs.writeFile("./spread.json", JSON.stringify(spread), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }
 
        })
        client.on('message', message => {
    if(message.content.startsWith(prefix + "antilink on")) {
        if(!message.channel.guild) return message.reply('**THIS COMMAND ONLY FOR SERVERS**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**SORRY BUT YOU DONT HAVE PERMISSIONS**`' );
spread[message.guild.id] = {
onoff: 'On',
}
message.channel.send(`**ANTI LINK IS ON NOW ✓**`)
          fs.writeFile("./spread.json", JSON.stringify(spread), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }
 
        })
    client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('http://www.gmail.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**YOU HAVE BROKEN THIS SERVER RULES BY POSTING LINKS :rage:**`)
    }
});
 
client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.snapchat.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
 
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**YOU HAVE BROKEN THIS SERVER RULES BY POSTING LINKS :rage:**`)
    }
});
 
 
client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.instagram.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**YOU HAVE BROKEN THIS SERVER RULES BY POSTING LINKS :rage:**`)
    }
});
 
 
client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.twitter.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**YOU HAVE BROKEN THIS SERVER RULES BY POSTING LINKS :rage:**`)
    }
});
 
 
client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('http://www.facebook.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**YOU HAVE BROKEN THIS SERVER RULES BY POSTING LINKS :rage:**`)
    }
});
 
 
 
client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.youtube.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**YOU HAVE BROKEN THIS SERVER RULES BY POSTING LINKS :rage:**`)
    }
 
});
 
client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.discordapp.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**YOU HAVE BROKEN THIS SERVER RULES BY POSTING LINKS :rage:**`)
    }
 
});
client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://discord.gg/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**YOU HAVE BROKEN THIS SERVER RULES BY POSTING LINKS :rage:**`)
    }
 
});


//كود اللوق

const log = JSON.parse(fs.readFileSync('./log.json' , 'utf8'));

client.on('message', message => {
           if (!message.channel.guild) return;

    let room = message.content.split(" ").slice(1);
    let findroom = message.guild.channels.find('name', `${room}`)
    if(message.content.startsWith(prefix + "setlog")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if(!room) return message.channel.send('Please Type The Channel Name')
if(!findroom) return message.channel.send('Please Type The Log Channel Name')
let embed = new Discord.RichEmbed()
.setTitle('**Done The Log Code Has Been Setup**')
.addField('Channel:', `${room}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
log[message.guild.id] = {
channel: room,
onoff: 'On'
}
fs.writeFile("./log.json", JSON.stringify(log), (err) => {
if (err) console.error(err)
})
    }})
         
client.on('message', message => {
  
    if(message.content.startsWith(prefix + "toggleLog")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
        if(!log[message.guild.id]) log[message.guild.id] = {
          onoff: 'Off'
        }
          if(log[message.guild.id].onoff === 'Off') return [message.channel.send(`**The log Is __𝐎𝐍__ !**`), log[message.guild.id].onoff = 'On']
          if(log[message.guild.id].onoff === 'On') return [message.channel.send(`**The log Is __𝐎𝐅𝐅__ !**`), log[message.guild.id].onoff = 'Off']
          fs.writeFile("./log.json", JSON.stringify(log), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }
          
        })


client.on('messageDelete', message => {

	if(message.author.bot) return;
	if(message.channel.type === 'dm') return;
	if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
				        if(!log[message.guild.id]) log[message.guild.id] = {
          onoff: 'Off'
        }
    if(log[message.guild.id].onoff === 'Off') return;
	var logChannel = message.guild.channels.find(c => c.name === `${log[message.guild.id].channel}`);
	if(!logChannel) return;

	let messageDelete = new Discord.RichEmbed()
	.setTitle('**[MESSAGE DELETE]**')
	.setColor('RED')
	.setThumbnail(message.author.avatarURL)
	.setDescription(`**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
	.setTimestamp()
	.setFooter(message.guild.name, message.guild.iconURL)

	logChannel.send(messageDelete);
});
client.on('messageUpdate', (oldMessage, newMessage) => {

	if(oldMessage.author.bot) return;
	if(!oldMessage.channel.type === 'dm') return;
	if(!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
				        if(!log[oldMessage.guild.id]) log[oldMessage.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldMessage.guild.id].onoff === 'Off') return;
	var logChannel = oldMessage.guild.channels.find(c => c.name === `${log[oldMessage.guild.id].channel}`);
	if(!logChannel) return;

	if(oldMessage.content.startsWith('https://')) return;

	let messageUpdate = new Discord.RichEmbed()
	.setTitle('**[MESSAGE EDIT]**')
	.setThumbnail(oldMessage.author.avatarURL)
	.setColor('BLUE')
	.setDescription(`**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``)
	.setTimestamp()
	.setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)

	logChannel.send(messageUpdate);
});


client.on('roleCreate', role => {

	if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
	var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
	if(!logChannel) return;

	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let roleCreate = new Discord.RichEmbed()
		.setTitle('**[ROLE CREATE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('GREEN')
		.setTimestamp()
		.setFooter(role.guild.name, role.guild.iconURL)

		logChannel.send(roleCreate);
	})
});
client.on('roleDelete', role => {

	if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
	var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
	if(!logChannel) return;

	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let roleDelete = new Discord.RichEmbed()
		.setTitle('**[ROLE DELETE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('RED')
		.setTimestamp()
		.setFooter(role.guild.name, role.guild.iconURL)

		logChannel.send(roleDelete);
	})
});
client.on('roleUpdate', (oldRole, newRole) => {

	if(!oldRole.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[oldRole.guild.id]) log[oldRole.guild.id] = {
          onoff: 'Off'
	        }
    if(log[oldRole.guild.id].onoff === 'Off') return;
	var logChannel = oldRole.guild.channels.find(c => c.name === `${log[oldRole.guild.id].channel}`);
	if(!logChannel) return;

	oldRole.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldRole.name !== newRole.name) {
            if(log[oldRole.guild.id].onoff === 'Off') return;
			let roleUpdateName = new Discord.RichEmbed()
			.setTitle('**[ROLE NAME UPDATE]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldRole.guild.name, oldRole.guild.iconURL)

			logChannel.send(roleUpdateName);
		}
		if(oldRole.hexColor !== newRole.hexColor) {
			if(oldRole.hexColor === '#000000') {
				var oldColor = '`Default`';
			}else {
				var oldColor = oldRole.hexColor;
			}
			if(newRole.hexColor === '#000000') {
				var newColor = '`Default`';
			}else {
				var newColor = newRole.hexColor;
            }
            if(log[oldRole.guild.id].onoff === 'Off') return;
			let roleUpdateColor = new Discord.RichEmbed()
			.setTitle('**[ROLE COLOR UPDATE]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldRole.guild.name, oldRole.guild.iconURL)

			logChannel.send(roleUpdateColor);
		}
	})
});

client.on('channelCreate', channel => {

	if(!channel.guild) return;
	if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
	var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
	if(!logChannel) return;

	if(channel.type === 'text') {
		var roomType = 'Text';
	}else
	if(channel.type === 'voice') {
		var roomType = 'Voice';
	}else
	if(channel.type === 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelCreate = new Discord.RichEmbed()
		.setTitle('**[CHANNEL CREATE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('GREEN')
		.setTimestamp()
		.setFooter(channel.guild.name, channel.guild.iconURL)

		logChannel.send(channelCreate);
	})
});
client.on('channelDelete', channel => {
	if(!channel.guild) return;
	if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
	var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
	if(!logChannel) return;

	if(channel.type === 'text') {
		var roomType = 'Text';
	}else
	if(channel.type === 'voice') {
		var roomType = 'Voice';
	}else
	if(channel.type === 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelDelete = new Discord.RichEmbed()
		.setTitle('**[CHANNEL DELETE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('RED')
		.setTimestamp()
		.setFooter(channel.guild.name, channel.guild.iconURL)

		logChannel.send(channelDelete);
	})
});
client.on('channelUpdate', (oldChannel, newChannel) => {
	if(!oldChannel.guild) return;
	        if(!log[oldChannel.guild.id]) log[oldChannel.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldChannel.guild.id].onoff === 'Off') return;
	var logChannel = oldChannel.guild.channels.find(c => c.name === `${log[oldChannel.guild.id].channel}`);
	if(!logChannel) return;

	if(oldChannel.type === 'text') {
		var channelType = 'Text';
	}else
	if(oldChannel.type === 'voice') {
		var channelType = 'Voice';
	}else
	if(oldChannel.type === 'category') {
		var channelType = 'Category';
	}

	oldChannel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldChannel.name !== newChannel.name) {
			let newName = new Discord.RichEmbed()
			.setTitle('**[CHANNEL EDIT]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)

			logChannel.send(newName);
		}
		if(oldChannel.topic !== newChannel.topic) {
            if(log[oldChannel.guild.id].onoff === 'Off') return;
			let newTopic = new Discord.RichEmbed()
			.setTitle('**[CHANNEL EDIT]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic || 'NULL'}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic || 'NULL'}\`\`\`\n**Channel:** ${oldChannel} (ID: ${oldChannel.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)

			logChannel.send(newTopic);
		}
	})
});


client.on('guildBanAdd', (guild, user) => {

	if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[user.guild.id]) log[guild.guild.id] = {
          onoff: 'Off'
        }
    if(log[user.guild.id].onoff === 'Off') return;
	var logChannel = guild.channels.find(c => c.name === `${log[guild.guild.id].channel}`);
	if(!logChannel) return;

	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(userID === client.user.id) return;

		let banInfo = new Discord.RichEmbed()
		.setTitle('**[BANNED]**')
		.setThumbnail(userAvatar)
		.setColor('DARK_RED')
		.setDescription(`**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL)

		logChannel.send(banInfo);
	})
});
client.on('guildBanRemove', (guild, user) => {
	if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[guild.guild.id]) log[guild.guild.id] = {
          onoff: 'Off'
        }
    if(log[guild.guild.id].onoff === 'Off') return;
	var logChannel = guild.channels.find(c => c.name === `${log[guild.guild.id].channel}`);
	if(!logChannel) return;

	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(userID === client.user.id) return;

		let unBanInfo = new Discord.RichEmbed()
		.setTitle('**[UNBANNED]**')
		.setThumbnail(userAvatar)
		.setColor('GREEN')
		.setDescription(`**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL)

		logChannel.send(unBanInfo);
	})
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
	if(!oldMember.guild) return;
		        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldMember.guild.id].onoff === 'Off') return;
	var logChannel = oldMember.guild.channels.find(c => c.name === `${log[oldMember, newMember.guild.id].channel}`);
	if(!logChannel) return;

	oldMember.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;
		var userTag = logs.entries.first().executor.tag;

		if(oldMember.nickname !== newMember.nickname) {
			if(oldMember.nickname === null) {
				var oldNM = '`اسمه الاصلي`';
			}else {
				var oldNM = oldMember.nickname;
			}
			if(newMember.nickname === null) {
				var newNM = '`اسمه الاصلي`';
			}else {
				var newNM = newMember.nickname;
			}

			let updateNickname = new Discord.RichEmbed()
			.setTitle('**[UPDATE MEMBER NICKNAME]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldMember.guild.name, oldMember.guild.iconURL)

			logChannel.send(updateNickname);
		}
		if(oldMember.roles.size < newMember.roles.size) {
			let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();
					        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
            if(log[oldMember.guild.id].onoff === 'Off') return;
			let roleAdded = new Discord.RichEmbed()
			.setTitle('**[ADDED ROLE TO MEMBER]**')
			.setThumbnail(oldMember.guild.iconURL)
			.setColor('GREEN')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(roleAdded);
		}
		if(oldMember.roles.size > newMember.roles.size) {
			let role = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first();
					        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
            if(log[oldMember, newMember.guild.id].onoff === 'Off') return;
			let roleRemoved = new Discord.RichEmbed()
			.setTitle('**[REMOVED ROLE FROM MEMBER]**')
			.setThumbnail(oldMember.guild.iconURL)
			.setColor('RED')
			.setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(roleRemoved);
		}
	})
	if(oldMember.guild.owner.id !== newMember.guild.owner.id) {
	  		        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
        if(log[oldMember, newMember.guild.id].onoff === 'Off') return;
        let newOwner = new Discord.RichEmbed()
		.setTitle('**[UPDATE GUILD OWNER]**')
		.setThumbnail(oldMember.guild.iconURL)
		.setColor('GREEN')
		.setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
		.setTimestamp()
		.setFooter(oldMember.guild.name, oldMember.guild.iconURL)

		logChannel.send(newOwner);
	}
});


client.on('voiceStateUpdate', (voiceOld, voiceNew) => {

	if(!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
    if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
	var logChannel = voiceOld.guild.channels.find(c => c.name === `${log[voiceOld, voiceNew.guild.id].channel}`);
	if(!logChannel) return;

	voiceOld.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userTag = logs.entries.first().executor.tag;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
			let serverMutev = new Discord.RichEmbed()
			.setTitle('**[VOICE MUTE]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png')
			.setColor('RED')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverMutev);
		}
		if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
		  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
			let serverUnmutev = new Discord.RichEmbed()
			.setTitle('**[VOICE UNMUTE]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png')
			.setColor('GREEN')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverUnmutev);
		}
		if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
		  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
			let serverDeafv = new Discord.RichEmbed()
			.setTitle('**[VOICE DEAF]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png')
			.setColor('RED')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverDeafv);
		}
		if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
		  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
			let serverUndeafv = new Discord.RichEmbed()
			.setTitle('**[VOICE UNDEAF]**')
			.setThumbnail('https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png')
			.setColor('GREEN')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverUndeafv);
		}
	})
	
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && voiceNew.voiceChannel && voiceOld.voiceChannel != null) {
	  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
        if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
		let voiceLeave = new Discord.RichEmbed()
		.setTitle('**[CHANGED VOICE ROOM]**')
		.setColor('GREEN')
		.setThumbnail(voiceOld.user.avatarURL)
		.setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
		.setTimestamp()
		.setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)

		logChannel.send(voiceLeave);
	}
});


//كود معلومات السيرفر

client.on('message', message => {
if(message.content.startsWith(prefix +"server")){
  if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply(`**YOU DONT HAVER PERMISSIONS**`)
if(!message.channel.guild) return message.reply(' ');
const millis = new Date().getTime() - message.guild.createdAt.getTime();
const now = new Date();
dateFormat(now, 'dddd, mmmm dS yyyy, h:MM:ss TT');
const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];
const days = millis / 1000 / 60 / 60 / 24;
let roles = client.guilds.get(message.guild.id).roles.map(r => r.name);
var embed  = new Discord.RichEmbed()
.setAuthor(message.guild.name, message.guild.iconURL)
.addField("**🆔 SERVER ID :**", message.guild.id,true)
.addField("**📅 CREATED ON :**", message.guild.createdAt.toLocaleString(),true)
.addField("**👑 OWNED BY :**",`${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
.addField("**👥 MEMBERS :**",`${message.guild.memberCount} MEMBERS`,true)
.addField('**:speech_balloon: CHANNELS :**',`${message.guild.channels.filter(m => m.type === 'text').size}` + ' TEXT AND '+ `${message.guild.channels.filter(m => m.type === 'voice').size} VOICE `,true)
.addField("**🌍 OTHERS :**" , message.guild.region,true)
.addField("**🔐 ROLES**",`${message.guild.roles.size} ROLES`,true)
.setColor('#000000')
.setFooter(`MADE BY Тигр#0080`)
message.channel.sendEmbed(embed)

}
});

//كود اليوزر

client.on('message', message => { 
           if (message.content.startsWith(prefix + "user")) {
     var args = message.content.split(" ").slice(1);
     let user = message.mentions.users.first();
     var men = message.mentions.users.first();
        var heg;
        if(men) {
            heg = men
        } else {
            heg = message.author
        }
      var mentionned = message.mentions.members.first();
         var h;
        if(mentionned) {
            h = mentionned
        } else {
            h = message.member
        }
               moment.locale('ar-TN');
      var id = new  Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL) 
    .setColor("#707070")
    .addField('**JOINED DISCORD :**',   `${moment(heg.createdTimestamp).format('YYYY/M/D')} **\n** \`${moment(heg.createdTimestamp).fromNow()}\`` ,true) 
    .addField('**JOINED SERVER :**', `${moment(h.joinedAt).format('YYYY/M/D')} \n \`${moment(h.joinedAt).fromNow()}\``, true)               
    .setFooter(`MADE BY Тигр#0080`)                                 
    .setThumbnail(heg.avatarURL);
    message.channel.send(id)
}       });


//كود الرتب

client.on("message", message => {
	var args = message.content.split(' ').slice(1); 
	var msg = message.content.toLowerCase();
	if( !message.guild ) return;
	if( !msg.startsWith( prefix + 'role' ) ) return;
	if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(' **YOU DONT HAVE PERMISSIONS**');
	if( msg.toLowerCase().startsWith( prefix + '-role' ) ){
		if( !args[0] ) return message.reply( '**PLEASE PLACE THE PERSON FROM WHOM THRANK IS TO BE WITHDRAWN**' );
		if( !args[1] ) return message.reply( '**PLEASE SET THE RANK TO BE WITHDRAWN FROM THE PERSON**' );
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.reply( '**PLEASE SET THE RANK TO BE WITHDRAWN FROM THE PERSON**' );if( message.mentions.members.first() ){
			message.mentions.members.first().removeRole( role1 );
			return message.reply('**WAS PULLED FROM '+args[0]+' THE ROLE '+role1.name+'**');
		}
		if( args[0].toLowerCase() == "all" ){
			message.guild.members.forEach(m=>m.removeRole( role1 ))
			return	message.reply('**WITHDRAWN FROM ALL RANK'+role1.name+'**');
		} else if( args[0].toLowerCase() == "bots" ){
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.reply('**WITHDRAWN FROM BOTS RANK'+role1.name+'**');
		} else if( args[0].toLowerCase() == "humans" ){
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.reply('**WITHDRAWN FROM HUMANS RANK'+role1.name+'**');
		} 	
	} else {
		if( !args[0] ) return message.reply( '**PLEASE PLACE THE PERSON TO BE ADD A RANK**' );
		if( !args[1] ) return message.reply( '**PLEASE SET THE RANK TO BE ADD TO THE PERSON**' );
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.reply( '**PLEASE SET THE RANK TO BE ADD TO THE PERSON**' );if( message.mentions.members.first() ){
			message.mentions.members.first().addRole( role1 );
			return message.reply('**HAS BEEN ADD '+role1.name+' TO '+args[0]+'**');
		}
		if( args[0].toLowerCase() == "all" ){
			message.guild.members.forEach(m=>m.addRole( role1 ))
			return	message.reply('**HAS BEEN ADD TO ALL '+role1.name+'**');
		} else if( args[0].toLowerCase() == "bots" ){
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.addRole(role1))
			return	message.reply('**HAS BEEN ADD TO BOTS '+role1.name+'**');
		} else if( args[0].toLowerCase() == "humans" ){
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.addRole(role1))
			return	message.reply('**HAS BEEN ADD TO HUMANS '+role1.name+'**');
		} 
	} 
});


//كود التحذير

client.on('message',  async  message  =>  {
  let  user  =  message.mentions.users.first();
  let  reason  =  message.content.split(' ').slice(2).join(' ');
if(message.content.startsWith(prefix  +  'warn'))  {
  message.delete();
  if(!message.member.hasPermission('MUTE_MEMBERS')) return      message.channel.send('**YOU DONT HAVE PERMISSIONS**' );
  if(!user)  return  message.channel.send("**MENTION A MEMBER**")//by  OrochiX
  if(!reason)  return  message.channel.send("**TYPE REASON**")//by  OrochiX
  let  reportembed  =  new  Discord.RichEmbed()
  .setTitle(`**New  Warned User !**`)
.addField("**-  Warned  User :**",  `[${user}  with  ID  ${user.id}]`)//by  OrochiX
.addField('**-  Warned  By:**',`[${message.author.tag} with id ${message.author.id}]`)//by  OrochiX
.addField('**-  Reason :**',  `[${reason}]`,  true)
.addField("**-  Warned in :**",`[${message.channel.name}]`)
.addField("**-  Time & Date:**",`[${message.createdAt}]`)
.setFooter("Probot")
.setColor('#060c37')
let incidentchannel = message.guild.channels.find(`name`, "warns");
if(!incidentchannel) return message.channel.send("Can't find warns channel.");
incidentchannel.send(reportembed);
message.reply(`**:warning: ${user} HAS BEEN WARNED**`).then(msg  =>  msg.delete(3000));
user.send(`**:warning: YOU ARE HAS BEEN WARNED IN ${message.guild.name} reason: ${reason}**`)
}

//coding  by  OrochiX  !

})


//كود فتح و قفل الشات

client.on('message', message => {
var prefix = ":";
       if(message.content === prefix + "lock") {
                           if(!message.channel.guild) return message.reply('** This command only for servers**');

   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('  ');
              message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false

              }).then(() => {
                  message.reply("**THIS ROOM HAS BEEN LOCKED :lock:**")
              });
                }

    if(message.content === prefix + "unlock") {
                        if(!message.channel.guild) return message.reply('**THIS COMMAND ONLY FOR SERVERS**');

   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' ');
              message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: true

              }).then(() => {
                  message.reply("**THIS ROOM HAS BEEN UNLOCKED :unlock:**")
              });
    }
       
});


//كود البان و فك البان

client.on('message', message => {
  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
               if(!message.channel.guild) return message.reply('**THIS COMMAND ONLY FOR SERVERS**');
         
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**YOU DONT HAVE PERMISSIONS**");
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I DONT HAVE PERMISSIONS**");
  let user = message.mentions.users.first();
  
  if (message.mentions.users.size < 1) return message.reply("**MENTION THE USER**");
  if (!message.guild.member(user)
  .bannable) return message.reply("**IT MUST BE THE RANK OF BOT HIGHER THAN THE RANK OF THE PERSON TO BE BANNED FROM THIS SERVER**");


  message.guild.member(user).ban(7, user);

message.channel.send(`**${user.tag} BANNED FROM THIS SERVER :airplane: **  `)

}
});



//كود الطرد

client.on('message', message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
               if(!message.channel.guild) return message.reply('**THIS COMMAND ONLY FOR SERVERS**');
         
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("**YOU DONT HAVE PERMISSIONS**");
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("**I DONT HAVE PERMISSIONS**");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  if (message.mentions.users.size < 1) return message.reply("**MENTION THE USER**");
  if(!reason) return message.reply ("**WRITE THE REASON**");
  if (!message.guild.member(user)
  .kickable) return message.reply("**I CANT KICK THIS USER**");

  message.guild.member(user).kick();

  const kickembed = new Discord.RichEmbed()
  .setAuthor(`KICKED`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**USER :**",  '** ' + `${user.tag}` + ' **')
  .addField("**BY :**", '** ' + `${message.author.tag}` + ' **')
  .addField("**REASON :**", '** ' + `${reason}` + ' **')
  message.channel.send({
    embed : kickembed
  })
}
});

//كود البنق

client.on('message', message => { 
                                if(!message.channel.guild) return;
                        if (message.content.startsWith(prefix + 'ping')) {
                            if(!message.channel.guild) return;
                            var msg = `${Date.now() - message.createdTimestamp}`
                            var api = `${Math.round(client.ping)}`
                            if (message.author.bot) return;
                        let embed = new Discord.RichEmbed()
                        .setAuthor(message.author.username,message.author.avatarURL)
                        .setColor('#5016f3')
                        .addField('**Time Taken :**',msg + " ms :signal_strength: ")
                        .addField('**WebSocket :**',api + " ms :signal_strength: ")
                        .setTimestamp()
        message.channel.send({embed:embed});
                        }
                    });


//كود الانفايت

 client.on("message", async message => {
            if(!message.channel.guild) return;
        if(message.content.startsWith(prefix + 'invites')) {
        var nul = 0
        var guild = message.guild
        await guild.fetchInvites()
            .then(invites => {
             invites.forEach(invite => {
                if (invite.inviter === message.author) {
                     nul+=invite.uses
                    }
                });
            });
          if (nul > 0) {
              console.log(`\n${message.author.tag} has ${nul} invites in ${guild.name}\n`)
              var embed = new Discord.RichEmbed()
                  .setColor("#000000")
                    .addField(`${message.author.username}`, `_لقد قمت بدعوة_ **${nul}**`)
                          message.channel.send({ embed: embed });
                      return;
                    } else {
                       var embed = new Discord.RichEmbed()
                        .setColor("#000000")
                        .addField(`${message.author.username}`, `_لم تقم بدعوة اي شخص الى السيرفر_`)

                       message.channel.send({ embed: embed });
                        return;
                    }
        }
        if(message.content.startsWith(prefix + 'invites-codes')) {
let guild = message.guild
var codes = [""]
message.channel.send(":postbox: **YOUR INVITE CODES IN PRIVATE**")
guild.fetchInvites()
.then(invites => {
invites.forEach(invite => {
if (invite.inviter === message.author) {
codes.push(`discord.gg/${invite.code}`)
}
})
}).then(m => {
if (codes.length < 0) {
    var embed = new Discord.RichEmbed()
.setColor("#000000")
.addField(`Your invite codes in ${message.guild.name}`, `You currently don't have any active invites! Please create an invite and start inviting, then you will be able to see your codes here!`)
message.author.send({ embed: embed });
return;
} else {
    var embed = new Discord.RichEmbed()
.setColor("#000000")
.addField(`Your invite codes in ${message.guild.name}`, `Invite Codes:\n${codes.join("\n")}`)
message.author.send({ embed: embed });
return;
}
})
}

});


//كود الرول

      client.on('message', message => {
        let args = message.content.split(" ").slice(1).join(" ")
        let men = message.mentions.users.first()
        if(message.content.startsWith(prefix + "roll")){
            if(!args) return message.channel.send("_يجب كتابة رقم_")
            message.channel.send(Math.floor(Math.random() * args))
        }
    });


//كود مسح الشات

client.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = msg.content.split(" ").slice(1);

    if(command === "clear") {
        const emoji = client.emojis.find("name", "wastebasket")
    let textxt = args.slice(0).join("");
    if(msg.member.hasPermission("MANAGE_MESSAGES")) {
    if (textxt == "") {
        msg.delete().then
        msg.channel.bulkDelete(1000).then(m => m.delete(3000));
} else {
    msg.delete().then
    msg.delete().then
    msg.channel.bulkDelete(textxt);
        msg.channel.send("```php\nعدد الرسائل التي تم مسحها: " + textxt + "\n```").then(m => m.delete(3000));
        }    
    }
}
});


//كود صنع 100 لون

client.on('message', wolf => {
    if (wolf.content === ":createcolors") {
 
wolf.guild.createRole({ name: "1", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "2", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "3", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "4", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "5", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "6", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "7", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "8", color: "RANDOM", permissions: [] })
 
 
wolf.guild.createRole({ name: "10", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "11", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "12", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "13", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "14", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "15", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "16", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "17", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "19", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "20", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "21", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "22", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "23", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "24", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "25", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "26", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "27", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "28", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "29", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "30", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "31", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "32", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "33", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "34", color: "RANDOM", permissions: [] })
 
 
wolf.guild.createRole({ name: "35", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "36", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "37", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "38", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "39", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "40", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "41", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "42", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "43", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "44", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "45", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "46", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "47", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "48", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "49", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "50", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "51", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "52", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "53", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "54", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "55", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "56", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "57", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "58", color: "RANDOM", permissions: [] })
 
 
wolf.guild.createRole({ name: "59", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "60", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "61", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "62", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "63", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "64", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "65", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "66", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "67", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "68", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "69", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "70", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "71", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "72", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "73", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "74", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "75", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "76", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "77", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "78", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "79", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "80", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "81", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "82", color: "RANDOM", permissions: [] })
 
 
wolf.guild.createRole({ name: "83", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "84", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "85", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "86", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "87", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "88", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "89", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "90", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "91", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "92", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "93", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "94", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "95", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "96", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "97", color: "RANDOM", permissions: [] })
 
   wolf.guild.createRole({ name: "98", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "99", color: "RANDOM", permissions: [] })
 
wolf.guild.createRole({ name: "100", color: "RANDOM", permissions: [] })
 
 
wolf.channel.send(' _ تم صنع الرتب بنجاح ✔_ ')
}
});


//كود الميوت و الانميوت

      client.on('message', async message => {
        let mention = message.mentions.members.first();
      let command = message.content.split(" ")[0];
         command = command.slice(prefix.length);
        let args = message.content.split(" ").slice(1);	 
      if(command === `unmute`) {2
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.sendMessage(" ").then(m => m.delete(5000));
      if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.reply("**I DONT HAVE PERMISSIONS :tools:**").then(msg => msg.delete(6000))
      
        let kinggamer = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
           if(!kinggamer) return message.channel.send(' **MENTION THE USER** ').then(msg => {
            msg.delete(3500);
            message.delete(3500); 
          });
      
        let role = message.guild.roles.find (r => r.name === "Muted");
        
        if(!role || !kinggamer.roles.has(role.id)) return message.channel.sendMessage(`**${mention.user.username} NOT MUTED :blush:**`)
      
        await kinggamer.removeRole(role) 
        message.channel.sendMessage(`**${mention.user.username}  UNMUTED **`);      
        return;
      
        }
      
      });


client.on('message', async message =>{

  if (message.author.omar) return;
  if (!message.content.startsWith(prefix)) return;
  if(!message.channel.guild) return message.channel.send('*THIS COMMAND ONLY FOR SERVERS**').then(m => m.delete(5000));
   if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.sendMessage(" ").then(m => m.delete(5000));
  if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("**I DONT HAVE PERMISSIONS :tools:**").then(msg => msg.delete(6000))
  var command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  var args = message.content.split(" ").slice(1);
    if(command == "mute") {
      let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!tomute) return message.reply("**MENTION THE USER**") .then(m => m.delete(5000));
      if(tomute.hasPermission("MANAGE_MESSAGES"))return  
      let muterole = message.guild.roles.find(`name`, "Muted");
  
      if(!muterole){
        try{
          muterole = await message.guild.createRole({
            name: "Muted",
            color: "#000000",
            permissions:[]
          })
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        }catch(e){
          console.log(e.stack);
        }
      }

      await(tomute.addRole(muterole.id));
      message.channel.send(`**<@${tomute.id}> HAS BEEN MUTED**`);
        message.delete();

    }
  });


//كود النيك

client.on("message", message => {
if(message.content.startsWith(prefix + "nick")){
if(message.author.bot || message.channel.type == "dm" || !message.member.hasPermission("MANAGE_NICKNAMES") || !message.guild.member(client.user).hasPermission("MANAGE_NICKNAMES")) return;
var user = message.mentions.members.first();
var args = message.content.split(" ").slice(2);
var nick = args.join(" ");
if(!user || !args) return message.channel.send(`**USAGE ;** ${prefix}NICK \`\`@Name\`\` NICKNAME`);
message.guild.member(user.user).setNickname(`${nick}`);
message.channel.send(`**SUCCESSFULLY CHANGED ${user} NICKNAME TO ${nick}**`);
}
});

//كود انشاء روم صوتي مؤقت

let temp = JSON.parse(fs.readFileSync('./temp.json' , 'utf8'));
client.on('message', async message => {
 if(message.channel.type === "dm") return;
  if(message.author.bot) return;
 if(message.content == (prefix+'temp on')){
if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
if(temp[message.guild.id]) return message.channel.send('**THE ROMM IS EXIST**')
 message.guild.createChannel('Temporary Channels', 'category').then(cg => {
 message.guild.createChannel('create temporary channel', 'voice').then(ch => {
ch.setParent(cg)
 message.channel.send('**THIS PROPERTY HAS BEEN ACTIVATED :unlock:**')
 temp[message.guild.id] = {time: "3000", category : cg.id,  channel :ch.id}
});
 })
 }fs.writeFile("./temp.json", JSON.stringify(temp),(err)=>{if(err)console.error(err)})
    });
///LUXY
client.on('message' , message => {
  if(message.content == prefix+'temp off') {
    if(!temp[message.guild.id])return message.channel.send('**THIS PROPERTY HAS BEEN DISABLE :lock:**')
   if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
let cg = message.guild.channels.get(temp[message.guild.id].category);let ch = message.guild.channels.get(temp[message.guild.id].channel)
if(cg&&ch) {ch.delete().then(()=>{cg.delete()});message.channel.send('**THIS PROPERTY HAS BEEN DISABLE :lock:**')}
else {message.channel.send('**THIS PROPERTY HAS BEEN DISABLE :lock:**')};delete temp[message.guild.id]} });
 
///LUXY
client.on('message' , message => {
if (message.content.startsWith(prefix + "temp time")) {
if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
let newTime= message.content.split(' ').slice(2);
if(!newTime) return message.channel.send(`**You Must type the number after the command** ❎`)
if(isNaN(newTime)) return message.channel.send(`**Please Type The a Correct Number \🔢\❌**`);
if(newTime < 3) return message.channel.send(`**The Time Must Be More Than \`3s\` ❌**`)
let Time = Math.floor((newTime*(1000)));
temp[message.guild.id].time = Time
message.channel.send(`**✅ The Time Set To: \`${newTime}s\`**`);
}})
////LUXY
client.on('voiceStateUpdate', (old, neww) => {
if(!temp[old.guild.id]) return
if(!neww.guild.member(client.user).hasPermission('ADMINISTRATOR'))return;;
let newUserChannel = neww.voiceChannel;let oldUserChannel = old.voiceChannel
if(newUserChannel == oldUserChannel) return;
let channel = temp[neww.guild.id].channel
let category = temp[neww.guild.id].category
let ch = old.guild.channels.get(channel);if(!ch) return
let ct = old.guild.channels.get(category);if(!ct) return
 
if(newUserChannel !== undefined && newUserChannel.id == channel) {
neww.guild.createChannel(neww.displayName , 'voice').then(c => {
c.setParent(category).then(()=>{c.setParent(category).catch(err=>{return})})
c.overwritePermissions(neww.user, {MANAGE_CHANNELS:true,MUTE_MEMBERS:true})
.then(()=>{ch.overwritePermissions(neww,{CONNECT:false})});return neww.setVoiceChannel(c)});}
if(oldUserChannel !== undefined) {
setTimeout(()=>{
let chh = neww.guild.channels.find('name',neww.displayName)
if(!chh) return
if(chh.type === 'voice')return[chh.delete(),
ch.overwritePermissions(neww, {
CONNECT:null})]
}, temp[neww.guild.id].time);}
client.on('channelDelete',channel =>{
  if(oldUserChannel !== undefined) {
    setTimeout(()=>{
    let chh = neww.guild.channels.find('name',neww.displayName)
    if(!chh) return
    if(chh.type === 'voice')return[chh.delete(),
    ch.overwritePermissions(neww, {
    CONNECT:null})]
    }, temp[neww.guild.id].time);}
})
});//LUXY

//كود البان ليست

client.on('message', message => {
    if (message.content.startsWith(prefix + "bans")) {
      if (!message.channel.guild) return;
    message.channel
        message.guild.fetchBans()
        .then(bans => message.channel.send(` **SERVER BAN LIST :** ${bans.size} `))
  .catch(console.error);
}
});

//كود الموف و التحم الصوي

client.on('message', message => {
if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'move')) {
 if (message.member.hasPermission("MOVE_MEMBERS")) {
 if (message.mentions.users.size === 0) {
 return message.channel.send("``لاستخدام الأمر اكتب هذه الأمر : " +prefix+ "move [USER]``")
}
if (message.member.voiceChannel != null) {
 if (message.mentions.members.first().voiceChannel != null) {
 var authorchannel = message.member.voiceChannelID;
 var usermentioned = message.mentions.members.first().id;
var embed = new Discord.RichEmbed()
 .setTitle("Succes!")
 .setColor("#000000")
 .setDescription(`لقد قمت بسحب <@${usermentioned}> الى الروم الصوتي الخاص بك✅ `)
var embed = new Discord.RichEmbed()
.setTitle(`You are Moved in ${message.guild.name}`)
 .setColor("RANDOM")
.setDescription(`**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`)
 message.guild.members.get(usermentioned).setVoiceChannel(authorchannel).then(m => message.channel.send(embed))
message.guild.members.get(usermentioned).send(embed)
} else {
message.channel.send("``لا تستطيع سحب "+ message.mentions.members.first() +" `يجب ان يكون هذه العضو في روم صوتي`")
}
} else {
 message.channel.send("**``يجب ان تكون في روم صوتي لكي تقوم بسحب العضو أليك``**")
}
} else {
message.react("❌")
}
 }
});


//كود الافاتار

client.on("message", message => {
    const prefix = ":"
              
          if(!message.channel.guild) return;
   if(message.author.bot) return;
      if(message.content === prefix + "avatar server"){
          const embed = new Discord.RichEmbed()
  
      .setTitle(`ServerAvatar${message.guild.name}  `)
  .setAuthor(message.author.username, message.guild.iconrURL)
    .setColor(0x164fe3)
    .setImage(message.guild.iconURL)
    .setURL(message.guild.iconrURL)
                    .setTimestamp()

   message.channel.send({embed});
      }
  });



client.on('message', message =>{
    let args = message.content.split(' ');
    let prefix = ':'; 
    
    if(args[0] === `${prefix}avatar`){
        let mentions = message.mentions.members.first()
        if(!mentions) {
          let sicon = message.author.avatarURL
          let embed = new Discord.RichEmbed()
          .setImage(message.author.avatarURL)
          .setColor("#f7abab") 
          .setDescription(`**${message.author.username}#${message.author.discriminator}**`);
          message.channel.send({embed})
        } else {
          let sicon = mentions.user.avatarURL
          let embed = new Discord.RichEmbed()
          .setColor("#f7abab")
          .setDescription(`**${mentions.user.username}#${mentions.user.discriminator}**`)
          .setImage(sicon)
          message.channel.send({embed})
        }
    };
});


//كود القران و عرض البوتات و الرتب

client.on('message', message => {
if(message.content === prefix + 'quran') {
	let pages = ['http://quran.ksu.edu.sa/ayat/safahat1/1.png','http://quran.ksu.edu.sa/ayat/safahat1/2.png','http://quran.ksu.edu.sa/ayat/safahat1/3.png','http://quran.ksu.edu.sa/ayat/safahat1/4.png','http://quran.ksu.edu.sa/ayat/safahat1/5.png','http://quran.ksu.edu.sa/ayat/safahat1/6.png','http://quran.ksu.edu.sa/ayat/safahat1/7.png','http://quran.ksu.edu.sa/ayat/safahat1/8.png','http://quran.ksu.edu.sa/ayat/safahat1/9.png','http://quran.ksu.edu.sa/ayat/safahat1/10.png','http://quran.ksu.edu.sa/ayat/safahat1/11.png','http://quran.ksu.edu.sa/ayat/safahat1/12.png','http://quran.ksu.edu.sa/ayat/safahat1/13.png','http://quran.ksu.edu.sa/ayat/safahat1/14.png','http://quran.ksu.edu.sa/ayat/safahat1/15.png','http://quran.ksu.edu.sa/ayat/safahat1/16.png','http://quran.ksu.edu.sa/ayat/safahat1/17.png','http://quran.ksu.edu.sa/ayat/safahat1/18.png','http://quran.ksu.edu.sa/ayat/safahat1/19.png','http://quran.ksu.edu.sa/ayat/safahat1/20.png','http://quran.ksu.edu.sa/ayat/safahat1/21.png','http://quran.ksu.edu.sa/ayat/safahat1/22.png','http://quran.ksu.edu.sa/ayat/safahat1/23.png','http://quran.ksu.edu.sa/ayat/safahat1/24.png','http://quran.ksu.edu.sa/ayat/safahat1/25.png','http://quran.ksu.edu.sa/ayat/safahat1/26.png','http://quran.ksu.edu.sa/ayat/safahat1/27.png','http://quran.ksu.edu.sa/ayat/safahat1/28.png','http://quran.ksu.edu.sa/ayat/safahat1/29.png','http://quran.ksu.edu.sa/ayat/safahat1/30.png','http://quran.ksu.edu.sa/ayat/safahat1/31.png','http://quran.ksu.edu.sa/ayat/safahat1/32.png','http://quran.ksu.edu.sa/ayat/safahat1/33.png','http://quran.ksu.edu.sa/ayat/safahat1/34.png','http://quran.ksu.edu.sa/ayat/safahat1/35.png','http://quran.ksu.edu.sa/ayat/safahat1/36.png','http://quran.ksu.edu.sa/ayat/safahat1/37.png','http://quran.ksu.edu.sa/ayat/safahat1/38.png','http://quran.ksu.edu.sa/ayat/safahat1/39.png','http://quran.ksu.edu.sa/ayat/safahat1/40.png','http://quran.ksu.edu.sa/ayat/safahat1/41.png','http://quran.ksu.edu.sa/ayat/safahat1/42.png','http://quran.ksu.edu.sa/ayat/safahat1/43.png','http://quran.ksu.edu.sa/ayat/safahat1/44.png','http://quran.ksu.edu.sa/ayat/safahat1/45.png','http://quran.ksu.edu.sa/ayat/safahat1/46.png','http://quran.ksu.edu.sa/ayat/safahat1/47.png','http://quran.ksu.edu.sa/ayat/safahat1/48.png','http://quran.ksu.edu.sa/ayat/safahat1/49.png','http://quran.ksu.edu.sa/ayat/safahat1/50.png','http://quran.ksu.edu.sa/ayat/safahat1/51.png','http://quran.ksu.edu.sa/ayat/safahat1/52.png','http://quran.ksu.edu.sa/ayat/safahat1/53.png','http://quran.ksu.edu.sa/ayat/safahat1/55.png','http://quran.ksu.edu.sa/ayat/safahat1/56.png','http://quran.ksu.edu.sa/ayat/safahat1/57.png','http://quran.ksu.edu.sa/ayat/safahat1/58.png','http://quran.ksu.edu.sa/ayat/safahat1/59.png','http://quran.ksu.edu.sa/ayat/safahat1/60.png','http://quran.ksu.edu.sa/ayat/safahat1/60.png','http://quran.ksu.edu.sa/ayat/safahat1/61.png','http://quran.ksu.edu.sa/ayat/safahat1/62.png','http://quran.ksu.edu.sa/ayat/safahat1/63.png','http://quran.ksu.edu.sa/ayat/safahat1/64.png','http://quran.ksu.edu.sa/ayat/safahat1/65.png','http://quran.ksu.edu.sa/ayat/safahat1/66.png','http://quran.ksu.edu.sa/ayat/safahat1/67.png','http://quran.ksu.edu.sa/ayat/safahat1/68.png','http://quran.ksu.edu.sa/ayat/safahat1/69.png','http://quran.ksu.edu.sa/ayat/safahat1/70.png','http://quran.ksu.edu.sa/ayat/safahat1/71.png','http://quran.ksu.edu.sa/ayat/safahat1/72.png','http://quran.ksu.edu.sa/ayat/safahat1/73.png','http://quran.ksu.edu.sa/ayat/safahat1/74.png','http://quran.ksu.edu.sa/ayat/safahat1/75.png','http://quran.ksu.edu.sa/ayat/safahat1/76.png','http://quran.ksu.edu.sa/ayat/safahat1/77.png','http://quran.ksu.edu.sa/ayat/safahat1/78.png','http://quran.ksu.edu.sa/ayat/safahat1/79.png','http://quran.ksu.edu.sa/ayat/safahat1/80.png','http://quran.ksu.edu.sa/ayat/safahat1/81.png','http://quran.ksu.edu.sa/ayat/safahat1/82.png','http://quran.ksu.edu.sa/ayat/safahat1/83.png','http://quran.ksu.edu.sa/ayat/safahat1/84.png','http://quran.ksu.edu.sa/ayat/safahat1/85.png','http://quran.ksu.edu.sa/ayat/safahat1/86.png','http://quran.ksu.edu.sa/ayat/safahat1/87.png','http://quran.ksu.edu.sa/ayat/safahat1/88.png','http://quran.ksu.edu.sa/ayat/safahat1/89.png','http://quran.ksu.edu.sa/ayat/safahat1/90.png','http://quran.ksu.edu.sa/ayat/safahat1/91.png','http://quran.ksu.edu.sa/ayat/safahat1/92.png','http://quran.ksu.edu.sa/ayat/safahat1/93.png','http://quran.ksu.edu.sa/ayat/safahat1/94.png','http://quran.ksu.edu.sa/ayat/safahat1/95.png','http://quran.ksu.edu.sa/ayat/safahat1/96.png','http://quran.ksu.edu.sa/ayat/safahat1/97.png','http://quran.ksu.edu.sa/ayat/safahat1/98.png','http://quran.ksu.edu.sa/ayat/safahat1/99.png','http://quran.ksu.edu.sa/ayat/safahat1/100.png','http://quran.ksu.edu.sa/ayat/safahat1/101.png','http://quran.ksu.edu.sa/ayat/safahat1/102.png','http://quran.ksu.edu.sa/ayat/safahat1/103.png','http://quran.ksu.edu.sa/ayat/safahat1/104.png','http://quran.ksu.edu.sa/ayat/safahat1/105.png','http://quran.ksu.edu.sa/ayat/safahat1/106.png','http://quran.ksu.edu.sa/ayat/safahat1/107.png','http://quran.ksu.edu.sa/ayat/safahat1/108.png','http://quran.ksu.edu.sa/ayat/safahat1/109.png','http://quran.ksu.edu.sa/ayat/safahat1/110.png','http://quran.ksu.edu.sa/ayat/safahat1/111.png','http://quran.ksu.edu.sa/ayat/safahat1/112.png','http://quran.ksu.edu.sa/ayat/safahat1/113.png','http://quran.ksu.edu.sa/ayat/safahat1/114.png','http://quran.ksu.edu.sa/ayat/safahat1/115.png','http://quran.ksu.edu.sa/ayat/safahat1/116.png','http://quran.ksu.edu.sa/ayat/safahat1/117.png','http://quran.ksu.edu.sa/ayat/safahat1/118.png','http://quran.ksu.edu.sa/ayat/safahat1/119.png','http://quran.ksu.edu.sa/ayat/safahat1/120.png','http://quran.ksu.edu.sa/ayat/safahat1/121.png','http://quran.ksu.edu.sa/ayat/safahat1/122.png','http://quran.ksu.edu.sa/ayat/safahat1/123.png','http://quran.ksu.edu.sa/ayat/safahat1/124.png','http://quran.ksu.edu.sa/ayat/safahat1/125.png','http://quran.ksu.edu.sa/ayat/safahat1/126.png','http://quran.ksu.edu.sa/ayat/safahat1/127.png','http://quran.ksu.edu.sa/ayat/safahat1/128.png','http://quran.ksu.edu.sa/ayat/safahat1/129.png','http://quran.ksu.edu.sa/ayat/safahat1/130.png','http://quran.ksu.edu.sa/ayat/safahat1/131.png','http://quran.ksu.edu.sa/ayat/safahat1/132.png','http://quran.ksu.edu.sa/ayat/safahat1/133.png','http://quran.ksu.edu.sa/ayat/safahat1/134.png','http://quran.ksu.edu.sa/ayat/safahat1/135.png','http://quran.ksu.edu.sa/ayat/safahat1/136.png','http://quran.ksu.edu.sa/ayat/safahat1/137.png','http://quran.ksu.edu.sa/ayat/safahat1/138.png','http://quran.ksu.edu.sa/ayat/safahat1/139.png','http://quran.ksu.edu.sa/ayat/safahat1/140.png','http://quran.ksu.edu.sa/ayat/safahat1/141.png','http://quran.ksu.edu.sa/ayat/safahat1/142.png','http://quran.ksu.edu.sa/ayat/safahat1/143.png','http://quran.ksu.edu.sa/ayat/safahat1/144.png','http://quran.ksu.edu.sa/ayat/safahat1/145.png','http://quran.ksu.edu.sa/ayat/safahat1/146.png','http://quran.ksu.edu.sa/ayat/safahat1/147.png','http://quran.ksu.edu.sa/ayat/safahat1/148.png','http://quran.ksu.edu.sa/ayat/safahat1/149.png','http://quran.ksu.edu.sa/ayat/safahat1/150.png','http://quran.ksu.edu.sa/ayat/safahat1/151.png','http://quran.ksu.edu.sa/ayat/safahat1/152.png','http://quran.ksu.edu.sa/ayat/safahat1/153.png','http://quran.ksu.edu.sa/ayat/safahat1/154.png','http://quran.ksu.edu.sa/ayat/safahat1/155.png','http://quran.ksu.edu.sa/ayat/safahat1/156.png','http://quran.ksu.edu.sa/ayat/safahat1/157.png','http://quran.ksu.edu.sa/ayat/safahat1/158.png','http://quran.ksu.edu.sa/ayat/safahat1/159.png','http://quran.ksu.edu.sa/ayat/safahat1/160.png','http://quran.ksu.edu.sa/ayat/safahat1/161.png','http://quran.ksu.edu.sa/ayat/safahat1/162.png','http://quran.ksu.edu.sa/ayat/safahat1/163.png','http://quran.ksu.edu.sa/ayat/safahat1/164.png','http://quran.ksu.edu.sa/ayat/safahat1/165.png','http://quran.ksu.edu.sa/ayat/safahat1/166.png','http://quran.ksu.edu.sa/ayat/safahat1/167.png','http://quran.ksu.edu.sa/ayat/safahat1/168.png','http://quran.ksu.edu.sa/ayat/safahat1/169.png','http://quran.ksu.edu.sa/ayat/safahat1/170.png','http://quran.ksu.edu.sa/ayat/safahat1/171.png','http://quran.ksu.edu.sa/ayat/safahat1/172.png','http://quran.ksu.edu.sa/ayat/safahat1/173.png','http://quran.ksu.edu.sa/ayat/safahat1/174.png','http://quran.ksu.edu.sa/ayat/safahat1/175.png','http://quran.ksu.edu.sa/ayat/safahat1/176.png','http://quran.ksu.edu.sa/ayat/safahat1/177.png','http://quran.ksu.edu.sa/ayat/safahat1/178.png','http://quran.ksu.edu.sa/ayat/safahat1/179.png','http://quran.ksu.edu.sa/ayat/safahat1/180.png','http://quran.ksu.edu.sa/ayat/safahat1/181.png','http://quran.ksu.edu.sa/ayat/safahat1/182.png','http://quran.ksu.edu.sa/ayat/safahat1/183.png','http://quran.ksu.edu.sa/ayat/safahat1/184.png','http://quran.ksu.edu.sa/ayat/safahat1/185.png','http://quran.ksu.edu.sa/ayat/safahat1/186.png','http://quran.ksu.edu.sa/ayat/safahat1/187.png','http://quran.ksu.edu.sa/ayat/safahat1/188.png','http://quran.ksu.edu.sa/ayat/safahat1/189.png','http://quran.ksu.edu.sa/ayat/safahat1/190.png','http://quran.ksu.edu.sa/ayat/safahat1/191.png','http://quran.ksu.edu.sa/ayat/safahat1/192.png','http://quran.ksu.edu.sa/ayat/safahat1/193.png','http://quran.ksu.edu.sa/ayat/safahat1/194.png','http://quran.ksu.edu.sa/ayat/safahat1/195.png','http://quran.ksu.edu.sa/ayat/safahat1/196.png','http://quran.ksu.edu.sa/ayat/safahat1/197.png','http://quran.ksu.edu.sa/ayat/safahat1/198.png','http://quran.ksu.edu.sa/ayat/safahat1/199.png','http://quran.ksu.edu.sa/ayat/safahat1/200.png']
	let page = 1;

	message.delete();

	let embed = new Discord.RichEmbed()
	.setColor('#264d00')
	.setFooter(`القراآن الكريم | صفحة رقم ${page} من اصل ${pages.length} صفحة`, 'https://cdn.discordapp.com/attachments/404332408075190282/412722171325054996/NS1.png')
	.setImage(pages[page-1])


	message.channel.sendEmbed(embed).then(msg => {

		msg.react('⏮').then( r => {
			msg.react('⬅')
		.then(() => msg.react('⏹'))
		.then(() => msg.react('➡'))
		.then(() => msg.react('⏭'))

			let backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
			let forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

			let sbackwardsFilter = (reaction, user) => reaction.emoji.name === '⏮' && user.id === message.author.id;
			let sforwardsFilter = (reaction, user) => reaction.emoji.name === '⏭' && user.id === message.author.id;

			let cancelFilter = (reaction, user) => reaction.emoji.name === '⏹' && user.id === message.author.id;

			let backwards = msg.createReactionCollector(backwardsFilter, { time: 0 });
			let forwards = msg.createReactionCollector(forwardsFilter, { time: 0 });

			let sbackwards = msg.createReactionCollector(sbackwardsFilter, { time: 0 });
			let sforwards = msg.createReactionCollector(sforwardsFilter, { time: 0 });

			let cancel = msg.createReactionCollector(cancelFilter, { time: 0 });

			backwards.on('collect', r => {
				if (page === 1) return;
				page--;
				embed.setImage(pages[page-1]);
				embed.setFooter(`_القراآن الكريم صفحة رقم ${page} من اصل ${pages.length} صفحة_`, 'https://cdn.discordapp.com/attachments/404332408075190282/412722171325054996/NS1.png');
				msg.edit(embed)
			})
			forwards.on('collect', r => {
				if (page === pages.length) return;
				page++;
				embed.setImage(pages[page-1]);
				embed.setFooter(``, '');
				msg.edit(embed)
			})
			sbackwards.on('collect', r => {
				if (page === 1) return;
				page = 1;
				embed.setImage(pages[page-1]);
				embed.setFooter(``, '');
				msg.edit(embed)
			})
			sforwards.on('collect', r => {
				if (page === pages.length) return;
				page = 200; 
				embed.setImage(pages[page-1]);
				embed.setFooter(``, '');
				msg.edit(embed)
			})
			cancel.on('collect', r => {
				embed.setDescription(`_سوف يتم إغلاق القائمة_`);
				embed.setImage('');
				embed.setFooter(`MENU WILL CLOSE AFTER 3 SECONDS`, 'https://cdn.discordapp.com/attachments/637330727301808138/644512999285063706/4701771_1.jpg');
				msg.edit(embed).then(msg.delete(3000));
			})
		})
	})
}
});


   client.on('message',async message => {
	
  if(message.content.startsWith(prefix + "apply")) {
 
if(!message.channel.guild) return message.reply(' ');
 
 
  let submite = message.guild.channels.find(`name`, "apply");
 
  if(!submite) return message.channel.send("_لم اجد الروم الخاص بالتقديم_");
 
    let filter = m => m.author.id === message.author.id;
 
    let thisMessage;
 
    let thisFalse;
 
    message.channel.send('_من فضلك اكتب اسمك _ ✏').then(msg => {
 
 
 
    message.channel.awaitMessages(filter, {
 
      max: 1,
 
      time: 90000,
 
      errors: ['time']
 
    })
 
    .then(collected => {
 
      collected.first().delete();
 
      thisMessage = collected.first().content;
 
      let boi;
 
      msg.edit('_بماذا ستفيدنا_ ✏').then(msg => {
 
 
 
          message.channel.awaitMessages(filter, {
 
            max: 1,
 
            time: 90000,
 
            errors: ['time']
 
          })
 
          .then(collected => {
 
            collected.first().delete();
 
            boi = collected.first().content;
 
            let boi2;
 
            msg.edit('_من فضلك اكت عمرك_ ✏').then(msg => {
 
 
 
              message.channel.awaitMessages(filter, {
 
                max: 1,
 
                time: 90000,
 
                errors: ['time']
 
              })
 
              .then(collected => {
 
                collected.first().delete();
 
              boi2 = collected.first().content;
 
      msg.edit('_هل انت متاكد من التقديم نعم او لا_ 🛡');
 
 message.channel.awaitMessages(response => response.content === 'نعم' || 'لا' && filter,{
 
        max: 1,
 
        time: 90000,
 
        errors: ['time']
 
      })
 
      .then(collected => {
 
        if(collected.first().content === 'لا') {
 
          msg.delete();
 
          message.delete();
 
          thisFalse = false;
 
        }
 
        if(collected.first().content === 'نعم') {
 
          if(thisFalse === false) return;
 
          msg.edit('_تم ارسال التقديم بنجاح_');
 
          collected.first().delete();
 
          submite.send(`
_الاسم :_
_${thisMessage}_
 
_العمر :_
_${boi2}_
 
_بماذا ستفيدنا :_
_${boi}_
 
_تم التقديم بواسطة :_
_${message.author}_
 
_ايدي المقدم :_
_${message.author.id}_

_<@706286732320047195>_`);
 
        }
 
      }
 
  );
 
});
 
    });
 
  }
 
    );
 
  });
 
}
 
);
 
    })}});

//كود الالعاب

client.on('message', message => {
    if (message.content == prefix + "سرعة") { 
        var x = ["LioN_Dz",
"Death Matches",
"رؤوف الافضل دائما",
"GAMES NETWORK",
"DZ",
"العراق",
"المملكة العربية السعودية",
"القسطنطينية",
"النهاية بل البدابة",
"امازون",
"جافاسكربت",
"سهله مو صعبه",
"طبق رطب مرق بقر",
"متجر بلاي",
"شجرة الصنوبر",
"عش العصفور",
"هلا بلخميس هلا هلا",
"الحوت الأزرق",
"حبيبي ولله",
"كنتاكي",
"توكا",
"عادل امام",
"راغب علامة",
"عمان",
"مسقط",
"احبك موت",
"Playing Minecraft",
"Music",
"FaceBooK",
"YouTube",
"Infinity",
"Discor.js",
"My Brother",
"Space",
"Instgram",
"Google",
"Viber",
"WhatsApp",
"People",
"Public",
"Pubg Mobile",
"Free Fire",
"Fortnite",
"ماين كرافت فل داتا",
"ماين كرافت فل اكسس",
"اموت بيك",
"طبق لحم مرقة الدجاج",
 
];
              var x2 = ["LioN_Dz",
"Death Matches",
"رؤوف الافضل دائما",
"GAMES NETWORK",
"DZ",
"العراق",
"المملكة العربية السعودية",
"القسطنطينية",
"النهاية بل البدابة",
"امازون",
"جافاسكربت",
"سهله مو صعبه",
"طبق رطب مرق بقر",
"متجر بلاي",
"شجرة الصنوبر",
"عش العصفور",
"هلا بلخميس هلا هلا",
"الحوت الأزرق",
"حبيبي ولله",
"كنتاكي",
"توكا",
"عادل امام",
"راغب علامة",
"عمان",
"مسقط",
"احبك موت",
"Playing Minecraft",
"Music",
"FaceBooK",
"YouTube",
"Infinity",
"Discor.js",
"My Brother",
"Space",
"Instgram",
"Google",
"Viber",
"WhatsApp",
"People",
"Public",
"Pubg Mobile",
"Free Fire",
"Fortnite",
"ماين كرافت فل داتا",
"ماين كرافت فل اكسس",
"اموت بيك",
"طبق لحم مرقة الدجاج",
 
 
 
 
        ];
 
        var x3 = Math.floor(Math.random()*x.length)
        message.channel.send(`_الكلمة هي ${x[x3]} لديك 15 ثانية للجابة_`).then(msg1=> {
            var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
                maxMatches : 1,
                time : 15000,
                errors : ['time']
            })
        r.catch(() => {
            return message.channel.send(`_لقد انتهى الوقت و لم يجب احد ${x2[x3]}_`)
        })
 
        r.then((collected)=> {
            message.channel.send(`_${collected.first().author} احسنت عملا لقد كتبت الكلمة قبل انتهاء الوقت_`);
        })
        }) //OT|| The Wolf Is Back
    }
})
 
client.on('message', puz => {
    if (puz.content == prefix + "اسئلة") {
        var x = ["_🤔 ماهي حاسة الشم عند الثعبان_",
"_🤔 ما هو الشي الذي يكسو الناس و هو عار بدون ملابس_",
"_🤔 ما هو الشي الذي لا يجري و لا يمشي_",
"_🤔 ما هو إسم الشهر الميلادي الذي إذا حذفت أوله , تحول إلى إسم فاكهه_",
"_🤔 ما هو الشي الذي لا يدخل الإ إذا ضرب على رأسه_",
"_🤔 ما هو الشيء الذي اسمه على لونه_",
"_🤔 ما هو الشيء الذي يأكل ولا يشبع_",
"_🤔 ما هو الشي الذي كلما زاد نقص_",
"_🤔 ما هي التي تحرق نفسها لتفيد غيرها_",
"_🤔 كله ثقوب و مع ذلك يحفظ الماء_",
"_🤔 ما هو الذي لحمه من الداخل و عظمه من الخارج_",
"_🤔 يستطيع ان يخترق الزجاج من دون كسره فمن هو_",
];
        var x2 = ['اللسان',
		"الابره",
        "الماء",
		"تموز",
		"المسمار",
		"البيضة",
   "النار", //OT|| The Wolf Is Back
		"العمر",
		"الشمعة",
		"الاسفنج",
		"السلحفاة",
		"الضوء",
 
 
 
 
        ];
 
        var x3 = Math.floor(Math.random()*x.length)
        puz.channel.send(`_السؤال هو_ ${x[x3]} _لديك 15 ثانية للاجابة_`).then(msg1=> {
            var r = puz.channel.awaitMessages(msg => msg.content == x2[x3], {
                maxMatches : 1,
                time : 15000,
                errors : ['time']
            })
        r.catch(() => {
            return puz.channel.send(`_لقد انتهى الوقت و لم يجب احد ${x2[x3]}_
 
 
           `)
           //OT|| The Wolf Is Back
        })
 
        r.then((collected)=> {
            puz.channel.send(`_${collected.first().author} احسنت عملا لقد حللت اللغز في قبل انهاء الوقت_`);
        })
        })
    }
}) //OT|| The Wolf Is Back
 
client.on('message', fkk => {
    if (fkk.content == prefix + "فكك") {
        var x = ["المتاح للجميع لا يتاح لي",
"اكرهك بس احبك",
"Minecraft", //OT|| The Wolf Is Back
"بريء بس مذنب",
"بسم الله الرحمن الرحيم",
"الضرورة وقت الحصورة",
"دنيا",
"صارم",
"مات بس عاش", //OT|| The Wolf Is Back
"شعبان بس جوعان",
"ألعراق",
"المملكة العربية السعودية",
"Raouf",
"GamesNetwork",
];
        var x2 = ['ا ل م ت ا ح ل ل ج م ي ع ل ا ي ت ا ح ل ى',
		"ا ك ر ه ك ب س ا ح ب ك",
        "M i n e c r a f t",
		"ب ر ي ء ب س م ذ ن ب",
		"ب س م ا ل ل ه ا ل ر ح م ن ا ل ر ح ي م",
		"ا ل ض ر و ر ة و ق ت ا ل ح ص و ر ة",
		"د ن ي ا",
		"ص ا ر م",
		"م ا ت ب س ع ا ش",
		"ش ع ب ا ن ب س ج و ع ا ن",
		"أ ل ع ر ا ق",
"ا ل م م ل ك ة ا ل ع ر ب ي ة ا ل س و ع و د ي ة",
"R a o u f",
"G a m e s N e t w o r k",
 
       //OT|| The Wolf Is Back
 
 
        //OT|| The Wolf Is Back
 
 
 
        ];
 
        var x3 = Math.floor(Math.random()*x.length)
        fkk.channel.send(`_الكلمة هي_ ${x[x3]} _لديك 15 ثانية للجابة_`).then(msg1=> {
            var r = fkk.channel.awaitMessages(msg => msg.content == x2[x3], {
                maxMatches : 1,
                time : 15000,
                errors : ['time']
            })
        r.catch(() => {
            return fkk.channel.send(`_لقد انتهى الوقت و لم يجب احد ${x2[x3]}_`)
        }) //OT|| The Wolf Is Back
 
        r.then((collected)=> {
            fkk.channel.send(`_${collected.first().author} احسنت عملا لقد حللت اللغز في قبل انهاء الوقت_`);
        })
        }) //OT|| The Wolf Is Back
    }
}); //OT|| The Wolf Is Back



//كود التاريخ و الايموجي ليست و الساي و الايمبد

        client.on('guildMemberRemove', member => {
            var embed = new Discord.RichEmbed()
            .setAuthor(member.user.username, member.user.avatarURL)
            .setThumbnail(member.user.avatarURL)
            .setTitle(`MEMBER LEAVE !`)
            .setDescription(`_مع السلامة_`)
            .addField('_تبقى_',`_: ${member.guild.memberCount}_`,true)
            .setColor('RED')
            .setFooter(`_جظ اوفر في التجربة القادمة_`, 'https://cdn.discordapp.com/attachments/397818254439219217/399292026782351381/shy.png')
        
        var channel =member.guild.channels.find('name', 'leave')
        if (!channel) return;
        channel.send({embed : embed});
        })

const HeRo = new Discord.Client();
client.on('message', message => {
var prefix = ":";

    if (message.content === prefix + "date") {
        if (!message.channel.guild) return message.reply('** This command only for servers **');  
        var currentTime = new Date(),
            Year = currentTime.getFullYear(),
            Month = currentTime.getMonth() + 1,
            Day = currentTime.getDate();

            var Date15= new Discord.RichEmbed()
            .setTitle("DATE")
            .setColor('RANDOM')
            .setTimestamp()
            .setDescription( ""+ Day + "/" + Month + "/" + Year + "")
             message.channel.sendEmbed(Date15);
    }
});

client.on('message', message => { 
    if (message.content.startsWith(prefix + 'emojilist')) {

        const List = message.guild.emojis.map(e => e.toString()).join(" ");

        const EmojiList = new Discord.RichEmbed()
            .setTitle('EMOJIS') 
            .setAuthor(message.guild.name, message.guild.iconURL) 
            .setColor('RANDOM') 
            .setDescription(List) 
            .setFooter(message.guild.name) 
        message.channel.send(EmojiList) 
    }
});

//كود عرض البوتات و الممبرز و الرومات



   client.on('message', message => {
     if(!message.channel.guild) return;
var prefix = ":";
                if(message.content.startsWith(prefix + 'allbots')) {

    
    if (message.author.bot) return;
    let i = 1;
        const botssize = message.guild.members.filter(m=>m.user.bot).map(m=>`${i++} - <@${m.id}>`);
          const embed = new Discord.RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setDescription(`**FOUND ${message.guild.members.filter(m=>m.user.bot).size} BOTS IN THIS SERVER**
${botssize.join('\n')}`)
.setFooter(client.user.username, client.user.avatarURL)
.setTimestamp();
message.channel.send(embed)

}


});

client.on('message', message => {
    if(message.content == ':members') {
    const embed = new Discord.RichEmbed()
    .setDescription(`**MEMBERS
ALL : ${message.guild.memberCount}
ONLINE : ${message.guild.members.filter(m=>m.presence.status == 'online').size} :green_square:
IDLE : ${message.guild.members.filter(m=>m.presence.status == 'idle').size} :orange_square:
DO NOT DISTURB : ${message.guild.members.filter(m=>m.presence.status == 'dnd').size} :red_square:
OFFLINE : ${message.guild.members.filter(m=>m.presence.status == 'offline').size} :white_large_square:**`)         
         message.channel.send({embed});

    }
  });



client.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
  if(!message.channel.guild) return message.reply('** This command only for servers **')
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
    if (command === "kill"){

   var sabotage = message.mentions.users.first();
   if(sabotage == message.author)return message.reply(`_لو انتحرت بتتحاسب عند ربنا_`);
    if(sabotage === client.user) return message.reply(`_وش سويت لامك_`);
  if (sabotage < 1) {
    message.delete();
    return message.channel.sendMessage('_قم بمنشنت الشخص او كتابة اسمه_');
  }
  if (!sabotage) return message.channel.send(`Please Mention A Member to Kill :warning:`)
  message.channel.send("▄︻̷̿┻̿═━一 ${sabotage")
  .then(msg =>{
  msg.edit(`▄︻̷̿┻̿═━一 ${sabotage} :three:`);
  setTimeout(function() {
    msg.edit(`▄︻̷̿┻̿═━一 ${sabotage} :two:`);
  }, 1000);
  setTimeout(function() {
    msg.edit(`▄︻̷̿┻̿═━一 ${sabotage} :one:`);
  }, 2000);
  setTimeout(function() {
    msg.edit(`▄︻̷̿┻̿═━一 :boom:`);
  }, 3000);
  setTimeout(function() {
    msg.edit(`▄︻̷̿┻̿═━一 :fire:`);
  }, 4000);
  setTimeout(function() {
    msg.edit(`▄︻̷̿┻̿═━一 :skull:`);
  }, 5000);
  msg.delete(6000)
  message.delete()
  })
  message.channel.send("_تم اخفاء الحريمة بنجاح_").then(msg => msg.delete(7000));
    }
});

client.on('message', message => {
   if(message.channel.type === "dm") return;
     if(message.content.startsWith (":marry")) {
     if(!message.channel.guild) return message.reply(' This command only for servers ')
     var proposed = message.mentions.members.first()
 
     if(!message.mentions.members.first()) return message.reply('_لازم تطلب ايد وحدة_').catch(console.error);
     if(message.mentions.users.size > 1) return message.reply('_ولد ما يضبط لازم بنت_').catch(console.error);
      if(proposed === message.author) return message.reply(`_خنتني ؟_`);
       if(proposed === client.user) return message.reply(`_تريد تتزوجني_`);
             message.channel.send(`_${proposed}
بدك تقبلي عرض الزواج من ${message.author}
العرض لمدة 10 ثواني
اكتبي موافقه او لا_`)
 
const filter = m => m.content.startsWith("موافقه");
message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
.then(collected =>{
   message.channel.send(`_${message.author} و ${proposed} الف الف مبروك انشاء الله تستمتعون بحياتكم الزوجية ويطول اعماركم ولا تنسون شهر العسل_`);
})
  .catch(collected => message.channel.send(`_السكوت علامة الرضا نقول مبروك_`))
 
  const filte = m => m.content.startsWith("لا");
message.channel.awaitMessages(filte, { max: 1, time: 15000, errors: ['time'] })
.then(collected =>{
  message.channel.send(`_${message.author} تم رفض عرضك_`);
})
 
 
 
 
 }
});


client.on('message', message => {
    if (message.content == ":عواصم"){
        var x = ["_ماهي عاصمة المفرب_",
    "_ماهي عاصمة افغانستان_",
    "_ماهي عاصمة الجزائر_",
    "_ماهي عاصمة الارجنتين_",
    "_ماهي عاصمة مصر_",
    "_ماهي عاصمة استراليا_",
    "_ماهي عاصمة البرازيل_",
    "_ماهي عاصمة قطر_",
    "_ماهي عاصمة السعودية_",
    "_ماهي عاصمة سوريا_",
    "_ماهي عاصمة تركيا_",
    "_ماهي عاصمة العراق_",
    "_ماهي عاصمة لبنان_",
    "_ماهي عاصمة فلسطين_",
    "_ماهي عاصمة امريكا_",
   "_ماهي عاصمة كندا_",
   "_ماهي عاصمة البرازيل_",
];
        var x2 = ['الرباط',
        "كابل",
        "الجزائر",
      "بوينس ايرس",
"القاهرة",
"كانبرا",
"برازيليا",
"الدوحة",
      "الرياض",
      "دمشق",
      "انقرة",
    "بغداد",
      "بيروت",
    "القدس",
  "وشنطن",
    "اوتاوا",
  "برازيليا",
  
        
        ];
        
        var x3 = Math.floor(Math.random()*x.length)
        message.channel.send(`_السؤال هو_ ${x[x3]} _لديك 15 ثانية للجابة_`).then(msg1=> {
            var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
                maxMatches : 1,
                time : 20000,
                errors : ['time']
            })
        r.catch(() => {
            return message.channel.send(`_لقد انتهى الوقت و لم يجب احد ${x2[x3]}_`)
        })
        
        r.then((collected)=> {
            message.channel.send(`_${collected.first().author} احسنت عملا لقد كتبت العاصمة الصحيحة قبل انهاء الوقت_`);
        })
        })
    }
})

client.on('message', message => {
    if (message.content.startsWith(":hack")) {
        if(!message.author.id === '') return;
      if (message.author.bot) return
           message.delete();
             let args = message.content.split(' ').slice(1);
 
                   let virusname = args.join(' ');
                 if (virusname < 1) {
                     return message.channel.send("_اكتب اسم الشخص_");
                 }
                 message.channel.send({embed: new Discord.RichEmbed().setTitle('Loading ' + virusname + "...").setColor(0xFF0000)}).then(function(m) {
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓ ] 1%').setColor(0xFF0000)})
             }, 1000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓ ] 2%').setColor(0xFF0000)})
             }, 2000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓ ] 3%').setColor(0xFF0000)})
             }, 3000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓ ] 4%').setColor(0xFF0000)})
             }, 4000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓ ] 20%').setColor(0xFF0000)})
             }, 5000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 30%').setColor(0xFF0000)})
             }, 6000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 40%').setColor(0xFF0000)})
             }, 7000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 50%').setColor(0xFF0000)})
             }, 8000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 70%').setColor(0xFF0000)})
             }, 9000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 85%').setColor(0xFF0000)})
             }, 10000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 90%').setColor(0xFF0000)})
             }, 11000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 95%').setColor(0xFF0000)})
             }, 12000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 96%').setColor(0xFF0000)})
             }, 13000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 97%').setColor(0xFF0000)})
             }, 14000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 98%').setColor(0xFF0000)})
             }, 15000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 99%').setColor(0xFF0000)})
             }, 16000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%').setColor(0xFF0000)})
             }, 17000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']:' + virusname + 'done it\'s going good 100.9%').setColor(0xFF0000)})
             }, 18000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: يتم تهكير ').setColor(0xFF0000)})
             }, 19000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: تحديث بسيط' + virusname + ".key").setColor(0xFF0000)})
             }, 22000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: يرجى انتضار ثواني 5...').setColor(0xFF0000)})
             }, 25000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: يرجى انتضار ثواني 4...').setColor(0xFF0000)})
             }, 26000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: يرجى انتضار ثواني 3...').setColor(0xFF0000)})
             }, 27000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: يرجى انتضار ثواني 2...').setColor(0xFF0000)})
             }, 28000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: يرجى انتضار ثواني 1...').setColor(0xFF0000)})
             }, 29000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 99%').setColor(0xFF0000)})
           }, 30000)
              setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]100% virus added').setColor(0xFF0000)})
           }, 31000)
              setTimeout(function() {
               m.delete()
           }, 32000)
             setTimeout(function() {
               message.channel.send('_تمت عملية التهكير بنجاح_')
           }, 33000)
           });
         }
})


//كود الترجمة

client.on("message", async message => {
try {
const translate = require("google-translate-open-api").default;
const ISO = require("iso-639-1");
const slug = require("speakingurl");
  let prefix = ":";
  if (message.content.startsWith(prefix + "tr")) {
    
let args = message.content.split(/[ ]+/);
let lang = args[1];
let text = args.slice(2).join(" ");
var slugtr = slug(lang);
var language = ISO.getName(slugtr);
    if (!lang)return message.reply("**Usage :** `#translate <language code> [word]`\n**Example :** `#translate ar hello world`");
    if (!text)return message.reply("Please Write Your word and try again");
    if (!language) return message.reply("Vaild Language Code");

let loading = await message.channel.send("Translating Your message ...").catch(err => message.channel.send(err));
let result = await translate([text], {
      tld: "com",
      to: slugtr,
      format: "text",
      browers: true
    });
let data = result.data[0];

    if (!data)return message.reply("i can't Translate Now Please try again later");

let embed = new Discord.RichEmbed()
        .setTitle(`_TRANSLATOR_`)
        .setDescription(`_**LANGUAGE :** ${language}_\n_**TEXT :** ${data}_`)
        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/1200px-Google_Translate_logo.svg.png")
        .setFooter("MADE BY Тигр#0080")
        .setColor("#66ccff");
loading.edit(embed);

}} catch (err) {
    message.channel.send(" " + err).catch();}
});

//كود البحث عن الصور

client.on("message", async message => {
  let prefix = ":";
  const request = require("request");
  let args = message.content.split(/[ ]+/);
  let word = args.slice(1).join(" ");

  if (message.content.startsWith(prefix + "gif")) {
    try {
      if (!word) return message.reply("You need to give something to search");

      request(
        {
          url:
            "https://api.tenor.com/v1/search?q=" +
            word +
            "&key=5THPJ661F87H&limit=1",
          json: true
        },
        async (req, res, json) => {
          let embed = new Discord.RichEmbed()
            .setFooter("MADE BY Тигр#0080")
            .setImage(json.results[0].media[0].gif.url)
            .setColor("BLUE");

          message.channel.send(embed);
        }
      );
    } catch (err) {
      message.channel.send("There was an error!\n" + err).catch();
    }
  }
});

//كود البحث عن مقاطع يوتيوب

client.on("message", async message => {
  const { YTSearcher } = require("ytsearcher");
  const searcher = new YTSearcher("AIzaSyB2r1MembNCs_Cghu1NtSAmim-t9MPGkug");
  let prefix = ":";
  const request = require("request");
  let args = message.content.split(/[ ]+/);
  let word = args.slice(1).join(" ");

  if (message.content.startsWith(prefix + "yt")) {
    try {
      if (!word) return message.reply("You need to give something to search");

      let msg = await message.channel.send("Searching ...");

      searcher.search(word).then(info => {
        if (!info.first)
          return message.reply(
            "I couldn't find anything on Youtube with your query"
          );

        let embed = new Discord.RichEmbed()
          .setTitle(info.first.title)
          .setDescription(info.first.url)
          .setColor("BLUE");

        msg.edit(embed);
      });
    } catch (err) {
      message.channel.send("There was an error\n" + err).catch();
    }
  }
});

//كود توب انفايت

client.on('message',message =>{
    if(message.content.startsWith(prefix + 'topinvites')) {
      
  message.guild.fetchInvites().then(i =>{
  var invites = [];
   
  i.forEach(inv =>{
    var [invs,i]=[{},null];
     
    if(inv.maxUses){
        invs[inv.code] =+ inv.uses+"/"+inv.maxUses;
    }else{
        invs[inv.code] =+ inv.uses;
    }
        invites.push(`**TOP INVITES :** ${inv.url} **INVITES NUMBER :** ${inv.inviter} \`${invs[inv.code]}\``);
   
  });
  var embed = new Discord.RichEmbed()
  .setColor("#000000")
  .setDescription(`${invites.join(`\n`)+'\n\n**By :** '+message.author}`)
           message.channel.send({ embed: embed });
   
  });
   
    }
  });

//كود البحث عن الميمز

client.on("message", async message => {
  let prefix = ":";
  const request = require("request");

  if (message.content.startsWith(prefix + "meme")) {
    try {
      request(
        { json: true, url: "https://meme-api.herokuapp.com/gimme/dankmemes" },
        (err, res, json) => {
          if (err) {
            message.reply("There was an error!");
          } else {
            message.channel.send(new Discord.Attachment(json.url));
          }
        }
      );
    } catch (err) {
      message.channel.send("There was an error\n" + err).catch();
    }
  }
});


//كود الخط

client.on("message", msg => {
  if (msg.content === "خط") { /// هنا تكتب الكلام
    msg.reply("https://images-ext-2.discordapp.net/external/bENJF1hDXB5Tsj3B44eJqDYeja5pntKyxPXteRrxTf8/https/media.discordapp.net/attachments/751544251195588718/751570167531831306/23_B64BF11.gif?width=769&height=49"); /// هنا الرد

  }
});



//كود معلومات البوت

client.on("message", async message => {
  let prefix = ":";
  require("moment-duration-format");
  const cpu = require("pidusage");
  const moment = require("moment");

  if (message.content.startsWith(prefix + "st")) {
    try {
      cpu(process.pid, async (err, stats) => {
        const duration = moment
          .duration(client.uptime)
          .format(" D [days], H [hrs], m [mins], s [secs]");
        const embed = new Discord.RichEmbed()
          .setTitle(client.user.tag + " STATUS")
          .setDescription(
            `
**Prefix :** ${prefix}
**RAM Usage :** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
**Uptime :** ${duration}
**Users :** ${client.users.size}
**Servers :** ${client.guilds.size.toLocaleString()}
**Channels:** ${client.channels.size.toLocaleString()}
**Status :** ${client.user.presence.status}
**Game :** ${client.user.presence.game}
**Discord.js :** 11.3.2
**CPU Usage :** ${Math.round(stats.cpu)}%
**Node.js :** ${process.version}
**Startup Time :** ${client.startuptime}ms
**Voice Connections :** ${client.voiceConnections.size}
**Programmed by :** Тигр#0080
**Programmer server :** https://discord.gg/qeUaBXF :fire:`
          )
          .setColor("BLUE");

        message.channel.send(embed);
      });
    } catch (err) {
      message.channel.send("There was an error!\n" + err).catch();
    }
  }
});




//كود help

  client.on("message", function(message) {
    var prefix = ":";
   if(message.content.startsWith(prefix + "help")) {
    let messageArgs = message.content.split(" ").slice(1).join(" ");
    let messageRPS = message.content.split(" ").slice(2).join(" ");
    let arrayRPS = ['**# - Rock**','**# - Paper**','**# - Scissors**'];
    let result = `${arrayRPS[Math.floor(Math.random() * arrayRPS.length)]}`;
    var RpsEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setThumbnail(message.author.avatarURL)
    .addField("ADMINISTRATOR","👑",true)
    .addField("PUBLIC","👥",true)
    .addField("PROTECTION","🛡️",true)
    .addField("GAMES","🎮",true)
    .addField("ROOMS","💬",true)
    message.channel.send(RpsEmbed).then(msg => {
        msg.react('👑')
        msg.react("👥")
        msg.react("🛡️")
        msg.react("🎮")
        msg.react("💬")
.then(() => msg.react('👑'))
.then(() =>msg.react('👥'))
.then(() => msg.react('🛡️'))
.then(() => msg.react('🎮'))
.then(() => msg.react('💬'))
let reaction1Filter = (reaction, user) => reaction.emoji.name === '👑' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '👥' && user.id === message.author.id;
let reaction3Filter = (reaction, user) => reaction.emoji.name === '🛡️' && user.id === message.author.id;
let reaction4Filter = (reaction, user) => reaction.emoji.name === '🎮' && user.id === message.author.id;
let reaction5Filter = (reaction, user) => reaction.emoji.name === '💬' && user.id === message.author.id;
let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 20000 });  
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 19000 });
let reaction3 = msg.createReactionCollector(reaction3Filter, { time: 18000 });
let reaction4 = msg.createReactionCollector(reaction4Filter, { time: 17000 });
let reaction5 = msg.createReactionCollector(reaction5Filter, { time: 16000 });
reaction1.on("collect", r => {
  const embed = new Discord.RichEmbed()
      .setColor("#000000")
      .setDescription(`___اوامر ادارية : 👑___
_${prefix}ban : لحظر شخص من السيرفر_
_${prefix}unban : لفك الحظر عن الشخص من السيرفر_
_${prefix}mute : لاسكات شخص عن التكلم_
_${prefix}unmute : لفك الاسكات عن الشخص للتكلم_
_${prefix}kick : لطرد شخص من السيرفر_
_${prefix}warn : لتحذير شخص_
_${prefix}nick : لتغيير اسم الشخص_
_${prefix}lock : لقفل الشات_
_${prefix}unlock : لفتح الشات_
_${prefix}clear : لمسح الشات بعدد_
_${prefix}createcolors : لصنع 100 رتبة الوان_
_${prefix}move : لسحب شخص الى رومك الصوتي_
_${prefix}role @user role name : لاعطاء رتبة لشخص_
_${prefix}role all role name : لاعطاء رتبة للكل_
_${prefix}role humans role name : لاعطاء رتبة للبشريين_
_${prefix}role bots role name : لاعطاء رتبة للبوتات_`)
   message.author.sendEmbed(embed)
      message.reply('_تم ارسالك بلخاص_')
})
reaction2.on("collect", r => {
      const embed = new Discord.RichEmbed()
      .setColor("#000000")
      .setDescription(`___اوامر عامة : 👥___
_${prefix}thelp : عرض قائمى المساعدة الخاصة بالتيكت_
_${prefix}server : عرض معلومات السيرفر_
_${prefix}user : عرض معلومات الشخص_
_${prefix}avatar : عرض صورة البروفايل_
_${prefix}avatar server : عرض صورة السيرفر_
_${prefix}invites : عرض عدد الدعوات_
_${prefix}topinvites : لعرض قائمة افضل الدعوات_
_${prefix}apply : للتقديم_
_${prefix}sug : للاقتراح_
_${prefix}report : للابلاغ_
_${prefix}rooms : لعرض رومات السيرفر_
_${prefix}allbots : لعرض بوتات السيرفر_
_${prefix}bans : لعرض عدد الاشخاص المحظورين من السيرفر_
_${prefix}emojilist : لعرض ايموجيات السيرفر_
_${prefix}date : لعرض تاريخ اليوم_
_${prefix}members : لعرض حالة الاعضاء_
_${prefix}roll : النرد_
_${prefix}tr : لترجمة الكلمات_
_${prefix}st : لعرض معلومات البوت_
_${prefix}gif : لعرض صور متحركة_
_${prefix}meme : لعرض الميمز_`)
   message.author.sendEmbed(embed)
      message.reply('_تم ارسالك بلخاص_')
})
reaction3.on("collect", r => {
  const embed = new Discord.RichEmbed()
      .setColor("#000000")
      .setDescription(`___اوامر الحماية : 🛡️___
_${prefix}limitbans NUMBER : لتحديد الحد الاقصى للباند_
_${prefix}limitkicks NUMBER : لتحديد الحد الاقصى للكيك_
_${prefix}limitroleDelete NUMBER : لتحديد الحد القصى لحذف الرتب_
_${prefix}limitchannelDelete NUMBER : لتحديد الحد الاقصى لحذف الرومات_
_${prefix}limittime 1000 : تكتبها بعدما تكمل كل شيء_
_${prefix}antibots on : لمنع دخول البوتات_
_${prefix}antibots off : لتعطيل منع دخول البوتات_
_${prefix}antilink on : لمنع نشر الروابط_
_${prefix}antilink off : لتعطيل منع نشر الروابط_
_${prefix}setfake : لمنع دخول الوهمي و ضبط اعدادات الامر_
_${prefix}antifake off : لتعطيل منع دخول الوهمي_
_${prefix}setlog : لتحديد روم اللوق_`)
   message.author.sendEmbed(embed)
   message.reply('_تم الارسال في الخاص_')
})
reaction4.on("collect", r => {
  const embed = new Discord.RichEmbed()
      .setColor("#000000")
      .setDescription(`___اوامر ترفيهية : 🎮___
_${prefix}فكك : من هو الاسرع في تفكيك الكلمات ؟_
_${prefix}عواصم : من هو الاسرع في كتابة عاصمة البلد ؟_
_${prefix}سرعة : من هو الاسرع في اعادة كتابة الجملة ؟_
_${prefix}marry : لطلب ايد وحده_
_${prefix}hack : لتهكير الشخص حقيقة مو لعبة_
**COMING SOON IN OTHER VERSION FOR THIS BOT**`)
   message.author.sendEmbed(embed)
   message.reply('_تم الارسال في الخاص_')
})
reaction5.on("collect", r => {
  const embed = new Discord.RichEmbed()
      .setColor("#000000")
      .setDescription(`
___الرومات : 💬___
_suggestion : روم الاقتراح_
_apply : روم التقديم_
_reports : روم الابلاغ_
`)
   message.author.sendEmbed(embed)
})
    })
}
});


client.on('ready', () => {

  console.log(`Logged in as ${client.user.tag}!`);

   var ms = 10000;

    var setGame = [`BY Тигр#0080 ❤️`,`MY PREFIX IS :`,``,``,``];

    var i = -1;

    var j = 0;

    setInterval(function() {

        if (i == -1) {

            j = 1;

        }

        if (i == (setGame.length) - 1) {

            j = -1;

        }

        i = i + j;

        client.user.setGame(setGame[i]);

    }, ms);

});


client.login(process.env.token);
