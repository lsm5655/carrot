const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const offerProvider = require("./offerProvider");
const offerDao = require("./offerDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

//가격제안 생성
exports.createPriceoffer = async function (userId, price, goodsId) {
    try {
        const offercheckRows = await offerProvider.offerCheck(connection, goodsId);

        if(offercheckRows[0].isPriceoffer == "NO"){
            return errResponse(baseResponse.ISPRICEOFFER_WRONG)
        }

        const insertPriceofferParams = [userId, price, goodsId];

        const connection = await pool.getConnection(async (conn) => conn);

        const priceofferResult = await offerDao.insertPriceoffer(connection, insertPriceofferParams);
        console.log(`추가된 회원 : ${priceofferResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createGoods Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//가격제안 수정
exports.editPriceoffer = async function (userId, price, goodsId) {
    try {
        console.log(userId)
        const connection = await pool.getConnection(async (conn) => conn);
        const editPriceofferResult = await offerDao.updatePriceoffer(connection, userId, price, goodsId)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editPriceoffer Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


// 가격제안 삭제
exports.deletePriceoffer = async function (userId, goodsId) {
    try {

        const deletePriceofferParams = [userId, goodsId];

        const connection = await pool.getConnection(async (conn) => conn);

        const PriceofferResult = await offerDao.deletePriceoffer(connection, deletePriceofferParams);
        console.log(`삭제 성공`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - deleteGoods Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}