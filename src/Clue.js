import fetch from 'cross-fetch';
// import data from '../src/data';

var fetchData;
fetch('https://fe-apps.herokuapp.com/api/v1/gametime/1903/jeopardy/data')
  .then(function(response) {
    return response.json()
  })
  .then(function(parsedData) {
    fetchData = parsedData.data
  })
  .catch(err => console.error(err));

class Clue {
  constructor(data) {
    this.data = fetchData || data;
    this.randomCategoryNums = [];
    this.randomCategoryNames;
    this.usedCategories = [];
    this.randomClues = [];
    this.categoryClues;
  }

  selectRandomCategories() {
    for (var i = 0; i <= 4; i++) {
      let num = Math.floor(Math.random() * 10) + 1;
      if (this.randomCategoryNums.indexOf(num) === -1) {
        this.randomCategoryNums.push(num);
      }
    }
  }

  getCategoryName() { 
    let result = this.randomCategoryNums.map(category => {
      return Object.keys(this.data.categories).find(key => this.data.categories[key] === category);
    });
    this.randomCategoryNames = result;
  }

  
  findCluesForACategory() {
    return this.randomCategoryNums.map(category => {
      let result = this.data.clues.reduce((acc, clue) => {
        if (clue.categoryId === category) {
          acc.push(clue);
        }
        return acc.filter((clue, index, final) => {
          return final.map(mapClue => mapClue['pointValue']).indexOf(clue['pointValue']) === index;
        });
      }, []);
      this.categoryClues = result;
    });
  }

  findCluesByPointValue() {
    

  }
  

  populateBoard() {
    //create method to randomize categoryID - 4 #s correlate to in the clues and pointValue
  // then we need one random clue with each pointValue per category 
  //populateBoard

  }


}

export default Clue;