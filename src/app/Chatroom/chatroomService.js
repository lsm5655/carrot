const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const chatroomProvider = require("./chatroomProvider");
const chatroomDao = require("./chatroomDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

//후기 생성
exports.createChatroom = async function (goodsId, buyerId) {
    try {
        
        const insertChatroomParams = [goodsId, buyerId];

        const connection = await pool.getConnection(async (conn) => conn);

        const chatroomResult = await chatroomDao.insertChatroom(connection, insertChatroomParams);
        console.log(`추가된 회원 : ${chatroomResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createChatroom Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


// 가격제안 삭제
exports.deleteChatroom = async function (chatroomId) {
    try {

        const deleteChatroomParams = [chatroomId];

        const connection = await pool.getConnection(async (conn) => conn);

        const ChatroomResult = await chatroomDao.deleteChatroom(connection, deleteChatroomParams);
        console.log(`삭제 성공`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - deleteChatroom Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}