const mongoose = require('mongoose');
const { EmbedBuilder, InteractionCollector} = require('discord.js');
// Connection URL
const url = process.env.URI;

// Define a character schema
const characterSchema = new mongoose.Schema({
  username: String,
  name: String,
  id: String,
});

// Create a Character model from the schema
const Character = mongoose.model('Character', characterSchema);
module.exports = Character;
// Connect to MongoDB
async function addchar(user,user_id) {
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    
    // Generate a random ID using the random module
    

    // Create a new character object
    const character = new Character({ username: user,  name: 'Naruto', id: user_id });

    // Save the character to the database
    character.save()
      .then(() => {
        console.log('Character saved successfully');
        mongoose.disconnect();
      })
      .catch((err) => {
        console.error('Error saving character:', err);
        mongoose.disconnect();
      });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
}
let username,name,id; 
module.exports={addchar}
module.exports = {
  getCharacterData: async function(userId) {
    try {
      await mongoose.connect('mongodb+srv://18:18@cluster1.beqhfeo.mongodb.net/?retryWrites=true&w=majority');
      mongoose.set('strictQuery', true);

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
        id: characters[0].id
      };
      return characterData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};
;

