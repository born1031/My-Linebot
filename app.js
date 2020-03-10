// Import linebot SDK
const linebot = require('linebot');

// Information for access Line Channel
var bot = linebot({
    channelId: '1653936288',
    channelSecret: '9914a93854b110443120b46240eae039',
    channelAccessToken: '9914a93854b110443120b46240eae039'
});

// When receive messages
bot.on('message', function(event){

    // Message for relay.
    // 'event.message.text' is message from user to bot.
    var replyMsg = 'Hello！ 剛剛說的是：' + event.message.text;
    
    // Use 'event.reply' to reply message to user.
    event.reply(replyMsg).then(function(data){
        
        // Message reply successful.
        console.log('MESSAGE REPLIED.');

    }).catch(function(err){

        // Message reply fail.
        console.log('MESSAGE REPLY FAILED.');
    });
});

bot.listen('/linewebhook', 3000, function(){
    console.log('[BOT is ready]');
});