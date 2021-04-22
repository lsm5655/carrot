module.exports = function(app){
    const interestGoods = require('./interestController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 관심상품 생성 API
    app.post('/app/interestgoods/:userId', jwtMiddleware, interestGoods.postInterestgoods);

    // 2. 특정 유저 관심상품 목록 조회 API
    app.get('/app/interestgoods/:userId', jwtMiddleware,interestGoods.getInterestGoodsById); 

    // 3. 관심상품 삭제 API
    app.put('/app/interestgoods/:userId', jwtMiddleware, interestGoods.deleteInterestGoodsByID);

};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API