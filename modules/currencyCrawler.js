var request = require('request');
var cheerio = require('cheerio');
var currencyList = require('../models/currency_list');


function _getCurrencyRate(infoArray) {

    return new Promise((resolve, reject) => {

        // pepar information for target.
        let targetClass = _getClassByRateType(infoArray[0]);
        let targetCurrency = _getIndexOfCurrency(infoArray[1]);

        // Get the web information by request.
        request({
            url: 'https://rate.bot.com.tw/xrt?Lang=zh-TW',
            method: 'GET'
        }, function (error, response, body) {
            if (error || !body ) {
                reject(error);
            } else if(!targetClass || !targetCurrency){
                resolve(-1);
            }
            else{
                // Load body for cheerio to fetch data.
                let bodyInfo = cheerio.load(body);
                let target = bodyInfo(targetClass);
                let value = target[targetCurrency].children[0].data;
                resolve(value);
            };
        });
    });
};

function _getClassByRateType(rateType) {

    if (rateType == '即期匯率查詢') {
        return ".rate-content-sight.text-right.print_hide";
    } else if (rateType == '現金匯率查詢') {
        return ".rate-content-cash.text-right.print_hide";
    }
    return false;
};

function _getIndexOfCurrency(currency_name) {

    let currrncyIndex = currencyList.find((item) => {
        return item.ch_tw == currency_name;
    });

    if (currrncyIndex == undefined) {
        return false;
    } else {
        return currrncyIndex.index * 2 - 1;
    };
};

module.exports = _getCurrencyRate;