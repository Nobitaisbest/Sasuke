const { getCharacterDataByNumber , updateSelectedCharacter } =require('../sasque-botv1/MongoDb/mongo');
const userId = '825997320238661657'; // Replace with the actual user ID
const characterNumber = 4; // Replace with the number of the character you want to get
async function hello(){
const characterData = await getCharacterDataByNumber(userId, characterNumber);
if (characterData) {
  console.log(`Name: ${characterData.name}`);
  console.log(`Level: ${characterData.level}`);
  console.log(`XP: ${characterData.xp}`);
  console.log(`Selected character: ${characterData.Selected_character}`);
} else {
  console.log('Character not found');
}
}
await updateSelectedCharacter(userId , characterNumber)
// getcharacterInfo('《☆ Nobita ☆》#8773' , 'Naruto')