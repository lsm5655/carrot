const jwtMiddleware = require("../../../config/jwtMiddleware");
const offerProvider = require("../Priceoffer/offerProvider");
const offerService = require("../Priceoffer/offerService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 23
 * API Name : 가격제안 생성 API
 * [POST] /app/priceoffer/:userId
 */

exports.postPriceoffer = async function (req, res) {

    /**
     * Body: userId, price, goodsId
     */
    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const {price, goodsId} = req.body;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        // 빈 값 체크
        if (!price)
        return res.send(response(baseResponse.GOODS_PRICE_EMPTY));

        if (!goodsId)
            return res.send(response(baseResponse.GOODS_GOODSID_EMPTY));

        const offerResponse = await offerService.createPriceoffer(
            userId, price, goodsId
        )

        return res.send(offerResponse);
    }


    
 }



/**
 * API No. 24
 * API Name : 가격제안 조회 API 
 * [GET] /app/priceoffer/:userId
 */
exports.getPriceofferById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const priceofferByIdResult = await offerProvider.retrievePriceofferById(userId);
        return res.send(response(baseResponse.SUCCESS, priceofferByIdResult));
    }
    
    
};

/**
 * API No. 25
 * API Name : 가격제안 수정 API
 * [PUT] /app/priceoffer/:userId
 */
//  exports.putPriceofferById = async function (req, res) {

//     /**
//      * Path Variable: userId
//      * Body : goodsId, price
//      */
//     const userId = req.params.userId;
//     const {price, goodsId} = req.body;

//     if(!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

//     const editPriceofferInfo = await offerService.editPriceoffer(userId, price, goodsId)
//     return res.send(editPriceofferInfo);
    
// };

/**
 * API No. 26
 * API Name : 가격제안 삭제 API
 * [DELETE] /app/priceoffer/{userId}
 */

exports.deletePriceofferByID = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const goodsId = req.body.goodsId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!goodsId) return res.send(errResponse(baseResponse.GOODS_GOODSID_EMPTY));

        const PriceofferById = await offerService.deletePriceoffer(userId, goodsId);
        return res.send(response(baseResponse.SUCCESS, PriceofferById));
    }
    
    
 }

