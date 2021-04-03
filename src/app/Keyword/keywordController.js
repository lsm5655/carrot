const jwtMiddleware = require("../../../config/jwtMiddleware");
const keywordProvider = require("../Keyword/keywordProvider");
const keywordService = require("../Keyword/keywordService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 29
 * API Name : 키워드 생성 API
 * [POST] /app/keyword
 */

exports.postKeyword = async function (req, res) {

    /**
     * Body: userId, keyword
     */
    const {userId, keyword} = req.body;

    // 빈 값 체크
    if (!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
        
    if (!keyword)
        return res.send(response(baseResponse.KEYWORD_NAME_EMPTY));

    const signUpResponse = await keywordService.createKeyword(
        userId, keyword
    )

    return res.send(signUpResponse);
 }



/**
 * API No. 30
 * API Name : 키워드 조회 API 
 * [GET] /app/priceoffer/:userId
 */
exports.getKeywordById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const keywordByIdResult = await keywordProvider.retrieveKeywordById(userId);
    return res.send(response(baseResponse.SUCCESS, keywordByIdResult));
    
};

/**
 * API No. 31
 * API Name : 키워드 삭제 API
 * [DELETE] /app/priceoffer/{userId}
 */

exports.deleteKeywordByID = async function (req, res) {

    const keywordId = req.params.keywordId;

    if (!keywordId) return res.send(errResponse(baseResponse.KEYWORD_ID_EMPTY));

    const KeywordById = await keywordService.deleteKeyword(keywordId);
    return res.send(response(baseResponse.SUCCESS, KeywordById));
 }

