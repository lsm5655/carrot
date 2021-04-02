const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const noticeProvider = require("./noticeProvider");
const noticeDao = require("./noticeDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

//알림 생성
exports.createNotice = async function (userId, type) {
    try {
        
        const insertNoticeInfoParams = [userId, type];

        const connection = await pool.getConnection(async (conn) => conn);

        const noticeResult = await noticeDao.insertNoticeInfo(connection, insertNoticeInfoParams);
        console.log(`추가된 회원 : ${noticeResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createNotice Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 가격제안 삭제
exports.deleteNotice = async function (noticeId) {
    try {

        const deleteNoticeParams = [noticeId];

        const connection = await pool.getConnection(async (conn) => conn);

        const deleteNoticeResult = await noticeDao.deleteNotice(connection, deleteNoticeParams);
        console.log(`삭제 성공`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - deleteGoods Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}