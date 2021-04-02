const jwtMiddleware = require("../../../config/jwtMiddleware");
const chatroomProvider = require("../Chatroom/chatroomProvider");
const chatroomService = require("../Chatroom/chatroomService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 35
 * API Name : 채팅방 생성 API
 * [POST] /app/chat
 */

exports.postChatroom = async function (req, res) {

    /**
     * Body: goodsId, buyerId
     */
    const {goodsId, buyerId} = req.body;

    // 빈 값 체크
    if (!goodsId)
        return res.send(response(baseResponse.GOODS_GOODSID_EMPTY));

    if (!buyerId)
            return res.send(response(baseResponse.USER_USERID_EMPTY));

    const signUpResponse = await chatroomService.createChatroom(
        goodsId, buyerId
    )

    return res.send(signUpResponse);
 }



/**
 * API No. 36
 * API Name : 채팅방 조회 API 
 * [GET] /app/chatroom/:userId
 */
exports.getChatroomById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const chatroomByIdResult = await chatroomProvider.retrieveChatroomById(userId);
    return res.send(response(baseResponse.SUCCESS, chatroomByIdResult));
    
};

/**
 * API No. 37
 * API Name : 채팅방 삭제 API
 * [DELETE] /app/chatroom/{reviewId}
 */

exports.deleteChatroomByID = async function (req, res) {

    const chatroomId = req.params.chatroomId;

    if (!chatroomId) return res.send(errResponse(baseResponse.CHATROOM_ID_EMPTY));

    const ChatroomById = await chatroomService.deleteChatroom(chatroomId);
    return res.send(response(baseResponse.SUCCESS, ChatroomById));
 }

