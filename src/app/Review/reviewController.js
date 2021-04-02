const jwtMiddleware = require("../../../config/jwtMiddleware");
const reviewProvider = require("../Review/reviewProvider");
const reviewService = require("../Review/reviewService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 32
 * API Name : 후기 생성 API
 * [POST] /app/review
 */

exports.postReview = async function (req, res) {

    /**
     * Body: userId, goodsId, content
     */
    const {userId, goodsId, content} = req.body;

    // 빈 값 체크
    if (!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
        
    if (!goodsId)
        return res.send(response(baseResponse.GOODS_GOODSID_EMPTY));

    if (!content)
            return res.send(response(baseResponse.GOODS_GOODSID_EMPTY));

    const signUpResponse = await reviewService.createReview(
        userId, goodsId, content
    )

    return res.send(signUpResponse);
 }



/**
 * API No. 33
 * API Name : 후기 조회 API 
 * [GET] /app/review/:userId
 */
exports.getReviewById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const reviewByIdResult = await reviewProvider.retrieveReviewById(userId);
    return res.send(response(baseResponse.SUCCESS, reviewByIdResult));
    
};

/**
 * API No. 34
 * API Name : 후기 삭제 API
 * [DELETE] /app/review/{reviewId}
 */

exports.deleteReviewByID = async function (req, res) {

    const reviewId = req.params.reviewId;

    if (!reviewId) return res.send(errResponse(baseResponse.REVIEW_ID_EMPTY));

    const ReviewById = await reviewService.deleteReview(reviewId);
    return res.send(response(baseResponse.SUCCESS, ReviewById));
 }

