var express = require('express');
const linebot = require('./line_bot');
const linebotParser = linebot.parser();
const app = express();

linebot._bot();
app.post('/', linebotParser);

// Convert port for heroku
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log('App now running on port: ' + port);
});