var drinkList = require('../models/drink_list');

function _getRandomDrink(){
    
    // Get a random number.
    var maxNum = drinkList.length - 1;
    var randomNum = Math.floor(Math.random() * maxNum);
    
    return drinkList[randomNum].name;
};

module.exports = _getRandomDrink;