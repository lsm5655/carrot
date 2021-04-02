module.exports = function(app){
    const category = require('./categoryController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 전체 카테고리 조회 API
    app.get('/app/category', category.getCategory);

    // 2. 특정 카테고리 글 조회 API
    app.get('/app/category/:categoryId',category.getCategoryById); 

    // 3. 카테고리 생성 API
    app.post('/app/category', category.postCategory);

    // 4. 카테고리 삭제 API
    app.delete('/app/category/:categoryId', category.deleteCategoryByID);

    // // 5. 특정 유저 수정 API
    // app.put('/app/users/:userId', user.putUsers);

    // // TODO: After 로그인 인증 방법 (JWT)
    // // 로그인 하기 API (JWT 생성)
    // app.post('/app/login', user.login);

    // // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
    // app.patch('/app/users/:userId', jwtMiddleware, user.patchUsers)



};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API