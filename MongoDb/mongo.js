const mongoose = require('mongoose');
const fs = require('fs')
const { EmbedBuilder, InteractionCollector } = require('discord.js');
// Connection URL
const url = process.env.URI;

// Define a character schema
const characterSchema = new mongoose.Schema({
  username: String,
  name: String,
  id: String,
  xp: { type: Number, default: 100 },
  level: { type: Number, default: 1 },
  Selected_character: { type: Number, default: 1 },
  Selected_character_moves: String,
  coins: { type: Number, default: 1000 },
  shards: { type: Number, default: 50 },
  redeems: { type: Number, default: 0 }
});
// Create a Character model from the schema
const Character = mongoose.model('Character', characterSchema);
async function getInfo(userid){
  try {
     const characters = await Character.find({ id: userid });
    const character = characters;
    const characterData = {
      username: character.username,
      name: character.name,
      id: character.id,
      xp: character.xp,
      level: character.level,
      coins: character.coins,
      shards: character.shards,
      redeems: character.redeems,
    };
    return characterData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
async function getCharacterDataByNumber(userId, characterNumber) {
  try {
    await mongoose.connect(process.env.URI);
    mongoose.set('strictQuery', true);

    const characters = await Character.find({ id: userId });
    const characterIndex = characterNumber - 1;

    if (characterIndex < 0 || characterIndex >= characters.length) {
      return null;
    }
    const character = characters[characterIndex];
    const characterData = {
      username: character.username,
      name: character.name,
      id: character.id,
      xp: character.xp,
      level: character.level,
      coins: character.coins,
      shards: character.shards,
      redeems: character.redeems,
    };
    return characterData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
async function updateSelectedCharacter(userId, characterName) {
  try {
    const user = await Character.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.selected_character = characterName;
    await user.save();
    console.log(`Selected character updated for user ${userId}`);
  } catch (error) {
    console.error(`Error updating selected character: ${error.message}`);
  }
}
async function getCurrencyData(userId) {
  try {
    

    const characters = await Character.find({ id: userId });

    const currencyData = {
      coins: characters[0].coins,
      shards: characters[0].shards,
      redeems: characters[0].redeems,
    };
    return currencyData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  getCharacterData: async function(userId) {
    try {
    

      const characters = await Character.find({ id: userId });

      let names = '';
      characters.forEach((character, index) => {
        const name = `${index + 1}.${character.name}\n`;
        names += name;
      });
      const namesWithNewlines = names.replace(/,/g, '\n');

      const characterData = {
        username: characters[0].username,
        name: namesWithNewlines,
        id: characters[0].id,
        xp: characters[0].xp,
        level: characters[0].level,
        Selected_character: characters[0].Selected_character
      };
      return characterData;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  addchar: async function(user, user_id) {
   console.log("hi")
    // mongoose.connect(url)
        const character = new Character({ username: user, name: 'Naruto', id: user_id , level: 1 });
        character.save()
        
            console.log('Character saved successfully');
            mongoose.disconnect();
            // Write data to file
            const data = `{
          username: ${user},
          user_id:  ${user_id}\n
          }`;
            fs.appendFile('data.txt', data, (err) => {
              if (err) throw err;
              console.log('Data written to file');
            });
          
         
      
     
  },
  deleteDoc: async function(user) {
    Character.deleteMany({ id: user }).then(function() {
      console.log("Data deleted"); // Success
    }).catch(function(error) {
      console.log(error); // Failure
    });
  },
  updateSelectedCharacter,
  getCharacterDataByNumber,
  getInfo,
  getCurrencyData
};
