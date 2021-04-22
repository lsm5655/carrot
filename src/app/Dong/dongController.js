const jwtMiddleware = require("../../../config/jwtMiddleware");
const dongProvider = require("../../app/Dong/dongProvider");
const dongService = require("../../app/Dong/dongService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const {emit} = require("nodemon");

/**
 * API No. 6
 * API Name : 동 생성 API
 * [POST] /app/dong
 */
exports.postDong = async function (req, res) {

    /**
     * Body: dongname
     */
    const {dongname} = req.body;

    // 빈 값 체크
    if (!dongname)
        return res.send(response(baseResponse.DONGNAME_EMPTY));

    const signUpResponse = await dongService.createDong(
        dongname
    );

    return res.send(signUpResponse);
};

/**
 * API No. 7
 * API Name : 유저가 사는 동 생성 API
 * [POST] /app/activedong/:userId
 */
exports.postActiveDong = async function (req, res) {

    /**
     * Body: activeRange, activeLocation
     */
    const {range, location} = req.body;

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId;

    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        // 빈 값 체크

        if (!range)
            return res.send(response(baseResponse.RANGE_EMPTY));

        if (!location)
        return res.send(response(baseResponse.DONGNAME_EMPTY));


        const signUpResponse = await dongService.createActiveDong(
            userId,
            range,
            location
        );

        return res.send(signUpResponse);
        };
    }
    
    



/**
 * API No. 8
 * API Name : 동 삭제 API
 * [DELETE] /app/activedong/:userId
 */
exports.deleteActiveDongById = async function (req, res) {

    /**
     * params : userId
     */
    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const dongname = req.body.dongname

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    if (!dongname) return res.send(errResponse(baseResponse.DONGNAME_EMPTY));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const activedongByUserId = await dongService.deleteActiveDong(userId, dongname);
        return res.send(response(baseResponse.SUCCESS, activedongByUserId));
    }
    
};


/**
 * API No. 9
 * API Name : 특정 유저 동 조회 API
 * [GET] /app/activedong/:userId
 */

exports.getDongById = async function (req, res) {

    /**
     * params : userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const activedongByUserId = await dongProvider.retrieveDong(userId);
    return res.send(response(baseResponse.SUCCESS, activedongByUserId));
};



/**
 * API No. 10
 * API Name : 전체 동 조회 API
 * [GET] /app/dong
 */

exports.getDong = async function (req, res) {

    /**
     * Query String: dongname
     */
    const dongname = req.query.dongname;

    if (!dongname) {
        // 동 전체 조회
        const dongListResult = await dongProvider.retrieveDongList();
        return res.send(response(baseResponse.SUCCESS, dongListResult));
    } else {
        // 동이름 검색 조회
        const dongListByName = await dongProvider.retrieveDongList(dongname);
        return res.send(response(baseResponse.SUCCESS, userListByName));
    }
};
