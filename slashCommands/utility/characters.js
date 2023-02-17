const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
let { getCharacterData } = require('../../MongoDb/mongo');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  name: 'characters',
  description: "Shows your characters",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction) => {
    try {
      interaction.reply("Getting data");
      const user = interaction.user.id;
      let data = await getCharacterData(user);

      let index = 1

      const embed = new EmbedBuilder()
        .setAuthor({ name: interaction.user.tag + "'s characters", iconURL: interaction.user.displayAvatarURL() })
        .setColor('NotQuiteBlack')
        .setThumbnail(interaction.user.displayAvatarURL())
        .setFields({name:'Characters', value: `\`\`\`js\n${index++,data.name}\n\`\`\``})

      await sleep(1000);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.editReply("Failed to get data");
    }
  }
};
