module.exports = function(app){
    const dong = require('./dongController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 6. 동 생성 API
    app.post('/app/dong', dong.postDong);

    // 7. 유저가 사는 동 생성 API
    app.post('/app/activedong/:userId', jwtMiddleware, dong.postActiveDong);

    // 8. 유저가 사는 동 삭제 API
    app.put('/app/activedong/:userId',jwtMiddleware, dong.deleteActiveDongById); 

    // 9. 특정 유저 동 조회 API
    app.get('/app/activedong/:userId', jwtMiddleware, dong.getDongById);

    // 10. 전체 동 조회 API
    app.get('/app/dong', dong.getDong);

    // // 5. 특정 유저 수정 API
    // app.put('/app/users/:userId', user.putUsers);

};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API