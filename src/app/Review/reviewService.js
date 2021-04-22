const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const reviewProvider = require("./reviewProvider");
const reviewDao = require("./reviewDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

//후기 생성
exports.createReview = async function (userId, goodsId, content) {
    try {
        const reviewCheckRows = await reviewProvider.reviewCheck(connection, userId);
        const reviewCheckRowsBygoodsId = await reviewProvider.reviewCheckBygoodsId(connection, userId, goodsId);
        
        if (!(reviewCheckRowsBygoodsId[0])) {
            return errResponse(baseResponse.REVIEW_CHATTING_WRONG);
        }

        for(var i=0; i < reviewCheckRows.length; i++){
            if(reviewCheckRows.goods_index == goodsId) {
                return errResponse(baseResponse.REDUNDANT_GOODSID);
            }
        }

        const insertReviewParams = [userId, goodsId, content];

        const connection = await pool.getConnection(async (conn) => conn);

        const reviewResult = await reviewDao.insertReview(connection, insertReviewParams);
        console.log(`추가된 회원 : ${reviewResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


// 가격제안 삭제
exports.deleteReview = async function (reviewId) {
    try {

        const deleteReviewParams = [reviewId];

        const connection = await pool.getConnection(async (conn) => conn);

        const ReviewResult = await reviewDao.deleteReview(connection, deleteReviewParams);
        console.log(`삭제 성공`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - deleteReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}