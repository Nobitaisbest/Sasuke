const { updateSelectedCharacter } =require('../../MongoDb/mongo');
const {ApplicationCommandType, ApplicationCommandOptionType,  EmbedBuilder} = require('discord.js')
module.exports = {
	name: 'select',
	description: "select",
	cooldown: 3000,
    options:[{
name: "number",
description: 'number',
required: true,
type: ApplicationCommandOptionType.Number
}],
	run: async (client, interaction) => {
const userId = interaction.user.id; // Replace with the actual user ID
    let channel = interaction.options.getNumber('number');
const characterNumber = channel; // Replace with the number of the character you want to get
    const characterData = updateSelectedCharacter(userId , channel)
if (characterData) {
  interaction.reply('Selected character is now' +"\t" + number)
} else {
  interaction.reply("no data found about you :(")
  console.log('Character not found');
}	
	}
};
