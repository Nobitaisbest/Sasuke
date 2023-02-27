const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to the database
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));


const Character = mongoose.model('Character');
client.on('messageCreate', async message => {
  // Ignore messages sent by the bot itself or by other bots
  if (message.author.bot) {
    return;
  }

  try {
    // Get the character of the user who sent the message
    const userId = message.author.id;
    const character = await Character.findOne({ id: userId });
    if (!character) {
      console.log(`Character not found for user ${userId}`);
      return;
    }

    // Update the XP of the selected character
    const xpToAdd = Math.floor(Math.random() * 20) + 1;
    const characterIndex = character.selected_character - 1;
    if (characterIndex < 0 || characterIndex >= character.characters.length) {
      console.log(`Invalid character index ${characterIndex} for user ${userId}`);
      return;
    }

    character.characters[characterIndex].xp += xpToAdd;
    console.log(`Added ${xpToAdd} XP to character ${characterIndex + 1} for user ${userId}`);

    // Check if the character has reached the XP threshold for the next level
    if (character.characters[characterIndex].xp >= 50) {
      // Reset the XP of the character and increase the level
      character.characters[characterIndex].xp = 0;
      character.characters[characterIndex].level++;
      console.log(`Character ${characterIndex + 1} for user ${userId} leveled up to ${character.characters[characterIndex].level}`);
    }

    // Save the updated character back to the database
    await character.save();
  } catch (error) {
    console.error(error);
  }
});
