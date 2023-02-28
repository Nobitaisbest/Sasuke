const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const {  getCurrencyData } = require('../../MongoDb/mongo')
module.exports = {
  name: 'redeems',
  description: "shows how many redeems you have",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction) => { 
  let data = await getCurrencyData(interaction.user.id)

    let redeems = data.redeems
    let shards = data.shards
    let embed = new EmbedBuilder()
      .setColor('NotQuiteBlack')
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
      .setFields({ name: "Redeems", value: `**${parseInt(redeems)}**` , inline: true },
                { name: "Shards", value: `**${parseInt(shards)}**` , inline: true })
      .setThumbnail(interaction.user.displayAvatarURL())
      .setFooter({ text: "Bot developed by 《☆ Nobita ☆》#8773 and Naruto Uzumaki#1353" })
      .setTimestamp()
    await interaction.reply({ embeds: [embed] })
  }
}

