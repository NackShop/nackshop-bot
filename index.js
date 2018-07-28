const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log(`[NackShop] Bot online!`);
    bot.user.setActivity(`=help > Commande d'aide`);
});

bot.on('message', msg => {
    if(msg.author.bot) return;
    if(msg.content === '=help'){
        const help_embed = new Discord.RichEmbed()
            .setTitle(`Commande du NackShop Bot!`)
            .setDescription(`Commande d'aide du NackShop Bot:`)
            .setColor('#861111')
            .setFooter('By Nacktor#4363')
            .addField('🤖 > Bot :', '`=help`,`=info`')
            .addField('💰 > Shop:', '`=web`,`=don`,`=mail`,`=prix`,`=invitation`')
            .addField('👮 > Modération:', '`=kick`,`=ban`,`=clear`,`=mute`,`=unmute`');
        msg.react('✅');
        msg.author.send(help_embed);
    }

    if(msg.content === '=info'){
        const info_embed = new Discord.RichEmbed()
            .setTitle(`Commande du NackShop Bot!`)
            .setDescription('Commande d\'information du NackShop Bot:')
            .setColor('#861111')
            .setFooter('By Nacktor#4363')
            .addField('Name:', 'NackShop')
            .addField('Author:', 'Nacktor#4363')
            .addField('Version:', '1.0.0')
            .addField('Prefix:', '=');
        msg.react('✅');
        msg.author.send(info_embed);
    }

    if(msg.content === '=web'){
        msg.channel.send('**Site web:** https://nackshop.tk/');
    }

    if(msg.content === '=don'){
        msg.channel.send('**Donation:** https://paypal.me/NackShop');
    }

    if(msg.content === '=mail'){
        msg.channel.send('**Email:** nackshop.public@gmail.com');
    }

    if(msg.content === '=prix'){
        msg.channel.send('**Launcher minecraft:** minimum 7.00€');
        msg.channel.send('**Plugins minecraft:** minimum 1.00€');
    }

    if(msg.content === '=invitation'){
        msg.channel.send('**10 invitations:** plugins type simple');
        msg.channel.send('**20 invitations:** Launcher type simple');
        msg.channel.send('**30 invitations:** plugins type complexe');
        msg.channel.send('**40 invitations:** Launcher type complexe');
    }

    if(msg.content.startsWith('=kick')){
        if(!msg.guild.member(msg.author).hasPermission('KICK_MEMBERS')) return msg.channel.send('Vous n\'avez pas la permission!');
        if(msg.mentions.users.size === 0) return msg.channel.send('Veuillez mentionner un utilisateur!');
        var kick = msg.guild.member(msg.mentions.users.first());
        if(!kick) return msg.channel.send('Veuillez mentionner un utilisateur valide!');

        kick.kick().then(member  => {
            msg.channel.send(`**${member.displayName}** a était kick par **${msg.guild.member(msg.author).displayName}**!`)
        });
    }

    if(msg.content.startsWith('=ban')){
        if(!msg.guild.member(msg.author).hasPermission('BAN_MEMBERS')) return msg.channel.send('Vous n\'avez pas la permission!');
        if(msg.mentions.users.size === 0) return msg.channel.send('Veuillez mentionner un utilisateur!');
        var ban = msg.guild.member(msg.mentions.users.first());
        if(!ban) return msg.channel.send('Veuillez mentionner un utilisateur valide!');

        ban.ban().then(member  => {
            msg.channel.send(`**${member.displayName}** a était ban par **${msg.guild.member(msg.author).displayName}**!`)
        });
    }

    if(msg.content.startsWith('=clear')){
        if(!msg.guild.member(msg.author).hasPermission('MANAGE_MESSAGES')) return msg.channel.send('Vous n\'avez pas la permission!');
        let args = msg.content.split(" ").slice(1);
        if(!args[0]) return msg.channel.send('Veuillez préciser le nomble de message a supprimer!');

        msg.channel.bulkDelete(args[0]).then(() => {
            msg.channel.send(`${args[0]} messages on était supprimer!`);
        });
    }

    if(msg.content.startsWith('=mute')){
        if(!msg.guild.member(msg.author).hasPermission('MUTE_MEMBERS')) return msg.channel.send('Vous n\'avez pas la permission!');
        if(msg.mentions.users.size === 0) return msg.channel.send('Veuillez mentionner un utilisateur!');
        var mute = msg.guild.member(msg.mentions.users.first());
        if(!mute) return msg.channel.send('Veuillez mentionner un utilisateur valide!');

        msg.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            msg.channel.send(`${mute.user.username} est mute !`);
        });
    }

    if(msg.content.startsWith("=unmute")) {
        if(!msg.guild.member(msg.author).hasPermission('MUTE_MEMBERS')) return msg.channel.send('Vous n\'avez pas la permission!');
        if(msg.mentions.users.size === 0) return msg.channel.send('Veuillez mentionner un utilisateur!');
        var mute = msg.guild.member(msg.mentions.users.first());
        if(!mute) return msg.channel.send('Veuillez mentionner un utilisateur valide!');

        msg.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            msg.channel.send(`${mute.user.username} n'est plus mute !`);
        });
    }
});

bot.login('NDcyNzk1MDkyNzUxNzQ1MDM0.Dj4kvw.L_VZj43hzAucepoL1Gbh0avXWC8');