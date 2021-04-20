module.exports = function(app){
    const goods = require('./goodsController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 상품 생성 API
    app.post('/app/goods', goods.postGoods);

    // 2. 특정 상품 글 조회 API
    app.get('/app/goods/:goodsId',goods.getGoodsById); 

    // 3. 상품 상태에 따른 글 목록 API
    app.get('/app/goodslist', goods.getGoodsList);

    // 4. 상품 삭제 API
    app.put('/app/goods/:userId',jwtMiddleware, goods.deleteGoodsByID);

    // 5. 상품 이미지 생성 API
    // app.post('/app/goodsimg', goods.postGoodsImg)
};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API