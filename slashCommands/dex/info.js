let uri = "mongodb+srv://18:18@sample.xprpqqd.mongodb.net/?retryWrites=true&w=majority"
const mongoose = require('mongoose')
mongoose.connect(uri)
mongoose.set('strictQuery', true);
const characterSchema = new mongoose.Schema({
  name: String,
  avatarSrc: String,
  village: String,
  rank: String,
  description: String
});

const genins = mongoose.model('genins', characterSchema);
const jonins = mongoose.model('jonins', characterSchema);
const images = mongoose.model('images', characterSchema);
const chuunins = mongoose.model('chuunins', characterSchema);

const {ApplicationCommandType,ApplicationCommandOptionType,EmbedBuilder} = require("discord.js")
module.exports = {
	name: 'character-info',
	description: "get any character info",
	cooldown: 3000,
    options:[{
name: "name",
description: 'name of the character',
required: true,
type: ApplicationCommandOptionType.String
}],
	run: async (client, interaction) => {
    let characterName = interaction.options.getString('name')
const userId = interaction.user.id; // Replace with the actual user ID
    let geninModel = mongoose.model('genins');
let kageModel = mongoose.model('images');
let joninModel = mongoose.model('jonins');
let chuninModel = mongoose.model('chuunins');

    let embed;
   try {
      const [geninResult, chuninResult, joninResult, kageResult] = await Promise.all([
        geninModel.findOne({ name: { $regex: characterName, $options: 'i' } }),
        chuninModel.findOne({ name: { $regex: characterName, $options: 'i' } }),
        joninModel.findOne({ name: { $regex: characterName, $options: 'i' } }),
        kageModel.findOne({ name: { $regex: characterName, $options: 'i' } })
      ]);
     if (geninResult) {
    embed = new EmbedBuilder()
     .setAuthor({name: interaction.user.username , iconURL: interaction.user.displayAvatarURL()})
     .setFields({name: "name:" , value: geninResult.name },
     {name: "village:" , value: geninResult.village },
     {name: "rank:" , value: geninResult.rank},
     {name: "description:" , value: geninResult.description },
     )
     .setImage(geninResult.avatarSrc)
     .setTimestamp()
      } else if (chuninResult) {
        embed = new EmbedBuilder()
     .setAuthor({name: interaction.user.username , iconURL: interaction.user.displayAvatarURL()})
     .setFields({name: "name:" , value: chuninResult.name },
     {name: "village:" , value: chuninResult.village },
     {name: "rank:" , value: chuninResult.rank},
     {name: "description:" , value: chuninResult.description },
     )
     .setImage(chuninResult.avatarSrc)
     .setTimestamp()
      } else if (joninResult) {
        embed = new EmbedBuilder()
        .setAuthor({name: interaction.user.username , iconURL: interaction.user.displayAvatarURL()})
        .setFields({name: "name:" , value: joninResult.name },
        {name: "village:" , value: joninResult.village },
        {name: "rank:" , value: joninResult.rank},
        {name: "description:" , value: joninResult.description },
        )
        .setImage(joninResult.avatarSrc)      }
         else if (kageResult) {
            embed = new EmbedBuilder()
            .setAuthor({name: interaction.user.username , iconURL: interaction.user.displayAvatarURL()})
            .setFields({name: "name:" , value: kageResult.name },
            {name: "village:" , value: kageResult.village },
            {name: "rank:" , value: kageResult.rank},
            {name: "description:" , value: kageResult.description },
            )
            .setImage(kageResult.avatarSrc)       } 
         else {
        interaction.reply(`Character ${characterName} not found.`);
      }
    } catch (error) {
      console.error(error);
      interaction.reply('An error occurred while searching for the character.');
    }
    await interaction.reply({embeds:[embed]})
  }
	}