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

exports.createGoods = async function (userId, userlocationId, categoryId, goodsTitle, price, isPriceOffer, content, fileLink) {
    const insertGoodsInfoParams = [userId, userlocationId, categoryId, goodsTitle, price, isPriceOffer, content];

    const connection = await pool.getConnection(async (conn) => conn);
    try {
        
        await connection.beginTransaction()

        const goodsResult = await goodsDao.insertGoodsInfo(connection, insertGoodsInfoParams);
        console.log(`추가된 상품 : ${JSON.stringify(goodsResult)}`)
        const goodsIdinfo = goodsResult.insertId;
        const fileLinkinfo = fileLink;
        const goodsimgResult = await goodsDao.insertGoodsImgInfo(connection, goodsIdinfo, fileLinkinfo);
        await connection.commit()
        console.log(`추가된 이미지 : ${JSON.stringify(goodsimgResult)}`);
        
        return response(baseResponse.SUCCESS);
        

    } catch (err) {
        logger.error(`App - createGoods Service error\n: ${err.message}`);
        await connection.rollback()
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release()
    }
};

exports.createGoodsImg = async function (goodsId, fileLink) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);

        console.log(goodsId, fileLink);

        const goodsResult = await goodsDao.insertGoodsImgInfo(connection, goodsId, fileLink);
        console.log(`추가된 이미지 : ${goodsResult}`);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createGoodsimg Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 상품 삭제
exports.deleteGoods = async function (userId, goodsId) {
    try {
        // ID로 상품 조회
        const goodsIdRows = await goodsProvider.selectGoodsByuserId(userId, goodsId);
       
        if (goodsIdRows[0].status === "deleted"){
                return errResponse(baseResponse.GOODS_USER_NOT_MATCH)
            }
        

        const deleteGoodsInfoParams = [goodsId];

        const connection = await pool.getConnection(async (conn) => conn);

        const goodsIdResult = await goodsDao.deleteGoodsInfo(connection, deleteGoodsInfoParams);
        console.log(`삭제 성공`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - deleteGoods Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}