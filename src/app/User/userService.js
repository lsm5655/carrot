const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");


// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createUser = async function (phonenum, nickname) {
    try {
        // 번호 중복 확인
        const phoneumRows = await userProvider.phonenumCheck(phonenum);
        if (phoneumRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_PHONENUM);

        // 비밀번호 암호화
        // const hashedPassword = await crypto
        //     .createHash("sha512")
        //     .update(password)
        //     .digest("hex");

        const insertUserInfoParams = [phonenum, nickname];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


// TODO: After 로그인 인증 방법 (JWT)
exports.postSignIn = async function (phonenum) {
    try {
        // 이메일 여부 확인
        const phonenumRows = await userProvider.phonenumCheck(phonenum);
        if (phonenumRows.length < 1) return errResponse(baseResponse.SIGNIN_PHONENUM_EMPTY);

        const selectPhonenum = phonenumRows[0].phonenum

        // 비밀번호 확인
        // const hashedPassword = await crypto
        //     .createHash("sha512")
        //     .update(password)
        //     .digest("hex");

        const selectUserPasswordParams = [selectPhonenum];
        // const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams);

        // if (passwordRows[0].password !== hashedPassword) {
        //     return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        // }

        // 계정 상태 확인
        const userInfoRows = await userProvider.accountCheck(phonenum);

        if (userInfoRows[0].status === "INACTIVE") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (userInfoRows[0].status === "DELETED") {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }

        console.log(userInfoRows[0].idx) // DB의 userId

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userId: userInfoRows[0].idx,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "userInfo",
            } // 유효 기간 365일
        );

        return response(baseResponse.SUCCESS, {'userId': userInfoRows[0].idx, 'jwt': token});

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.editUser = async function (id, nickname) {
    try {
        console.log(id)
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserResult = await userDao.updateUserInfo(connection, id, nickname)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.deleteUser = async function (id) {
    try {
        // ID로 회원 조회
        const userIdRows = await userProvider.retrieveUser(id);
        if (userIdRows.length == 0)
            return errResponse(baseResponse.USER_USERID_NOT_EXIST);

        // 상태 조회
        const userInfoRows = await userProvider.accountCheck(phonenum);

        if (userInfoRows[0].status === "INACTIVE") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (userInfoRows[0].status === "DELETED") {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }

        const deleteUserInfoParams = [id];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.deleteUserInfo(connection, deleteUserInfoParams);
        console.log(`삭제 성공`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


exports.createAuthnum = async function (phonenum, authnum) {
    try {
        // 인증번호 중복 확인

        const authnumRows = await userProvider.authnumCheck(phonenum);
        if (authnumRows.length > 0){
            const updateAuthMsgParams = [authnum, phonenum];

            const connection = await pool.getConnection(async (conn) => conn);

            const authnumResult = await userDao.updateAuthnum(connection, updateAuthMsgParams);
            console.log(`인증번호 업데이트 성공`)
            connection.release();
            return response(baseResponse.SUCCESS);
        }
        else {
            const insertAuthMsgParams = [phonenum, authnum];

            const connection = await pool.getConnection(async (conn) => conn);

            const authnumResult = await userDao.insertAuthnum(connection, insertAuthMsgParams);
            console.log(`인증번호 생성 성공`)
            connection.release();
            return response(baseResponse.SUCCESS);
        }

    } catch (err) {
        logger.error(`App - createAuthnum Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.createAuthnumEmail = async function (sendEmail, authnum) {
    try {
        // 인증번호 중복 확인

        const authnumRows = await userProvider.authnumEmailCheck(sendEmail);
        if (authnumRows.length > 0){
            const updateAuthMsgParams = [authnum, sendEmail];

            const connection = await pool.getConnection(async (conn) => conn);

            const authnumResult = await userDao.updateAuthnumEmail(connection, updateAuthMsgParams);
            console.log(`인증번호 업데이트 성공`)
            connection.release();
            return response(baseResponse.SUCCESS);
        }
        else {
            const insertAuthMsgParams = [sendEmail, authnum];

            const connection = await pool.getConnection(async (conn) => conn);

            const authnumResult = await userDao.insertAuthnumEmail(connection, insertAuthMsgParams);
            console.log(`인증번호 생성 성공`)
            connection.release();
            return response(baseResponse.SUCCESS);
        }

    } catch (err) {
        logger.error(`App - createAuthnum Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};