module.exports = function(app){
    const keyword = require('./keywordController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 키워드 생성 API
    app.post('/app/keyword', keyword.postKeyword);

    // 2. 키워드 조회 API
    app.get('/app/keyword/:userId',keyword.getKeywordById); 

    // 4. 키워드 삭제 API
    app.delete('/app/keyword/:keywordId', keyword.deleteKeywordByID);

};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API