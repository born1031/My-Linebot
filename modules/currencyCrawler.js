var request = require('request');
var cheerio = require('cheerio');

var currencyList = [
    {
        ch_tw: '美金',
        en: 'USD',
        index: 1
    },
    {
        ch_tw: '港幣',
        en: 'HKD',
        index: 2
    },
    {
        ch_tw: '英鎊',
        en: 'GBP',
        index: 3
    },
    {
        ch_tw: '澳幣',
        en: 'AUD',
        index: 4
    },
    {
        ch_tw: '加拿大幣',
        en: 'CAD',
        index: 5
    },
    {
        ch_tw: '新加坡幣',
        en: 'SGD',
        index: 6
    },
    {
        ch_tw: '瑞士法郎',
        en: 'CHF',
        index: 7
    },
    {
        ch_tw: '日圓',
        en: 'JPY',
        index: 8
    },
    {
        ch_tw: '南非幣',
        en: 'ZAR',
        index: 9
    },
    {
        ch_tw: '瑞典幣',
        en: 'SEK',
        index: 10
    },
    {
        ch_tw: '紐元',
        en: 'NZD',
        index: 11
    },
    {
        ch_tw: '泰幣',
        en: 'THB',
        index: 12
    },
    {
        ch_tw: '菲國比索',
        en: 'PHP',
        index: 13
    },
    {
        ch_tw: '印尼幣',
        en: 'IDR',
        index: 14
    },
    {
        ch_tw: '歐元',
        en: 'EUR',
        index: 15
    },
    {
        ch_tw: '韓元',
        en: 'KRW',
        index: 16
    },
    {
        ch_tw: '越南盾',
        en: 'VND',
        index: 17
    },
    {
        ch_tw: '馬來幣',
        en: 'MYR',
        index: 18
    },
    {
        ch_tw: '人民幣',
        en: 'CNY',
        index: 19
    }
];

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