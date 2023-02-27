const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = {
  name: 'shop',
  description: "shows the shop of the items",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction) => {
    console.log("test")
    let embed = new EmbedBuilder()
      .setColor('NotQuiteBlack')
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
      .setTitle('SASUKE bot shop - ')
      .setFields({ name: "redeem", value: "200 shards" },
        { name: "shards", value: "50 coins" })
      .setThumbnail(interaction.user.displayAvatarURL())
      .setFooter({ text: "Bot developed by 《☆ Nobita ☆》#8773 and Naruto Uzumaki#1353" })
      .setTimestamp()
    await interaction.reply({ embeds: [embed] })
    console.log("test2")
  }
}

