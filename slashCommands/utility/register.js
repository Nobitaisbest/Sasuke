const { ApplicationCommandType, ApplicationCommandOptionType,  EmbedBuilder} = require('discord.js');
const addchar = require('../../MongoDb/mongo.js').addchar
module.exports = {
	name: 'register',
	description: "Register to start a new journey",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client , interaction) => {
        console.log(interaction.constructor.name)
    const user = interaction.user;
    addchar(user.tag , user.id);
        const embed = new EmbedBuilder()
        .setTitle(`${user.tag} you are registered!`)
       .setColor('Fuchsia')
      .setTimestamp();
        
  interaction.reply({embeds:[embed]})
	}
};
