const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const goodsProvider = require("./goodsProvider");
const goodsDao = require("./goodsDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createGoods = async function (userId, userlocationId, categoryId, goodsTitle, price, isPriceOffer, content) {
    try {
        
        const insertGoodsInfoParams = [userId, userlocationId, categoryId, goodsTitle, price, isPriceOffer, content];

        const connection = await pool.getConnection(async (conn) => conn);

        const goodsResult = await goodsDao.insertGoodsInfo(connection, insertGoodsInfoParams);
        console.log(`추가된 회원 : ${goodsResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createGoods Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 카테고리 삭제
exports.deleteGoods = async function (goodsId) {
    try {
        // ID로 회원 조회
        const goodsIdRows = await goodsProvider.retrieveGoodsById(goodsId);
        if (goodsIdRows.length == 0)
            return errResponse(baseResponse.GOODS_GOODSID_NOT_EXIST);

        const deleteGoodsInfoParams = [goodsId];

        const connection = await pool.getConnection(async (conn) => conn);

        const categoryIdResult = await goodsDao.deleteGoodsInfo(connection, deleteGoodsInfoParams);
        console.log(`삭제 성공`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - deleteGoods Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}