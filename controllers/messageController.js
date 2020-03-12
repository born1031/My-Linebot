const options = [
    
];


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
            case 'Hello': 
                event.source.profile().then(function(profile){
                    // anserMsg.push('Hello ' + profile.displayName + '，我能幫你什麼忙嗎？');
                    event.reply(['Hello ' + profile.displayName + '，我能幫你什麼忙嗎？', '這是第二句話']);
                });
                return;
            case '重複我說的話':
                anserMsg.push(receivedMsg);
                break;
            default:
                anserMsg.push('不知道"' + receivedMsg + '"是什麼意思？');
        };

        // Reply message to chat room.
        event.reply(anserMsg).then(function(data){
            // success
            console.log(msg);
        }).catch(function(err){
            // error
            console.log('error');
        });
    };
};

module.exports = _anser;