var currency_crawler = require('../modules/currencyCrawler');

// Service list
var serviceList = [
    '飲料喝什麼？',
    '午餐吃什麼？',
    '晚餐吃什麼？',
    '即期匯率查詢：{中文或英文貨幣}',
    '現金匯率查詢：{中文或英文貨幣}',
];

var drinkStores = [];
var lunchStores = [];
var dinnerStores = [];

// Line emoji
const emoji_wink = '\uDBC0\uDC0C';
const emoji_jamesExhausted = '\uDBC0\uDC88';

function _anser(event){

    // Reply message when message type is text.
    if(event.message.type = 'text'){
        
        // Received message.
        var receivedMsg = event.message.text;

        // Check event message is currency rate service or not.
        var currencyServiceInfo = _isCurrencyService(receivedMsg);

        if(currencyServiceInfo != false){
            receivedMsg = currencyServiceInfo[0];
        }else{
            receivedMsg = event.message.text;
        };

        switch(receivedMsg){
            case '嗨':
            case '哈囉':
            case '你好':
            case '妳好':
            case '您好':
            case 'hi':
            case 'Hi':
            case 'Hello': 
                event.source.profile().then(function(profile){
                    event.reply(['您好 ' + profile.displayName + '，有什麼我可以幫忙的嗎？', '輸入 "指令清單" 可以看看有什麼是我能幫到你的喔' + emoji_wink]);
                }).catch((err) => {
                    // error handling
                    console.log('error!');
                });
                break;

            case '指令清單':
                var replyString = '您可以輸入以下指令：\n';

                serviceList.forEach((options) => {
                    replyString += (options + '\n');
                });

                event.reply(replyString).then(() => {
                    console.log('reply successful.');
                }).catch((err) => {
                    console.log('error!');
                });
                break;

            case '飲料喝什麼？':
            case '飲料喝什麼':
                break;

            case '午餐吃什麼？':
            case '午餐吃什麼':
                break;

            case '晚餐吃什麼？':
            case '晚餐吃什麼':
                break;

            case '即期匯率查詢':
            case '現金匯率查詢':
                currency_crawler(currencyServiceInfo, function(value){
                    if(value == -1){
                        var replyMsg = '輸入的格式有誤喔，請以下列示範在輸入一次\n即期匯率查詢：美金';
                    }else if(value == '-'){
                        var replyMsg = '很抱歉，目前取得不到 ' + currencyServiceInfo[1] + ' 的匯率喔' + emoji_jamesExhausted;
                    }else{
                        var replyMsg = '目前 ' + currencyServiceInfo[1] + ' 的匯率為：' + value;
                    };

                    event.reply(replyMsg).then(() => {
                        // success
                        console.log('reply successful.');
                    }).catch((err) => {
                        // error handling
                        console.log('error!');
                    });
                });
                break;

            default:
                event.reply(['不知道 "' + receivedMsg + '" 是什麼意思？', '您可以輸入 "指令清單" 來顯示指令與相對應的服務喔' + emoji_wink]).then(() => {
                    // success
                    console.log('reply successful.');
                }).catch((err) => {
                    // error handling
                    console.log('error!');
                });
                break;
        };
    };
};


/* 
Check that is currency service or not.
If yes, return an array with currency.
*/
function _isCurrencyService(msg){

    var index_Of_Split; 

    if(msg.indexOf(':') >= 0){
        index_Of_Split = msg.indexOf(':');
    }else if(msg.indexOf('：') >= 0){
        index_Of_Split = msg.indexOf('：');
    }else{
        return false;
    }; 

    var tempMsg = msg.split(msg.charAt(index_Of_Split));

    if(tempMsg[0] == '即期匯率查詢' || tempMsg[0] == '現金匯率查詢'){
        return tempMsg;
    }else{
        return false;
    };
};

module.exports = _anser;