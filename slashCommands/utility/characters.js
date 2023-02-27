const { ApplicationCommandType, ApplicationCommandOptionType,  EmbedBuilder } = require('discord.js');
const { getCharacterData } = require('../../MongoDb/mongo');

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
      const emojis = ['<:uzumaki:1076361276739039282>', '<:sasuke:1076363943934701618>', '🍟', '🥤', '🍺', '🥨'];
      let index = 1;
      let names = data.name.split(',').map((name, idx) => {
        const emoji = emojis[idx % emojis.length];
        return `${emoji} ${name}`;
      }).join('\n');
      const embed = new EmbedBuilder()
        .setAuthor({ name: interaction.user.tag + "'s characters", iconURL: interaction.user.displayAvatarURL() })
        .setColor('NotQuiteBlack')
        .setThumbnail(interaction.user.displayAvatarURL())
        .setFields({ name: 'Characters', value: `\n${names}\n` });

      await sleep(1000);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.editReply("You dont have any data\n pls use /register to register");
    }
  }
};
