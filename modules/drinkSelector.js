var drinkList = require('../models/drink_list');

function _getRandomDrink() {

    // Get a random number.
    var maxNum = drinkList.length - 1;
    var randomNum = Math.floor(Math.random() * maxNum);

    console.log(drinkList[randomNum].name);
    return drinkList[randomNum].name;
};

module.exports = _getRandomDrink;