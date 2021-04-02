const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const interestProvider = require("./interestProvider");
const interestDao = require("./interestDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

// 관심상품 생성
exports.createInterestgoods = async function (userIdx, goodsIdx) {
    try {
        
        const insertInterestGoodsParams = [userIdx, goodsIdx];

        const connection = await pool.getConnection(async (conn) => conn);

        const InterestgoodsResult = await interestDao.insertInterestGoods(connection, insertInterestGoodsParams);
        console.log(`추가된 회원 : ${InterestgoodsResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createInterestGoods Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 관심상품 삭제
exports.deleteInterestgoods = async function (userId, goodsId) {
    try {
        // ID로 회원 조회
        const interestGoodsuserIdRows = await interestProvider.searchInterestGoodsById(userId);
        if (interestGoodsuserIdRows.length == 0){
            return errResponse(baseResponse.USER_USERID_NOT_EXIST);
            }
        
        const interstGoodsRows = await interestProvider.searchInterestGoodsBygoodsId(goodsId);
            if(interstGoodsRows == 0) {
                return errResponse(baseResponse.GOODS_GOODSID_NOT_EXIST);
            }

        const deleteInterstGoodsParams = [userId, goodsId];

        const connection = await pool.getConnection(async (conn) => conn);

        const interestGoodsResult = await interestDao.deleteInterestGoods(connection, deleteInterstGoodsParams);
        console.log(`삭제 성공`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - deleteCategory Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}