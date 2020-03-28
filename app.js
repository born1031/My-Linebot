var linebot = require('linebot');   // import linebot SDK
var msgHandler = require('./modules/message_handler');

// Line Channel information
var bot = linebot({
    channelId: '1653936288',
    channelSecret: '9914a93854b110443120b46240eae039',
    channelAccessToken: '72jIJyLaqwIKgS5XDmxFx++2s2lcMQXp9ARTPBC7BeHRlObrN7swCwwfJPDcso6nr94n5F3EbXkDCPhWD4325w4fBkRyvYL5I0Uq7bJiOz+Yeiof37Hi4WYZpzoIThvUW+zCppKpLF5pGmIoQ6phjwdB04t89/1O/w1cDnyilFU='
});

// Convert port
var server = bot.listen('/linewebhook', process.env.PORT || 3000, function () {
    console.log('BOT is running on prot : ' + server.address().port);
    console.log('[BOT has been ready.]');
});

// Message event
bot.on('message', function (event) {

    // Print out the event information on log
    console.log(event);
    
    // Process the messages by message_handler
    msgHandler(event);
});

// Follow event
bot.on('follow', function (event) {
    // Print out the event information on log
    console.log(event);
});

// Unfollow event
bot.on('unfollow', function (event) {
    // Print out the event information on log
    console.log(event);
});

// Join event
bot.on('join', function (event) {
    // Print out the event information on log
    console.log(event);
});

// Leave event
bot.on('leave', function (event) {
    // Print out the event information on log
    console.log(event);
});

// Member join event
bot.on('memberJoined', function (event) {
    // Print out the event information on log
    console.log(event);
});

// Member leave event
bot.on('memberLeft', function (event) {
    // Print out the event information on log
    console.log(event);
});

/*
    There's more events like Postback, Beacon, Account link, Device link, Device unlink, LINE Things scenario execution on https://developers.line.biz/en/reference/messaging-api/#common-properties
*/