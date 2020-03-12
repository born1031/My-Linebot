const options = [
    
];


function _anser(event, userProfile){

    // Reply message when message type is text.
    if(event.message.type = 'text'){
        
        // Get user name.
        var userName = userProfile.displayName;

        // Received message.
        var receivedMsg = event.message.text;

        // Using for reply.
        var anserMsg = [];

        switch(receivedMsg){
            case '嗨':
            case '哈囉':
            case 'Hello': 
                anserMsg.push('Hello ' + userName + '，我能幫你什麼忙嗎？');
                break;
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