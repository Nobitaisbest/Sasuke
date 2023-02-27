const { getCharacterDataByNumber } =require('../../MongoDb/mongo');
const {ApplicationCommandType, ApplicationCommandOptionType,  EmbedBuilder} = require('discord.js')
module.exports = {
	name: 'info',
	description: "info",
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
    const characterData = await getCharacterDataByNumber(userId, characterNumber);
    console.log(`Name: ${characterData.name}`);
  console.log(`Level: ${characterData.level}`);
  console.log(`XP: ${characterData.xp}`);
  console.log(`Selected character: ${characterData.Selected_character}`);
if (characterData) {
  const embed = new EmbedBuilder()
	  .setTitle('character info')
		.setDescription(`Info about number u gave:-` + channel)
    .setFields({
      name: "Name",
      value: `${characterData.name}`
    },
        {
      name: "level",
      value: `${characterData.level}`
    },
                {
      name: "xp",
      value: `${characterData.xp}`
    }, 
    { name:'Selected_character',
               value:characterData.Selected_character || 'undefined'
               }
              )
		.setColor('NotQuiteBlack')
		.setTimestamp()
		.setThumbnail(client.user.displayAvatarURL())
		.setFooter({ text: 'Bot made by 《☆ Nobita ☆》#8773 and Uzumaki Naruto#5410' })

		interaction.reply({ embeds: [embed]})
} else {
  interaction.reply("no data found about you :(")
  console.log('Character not found');
}	
	}
};
