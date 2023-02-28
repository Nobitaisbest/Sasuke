const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const {  getCurrencyData } = require('../../MongoDb/mongo')
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = {
  name: 'bal',
  description: "shows balance of your account",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction) => { 
  let data = await getCurrencyData(interaction.user.id)

    let coins = data.coins
    let shards = data.shards
    let embed = new EmbedBuilder()
      .setColor('NotQuiteBlack')
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
      .setFields({ name: "Coins", value: `${parseInt(coins)}` , inline: true },
        { name: "shards", value: `${parseInt(shards)}` , inline: true })
      .setThumbnail(interaction.user.displayAvatarURL())
      .setFooter({ text: "Bot developed by 《☆ Nobita ☆》#8773 and Naruto Uzumaki#1353" })
      .setTimestamp()
    await interaction.reply({ embeds: [embed] })
  }
}

