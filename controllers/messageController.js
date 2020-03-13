// Service list
var serviceList = [
    '飲料喝什麼？',
    '午餐吃什麼？',
    '晚餐吃什麼？',
    '幣值匯率查詢:{請輸入要查詢的幣值, example: 美金 or USD}',
];

var drinkStores = [];
var lunchStores = [];
var dinnerStores = [];

// Line emoji
const emoji_wink = '\uDBC0\uDC0C';

function _anser(event){

    // Reply message when message type is text.
    if(event.message.type = 'text'){
    
        // Received message.
        var receivedMsg = event.message.text;

        if(_isCurrencyService(receivedMsg)){

            var currency = _getCurrencyString(receivedMsg);
            console.log(currency);

        }else{

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
                        event.reply(['您好' + profile.displayName + '，有什麼我可以幫忙的嗎？', '輸入 "指令清單" 可以看看有什麼是我能幫到你的喔' + emoji_wink]);
                    }).catch((err) => {
                        // error handling
                        console.log('error!');
                    });
                    break;
                case '指令清單':
                    var replyString;

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
};

function _isCurrencyService(msg){
    var checkMsg;

    if(msg.indexOf(':') || msg.indexOf('：'))
    {
        var index_Of_Split = msg.indexOf(':') || msg.indexOf('：');
        console.log(index_Of_Split);
        checkMsg = msg.split(index_Of_Split);

        if(checkMsg[0] == '幣值匯率查詢'){
            return true;
        };
    };
    return false;
};

function _getCurrencyString(str){
    var tempStr = str.split(':');
    var currencyStr = tempStr[1];

    return currencyStr;
};

module.exports = _anser;