module.exports = function(app){
    const notice = require('./noticeController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 알림 생성 API
    app.post('/app/notice', notice.postNotice);

    // 2. 알림 조회 API
    app.get('/app/notice/:userId', jwtMiddleware, notice.getNoticeById); 

    // 3. 알림 삭제 API
    app.delete('/app/notice/:noticeId', notice.deleteNoticeById);

};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API