var textHandler = require('./text_handler');

var _messageHandler = function (event) {

    var willGetReplyMsg;

    // Process the message by type
    switch (event.message.type) {
        case 'text':
            willGetReplyMsg = textHandler(event);
            break;
        case 'image':
            break;
        case 'video':
            break;
        case 'audio':
            break;
        case 'file':
            break;
        case 'location':
            break;
        case 'sticker':
            break;
        default:
            break;
    };

    // reply message
    willGetReplyMsg.
        then(event.reply).
        then(() => {
            console.log('Reply message successful.');
        }).catch((err) => {
            console.log('Reply message failed.');
            console.log(err);
        });
};

module.exports = _messageHandler;