// const { Intents, EmbedBuilder , AttachmentBuilder } = require('discord.js');
// const client = require("..")
// const mongoose = require('mongoose');
// const Jimp = require('jimp');

// mongoose.connect('link', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// module.exports = 
// setInterval(async () => {
//   const channel = await client.channels.cache.get('1070991436910182450');

//   const characterSchema = new mongoose.Schema({
//     name: String,
//     avatarSrc: String,
//     village: String,
//     rank: String,
//     description: String
//   });
//   const kageModel = mongoose.model('images');
//   const geninModel = mongoose.model('genins');
//   const joninModel = mongoose.model('jonins');
//   const chuninModel = mongoose.model('chuunins');
//   const kages = await kageModel.find();
//   const genins = await geninModel.find();
//   const jonins = await joninModel.find();
//   const chuunins = await chuninModel.find();

//   const characters = [...genins, ...jonins, ...chuunins , ...kages];
//   const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

  
// const buffer = await Jimp.read(randomCharacter.avatarSrc);
// const resizedBuffer = await buffer.resize(800, 600).quality(90).getBufferAsync(Jimp.MIME_JPEG);
//   const attachment = new AttachmentBuilder(resizedBuffer, {name: 'image.jpg'});
//   const embed = new EmbedBuilder()
//     .setTitle(`New Character has spawned`)
//     .setDescription("use .c to catch the character")
//     .setImage(`attachment://image.jpg`)
//     .setColor("#0099ff");

//   console.log(randomCharacter.name)
//   channel.send({ embeds: [embed] , files:[attachment] });
// }, 15000);
// client.on('messageCreate' , async (message) =>{
//     const kageModel = mongoose.model('images');
//   const geninModel = mongoose.model('genins');
//   const joninModel = mongoose.model('jonins');
//   const chuninModel = mongoose.model('chuunins');
//   const kages = await kageModel.find();
//   const genins = await geninModel.find();
//   const jonins = await joninModel.find();
//   const chuunins = await chuninModel.find();
  
//   if (message.content.startsWith('.c')) {
//   const args = message.content.slice(2).trim().split(/ +/);
//   const name = args.join(' ');
//   if (name === randomCharacter.name) {
//     message.send(`${message.author} caught ${name}!`);
//   }
// }
// })
