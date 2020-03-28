var currency_crawler = require('../modules/currencyCrawler');
var drink_selectior = require('../modules/drinkSelector');
var food_selector = require('../modules/foodSelector');

// Service list.
var serviceList = [
    '飲料喝什麼？',
    '午餐吃什麼？',
    '晚餐吃什麼？',
    '即期匯率查詢：{中文或英文貨幣}',
    '現金匯率查詢：{中文或英文貨幣}',
];

// Line emoji.
const emoji_wink = '\uDBC0\uDC0C';
const emoji_jamesExhausted = '\uDBC0\uDC88';

// async function that return a promise.
async function _getReplyText(event) {

    // Received message.
    let receivedMsg = event.message.text;

    // message for reply.
    let replyMsg;

    // Check event message is currency rate service or not.
    let currencyServiceInfo = _isCurrencyService(receivedMsg);

    if (currencyServiceInfo != false) {
        receivedMsg = currencyServiceInfo[0];
    } else {
        receivedMsg = event.message.text;
    };

    switch (receivedMsg) {
        case '嗨':
        case '哈囉':
        case '你好':
        case '妳好':
        case '您好':
        case 'hi':
        case 'Hi':
        case 'Hello':
            let userInfo = await event.source.profile();
            replyMsg = ['您好 ' + userInfo.displayName + '，有什麼我可以幫忙的嗎？', '輸入 "指令清單" 可以看看有什麼是我能幫到你的喔' + emoji_wink];
            break;

        case '指令清單':
            replyMsg = '您可以輸入以下指令：\n';
            serviceList.forEach((options) => {
                replyMsg += (options + '\n');
            });
            break;

        case '飲料喝什麼？':
        case '飲料喝什麼':
            replyMsg = '這次推薦飲品店家為：' + drink_selectior();
            break;

        case '午餐吃什麼？':
        case '午餐吃什麼?':
        case '午餐吃什麼':
            replyMsg = '這次午餐推薦為：' + food_selector('午餐');
            break;

        case '晚餐吃什麼？':
        case '晚餐吃什麼?':
        case '晚餐吃什麼':
            replyMsg = '這次晚餐推薦為：' + food_selector('晚餐');
            break;

        case '即期匯率查詢':
        case '現金匯率查詢':
            let currencyNum = await currency_crawler(currencyServiceInfo);
            if (currencyNum instanceof Error) {
                return currencyNum;
            } else if (currencyNum === -1) {
                replyMsg = '很抱歉，取得不到' + currencyServiceInfo[1] + '的匯率喔' + emoji_jamesExhausted;
            } else {
                replyMsg = '目前' + currencyServiceInfo[1] + '的匯率為：' + currencyNum;
            };
            break;

        default:
            replyMsg = ['不知道 "' + receivedMsg + '" 是什麼意思？', '您可以輸入 "指令清單" 來顯示指令與相對應的服務喔' + emoji_wink];
    };

    return replyMsg;
};

/* 
Check that is currency service or not.
If yes, return an array with currency.
*/
function _isCurrencyService(msg) {

    let index_Of_Split;

    if (msg.indexOf(':') >= 0) {
        index_Of_Split = msg.indexOf(':');
    } else if (msg.indexOf('：') >= 0) {
        index_Of_Split = msg.indexOf('：');
    } else if (msg.indexOf(' ') >= 0) {
        index_Of_Split = msg.indexOf(' ');
    } else {
        return false;
    };

    let tempMsg = msg.split(msg.charAt(index_Of_Split));

    if (tempMsg[0] == '即期匯率查詢' || tempMsg[0] == '現金匯率查詢') {
        return tempMsg;
    } else {
        return false;
    };
};

module.exports = _getReplyText;