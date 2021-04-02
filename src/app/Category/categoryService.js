const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const categoryProvider = require("./categoryProvider");
const categoryDao = require("./categoryDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createCategory = async function (categoryname) {
    try {
        // 이름 중복 확인
        const categorynameRows = await categoryProvider.categorynameCheck(categoryname);
        if (categorynameRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_CATEGORYNAME);
        
        const insertCategoryInfoParams = [categoryname];

        const connection = await pool.getConnection(async (conn) => conn);

        const categorynameResult = await categoryDao.insertCategoryInfo(connection, insertCategoryInfoParams);
        console.log(`추가된 회원 : ${categorynameResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createCategory Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 카테고리 삭제
exports.deleteCategory = async function (id) {
    try {
        // ID로 회원 조회
        const categoryIdRows = await categoryProvider.retrieveCategoryById(id);
        if (categoryIdRows.length == 0)
            return errResponse(baseResponse.CATEGORY_CATEGORYID_NOT_EXIST);

        const deleteCategoryInfoParams = [id];

        const connection = await pool.getConnection(async (conn) => conn);

        const categoryIdResult = await categoryDao.deleteCategoryInfo(connection, deleteCategoryInfoParams);
        console.log(`삭제 성공`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - deleteCategory Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}