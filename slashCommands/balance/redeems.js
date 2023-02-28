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
      .setFields({ name: "Your Redeems", value: `**${parseInt(redeems)}**` , inline: true },
                { name: "Shards", value: `**${parseInt(shards)}**` , inline: true })
      .setDescription('You can use redeems to receive any character of your choice. You can receive redeems by purchasing them with shards or through voting rewards. \n Use a redeem [/redeemspawn] to spawn a character of your choice in the current channel (careful, if something else spawns, itll be overridden).')
      .setThumbnail(interaction.user.displayAvatarURL())
      .setFooter({ text: "Bot developed by 《☆ Nobita ☆》#8773 and Naruto Uzumaki#1353" })
      .setTimestamp()
    await interaction.reply({ embeds: [embed] })
  }
}

