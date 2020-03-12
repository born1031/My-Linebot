var linebot = require('linebot');
var express = require('express');
var messenger = require('./controllers/messageController');

var bot = linebot({
    channelId: '1653936288',
    channelSecret: '9914a93854b110443120b46240eae039',
    channelAccessToken: '72jIJyLaqwIKgS5XDmxFx++2s2lcMQXp9ARTPBC7BeHRlObrN7swCwwfJPDcso6nr94n5F3EbXkDCPhWD4325w4fBkRyvYL5I0Uq7bJiOz+Yeiof37Hi4WYZpzoIThvUW+zCppKpLF5pGmIoQ6phjwdB04t89/1O/w1cDnyilFU='
});

_bot();

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

// Convert port for heroku
var server = app.listen(process.env.PORT || 8080, function(){
    var port = server.address().port;
    console.log('App now running on port: ' + port);
});

function _bot() {
    // User has sent message.
    bot.on('message', function(event){
        // Print event.
        console.log(event);

        // Get user profile.
        var userProfile = bot.getUserProfile(event.source.useId);
        console.log('This is profile');
        console.log(userProfile);
        
        // Reply messages in messageController.
        messenger(event, userProfile);
    });
};