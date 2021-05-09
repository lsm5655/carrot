module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
    // app.get('/app/test', user.getTest)

    // 1. 유저 생성 (회원가입) API
    app.post('/app/users', user.postUsers);

    // 2. 유저 조회 API (+ 검색)
    app.get('/app/users',user.getUsers); 

    // 3. 특정 유저 조회 API
    app.get('/app/users/:userId', user.getUserById);

    // 4. 프로필 조회 API
    app.get('/app/profile/:userId', jwtMiddleware, user.getProfileById);

    // 5. 특정 유저 삭제 API
    app.put('/app/users/:userId', jwtMiddleware, user.deleteUserByID);

    // 6. 카카오 로그인 API
    app.get('/kakao/login', user.kakaoLogin);

    // 7. 인증번호 생성&전송 API
    app.post('/app/msg', user.postVerifyCode);

    // 8. 인증번호 검증 API
    app.get('/app/msg', user.authnumcheck);

    // 9. 푸쉬알람 API
    app.get('/app/push', user.pushAlarm);

    // 7. 코드 API
    //app.get('/auth/oauth', user.getCode);

    // TODO: After 로그인 인증 방법 (JWT)
    // 로그인 하기 API (JWT 생성)
    app.post('/app/login', user.login);

    // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
    app.patch('/app/users/:userId', jwtMiddleware, user.patchUsers)



};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API