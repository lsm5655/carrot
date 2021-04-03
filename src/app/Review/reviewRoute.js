module.exports = function(app){
    const review = require('./reviewController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 후기 생성 API
    app.post('/app/review', review.postReview);

    // 2. 후기 조회 API
    app.get('/app/review/:userId',review.getReviewById); 

    // 3. 후기 삭제 API
    app.delete('/app/review/:reviewId', review.deleteReviewByID);

};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API