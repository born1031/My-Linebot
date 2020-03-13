const msgOptions = '飲料喝什麼？';

const emoji_wink = String.valueof(Character.toChars(0x10000C));

function _anser(event){

    // Reply message when message type is text.
    if(event.message.type = 'text'){
    
        // Received message.
        var receivedMsg = event.message.text;

        // Using for reply.
        var anserMsg = [];

        switch(receivedMsg){
            case '嗨':
            case '哈囉':
            case '你好':
            case '妳好':
            case '您好':
            case 'Hello': 
                event.source.profile().then(function(profile){
                    event.reply(receivedMsg + ' ' + profile.displayName + '，有什麼我可以幫忙的嗎？、\n輸入”指令清單“可以看看有什麼是我能幫到你的喔' + emoji_wink);
                }).catch((err) => {
                    // error handling
                    console.log('error!');
                });
                break;
            case '重複我說的話':
                event.reply(receivedMsg).then(() => {
                    // success
                    console.log('reply successful.');
                }).catch((err) => {
                    // error handling
                    console.log('error!');
                });
                break;
            default:
                event.reply('不知道"' + receivedMsg + '"是什麼意思？\n您可以輸入“服務清單”來顯示指令與相對應的服務喔' + emoji_wink).then(() => {
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

module.exports = _anser;