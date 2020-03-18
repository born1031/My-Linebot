var foodList = require('../models/food_list');

function _getRandomFood(type) {
    var foodType = type;
    var tempList = foodList.filter(foodList => foodList.type.indexOf(foodType) >= 0);

    // Get a random number.
    var maxNum = tempList.length - 1;
    var randomNum = Math.floor(Math.random() * maxNum);

    console.log(tempList[randomNum].name);
    return tempList[randomNum].name;
};

module.exports = _getRandomFood;