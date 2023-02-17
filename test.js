const { getCharacterData } = require('../sasque-botv1/MongoDb/mongo');

async function someFunction() {
  let characters = await getCharacterData('825997320238661657');
  if (characters) {
    let charac  = characters.forEach(character => {
      for(let i =0;i<character.length;++i) {
        let names = character.name.split(',');
        let numberedNames = names.map((name, index) => {
          return `${i}.${name.trim()}`;
        }).join('\n');
        console.log(numberedNames);
      }
    });
    }  
}
someFunction();
