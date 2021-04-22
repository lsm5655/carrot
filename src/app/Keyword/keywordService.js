const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const keywordProvider = require("./keywordProvider");
const keywordDao = require("./keywordDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

//키워드 생성
exports.createKeyword = async function (userId, keyword) {
    try {
        const keywordInfoRows = await keywordProvider.retrieveKeywordById(userId);

        for (var i=0; i<keywordInfoRows.length; i++){
            if(keywordInfoRows[i].keyword_name == keyword){
                return errResponse(baseResponse.REDUNDANT_KEYWORDNAME)
            }
        }
        
        const insertKeywordParams = [userId, keyword];

        const connection = await pool.getConnection(async (conn) => conn);

        const keywordResult = await keywordDao.insertKeyword(connection, insertKeywordParams);
        console.log(`추가된 회원 : ${keywordResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createKeyword Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


// 키워드 삭제
exports.deleteKeyword = async function (userId, keyword) {
    try {

        const deleteKeywordParams = [userId, keyword];

        const connection = await pool.getConnection(async (conn) => conn);

        const KeywordResult = await keywordDao.deleteKeyword(connection, deleteKeywordParams);
        console.log(`삭제 성공`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - deleteKeyword Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}