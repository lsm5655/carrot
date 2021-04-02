module.exports = function(app){
    const chatroom = require('./chatroomController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 후기 생성 API
    app.post('/app/chatroom', chatroom.postChatroom);

    // 2. 후기 조회 API
    app.get('/app/chatroom/:userId',chatroom.getChatroomById); 

    // 3. 후기 삭제 API
    app.delete('/app/chatroom/:keywordId', chatroom.deleteChatroomByID);

};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API