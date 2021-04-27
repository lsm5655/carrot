const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const dongProvider = require("./dongProvider");
const dongDao = require("./dongDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createDong = async function (dongname) {
    try {

        const insertDongParams = [dongname];

        const connection = await pool.getConnection(async (conn) => conn);

        const dongResult = await dongDao.insertDong(connection, insertDongParams);
        console.log(`추가된 동이름 : ${dongResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createDong Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.createActiveDong = async function (userId, range, location) {
    try {

        const insertDongParams = [userId, range, location];
        const dongInfoRows = await dongProvider.dongCheck(userId);

        if(dongInfoRows.length == 1){
            if(dongInfoRows[0].activeLocation == location){
                return errResponse(baseResponse.REDUNDANT_DONGNAME)
            }
        } else if(dongInfoRows.length == 2) {
            return errResponse(baseResponse.DONGNAME_NUMBER_WRONG)
        }

        const connection = await pool.getConnection(async (conn) => conn);

        const dongResult = await dongDao.insertActiveDong(connection, insertDongParams);
        console.log(`추가된 동이름 : ${dongResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createDong Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.deleteActiveDong = async function (userId, dongname) {
    try {

        const deleteDongParams = [userId, dongname];
        // const dongInfoRows = await dongProvider.dongCheck(userId);

        // for(var i=0; i<dongInfoRows.length; i++)
        // {
        //     if (dongInfoRows[i].status === "INACTIVE") {
        //         return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        //     } else if (dongInfoRows[i].status === "DELETED") {
        //         return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        //     }
        // }
        const connection = await pool.getConnection(async (conn) => conn);

        const dongResult = await dongDao.deleteActiveDong(connection, deleteDongParams);
        console.log(`삭제 완료`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createDong Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};