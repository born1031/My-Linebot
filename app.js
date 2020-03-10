// Import linebot SDK
const linebot = require('linebot');

// Information for access Line Channel
var bot = linebot({
    channelId: '1653936288',
    channelSecret: '9914a93854b110443120b46240eae039',
    channelAccessToken: 'zURpT1GazPArNvwi4V0r41dFRSe9vhU48aQLqPxiBKOVxtJW/be9aViXod+XCv9Cr94n5F3EbXkDCPhWD4325w4fBkRyvYL5I0Uq7bJiOz/9G8pu90qAGo160ftuCwATlx78PNSHXYHibI42GrD8CwdB04t89/1O/w1cDnyilFU='
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