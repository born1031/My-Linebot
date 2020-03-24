var linebot = require('linebot');
var messenger = require('./controllers/messageController');

var bot = linebot({
    channelId: '1653936288',
    channelSecret: '9914a93854b110443120b46240eae039',
    channelAccessToken: '72jIJyLaqwIKgS5XDmxFx++2s2lcMQXp9ARTPBC7BeHRlObrN7swCwwfJPDcso6nr94n5F3EbXkDCPhWD4325w4fBkRyvYL5I0Uq7bJiOz+Yeiof37Hi4WYZpzoIThvUW+zCppKpLF5pGmIoQ6phjwdB04t89/1O/w1cDnyilFU='
});

function _bot() {
    // User has sent message.
    bot.on('message', function (event) {
        // Print event.
        console.log(event);

        // Reply messages in messageController.
        messenger(event);
    });
};

module.exports = {
    parser: bot.parser,
    _bot: _bot
};