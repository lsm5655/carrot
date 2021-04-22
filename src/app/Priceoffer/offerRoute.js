module.exports = function(app){
    const offer = require('./offerController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 가격제안 생성 API
    app.post('/app/priceoffer/:userId', jwtMiddleware, offer.postPriceoffer);

    // 2. 가격제안 조회 API
    app.get('/app/priceoffer/:userId', jwtMiddleware, offer.getPriceofferById); 

    // 3. 가격제안 삭제 API
    app.put('/app/priceoffer/:userId', jwtMiddleware, offer.deletePriceofferByID);

};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API