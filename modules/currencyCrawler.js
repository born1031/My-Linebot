var request = require('request');
var cheerio = require('cheerio');
var currencyList = require('../models/testCurrencyList');


function _getCurrencyRate(infoArray, callback){
    
    // pepar information for target.
    var targetClass = _getClassByRateType(infoArray[0]);
    var targetCurrency = _getIndexOfCurrency(infoArray[1]);

    console.log(targetClass, targetCurrency);

    if(!targetClass || !targetCurrency){
        callback(-1);
    };

    // Get the web information by request.
    request({
        url: 'https://rate.bot.com.tw/xrt?Lang=zh-TW',
        method: 'GET'
    }, function(error, response, body){
        if(error || !body){
            callback(error);
        }else{
            // Load body for cheerio to fetch data.
            var bodyInfo = cheerio.load(body);
            var target = bodyInfo(targetClass);
            
            var value = target[targetCurrency].children[0].data;
            console.log(value);
            callback(value);
        };
    });
};

function _getClassByRateType(rateType){
    
    if(rateType == '即期匯率查詢'){
        return ".rate-content-sight.text-right.print_hide";
    }else if(rateType == '現金匯率查詢'){
        return ".rate-content-cash.text-right.print_hide";
    }
    return false;
};

function _getIndexOfCurrency(currency_name){
    
    var currrncyIndex = currencyList.find((item) => {
        return item.ch_tw == currency_name;
    });

    if(currrncyIndex == undefined){
        return false;
    }else{
        return currrncyIndex.index*2-1;
    };
};

module.exports = _getCurrencyRate;