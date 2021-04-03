const jwtMiddleware = require("../../../config/jwtMiddleware");
const noticeProvider = require("../Notice/noticeProvider");
const noticeService = require("../Notice/noticeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 27
 * API Name : 알림 생성 API
 * [POST] /app/notice
 */

exports.postNotice = async function (req, res) {

    /**
     * Body: userId, type
     */
    const {userId, type} = req.body;

    // 빈 값 체크
    if (!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
        
    if (!type)
        return res.send(response(baseResponse.NOTICE_TYPE_EMPTY));

    const signUpResponse = await noticeService.createNotice(
        userId, type
    )

    return res.send(signUpResponse);
 }



/**
 * API No. 28
 * API Name : 알림 조회 API
 * [GET] /app/notice/:userId
 */
exports.getNoticeById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const noticeByIdResult = await noticeProvider.retrieveNoticeById(userId);
    return res.send(response(baseResponse.SUCCESS, noticeByIdResult));
    
};


/**
 * API No. 29
 * API Name : 알림 삭제 API
 * [DELETE] /app/notice/{noticeId}
 */

exports.deleteNoticeById = async function (req, res) {

    const noticeId = req.params.noticeId;

    if (!noticeId) return res.send(errResponse(baseResponse.NOTICE_ID_EMPTY));

    const NoticeById = await noticeService.deleteNotice(noticeId);
    return res.send(response(baseResponse.SUCCESS, NoticeById));
 }

