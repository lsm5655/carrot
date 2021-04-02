const jwtMiddleware = require("../../../config/jwtMiddleware");
const interestProvider = require("../InterestGoods/interestProvider");
const interestService = require("../InterestGoods/interestService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");



/**
 * API No. 15
 * API Name : 관심상품 생성 API
 * [POST] /app/InterestGoods
 */

exports.postInterestgoods = async function (req, res) {

    /**
     * Body: userIdx, goodsIdx
     */
    const {userIdx, goodsIdx} = req.body;

    // 빈 값 체크
    if (!userIdx)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    if (!goodsIdx)
        return res.send(response(baseResponse.GOODS_GOODSID_EMPTY));


    const signUpResponse = await interestService.createInterestgoods(
        userIdx,
        goodsIdx
    );

    return res.send(signUpResponse);
 }


/**
 * API No. 16
 * API Name : 특정 유저 관심상품 조회 API
 * [GET] /app/category/{userId}
 */
exports.getInterestGoodsById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const InterestGoodsById = await interestProvider.retrieveInterestGoodsById(userId);
    return res.send(response(baseResponse.SUCCESS, InterestGoodsById));
};


/**
 * API No. 17
 * API Name : 관심상품 삭제 API
 * [DELETE] /app/category/{userId}
 */

exports.deleteInterestGoodsByID = async function (req, res) {

    const userId = req.params.userId;
    const goodsId = req.body.goodsId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    if (!goodsId) return res.send(errResponse(baseResponse.GOODS_GOODSID_EMPTY))

    const interestGoodsById = await interestService.deleteInterestgoods(userId, goodsId);
    return res.send(response(baseResponse.SUCCESS, interestGoodsById));
 }

