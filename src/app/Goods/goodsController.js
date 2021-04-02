const jwtMiddleware = require("../../../config/jwtMiddleware");
const goodsProvider = require("../Goods/goodsProvider");
const goodsService = require("../Goods/goodsService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 18
 * API Name : 카테고리 생성 API
 * [POST] /app/goods
 */

exports.postGoods = async function (req, res) {

    /**
     * Body: userId, userlocationId, categoryId, goodsTitle, price, isPriceOffer, content
     */
    const {userId, userlocationId, categoryId, goodsTitle, price, isPriceOffer, content} = req.body;

    // 빈 값 체크
    if (!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    
    if (!userlocationId)
        return res.send(response(baseResponse.GOODS_SELLERLOCATIONID_EMPTY));

    if (!categoryId)
        return res.send(response(baseResponse.CATEGORY_CATEGORYID_EMPTY));
    
    if (!goodsTitle)
        return res.send(response(baseResponse.GOODS_GOODSTITLE_EMPTY));
        
    if (!price)
        return res.send(response(baseResponse.GOODS_PRICE_EMPTY));
    
    if (!isPriceOffer)
        return res.send(response(baseResponse.GOODS_ISPRICEOFFER_EMPTY));

    if (!content)
        return res.send(response(baseResponse.GOODS_CONTENT_EMPTY));

    const signUpResponse = await goodsService.createGoods(
        userId, userlocationId, categoryId, goodsTitle, price, isPriceOffer, content
    );

    return res.send(signUpResponse);
 }



/**
 * API No. 19
 * API Name : 상품 조회 API (+ 번호로 검색 조회)
 * [GET] /app/goods/:goodsId
 */
exports.getGoodsById = async function (req, res) {

    /**
     * Path Variable: goodsId
     */
    const goodsId = req.params.goodsId;

    if (!goodsId) return res.send(errResponse(baseResponse.GOODS_GOODSID_EMPTY));

    const goodsByIdResult = await goodsProvider.retrieveGoodsById(goodsId);
    return res.send(response(baseResponse.SUCCESS, goodsByIdResult));
    
};

/**
 * API No. 20
 * API Name : 글 목록 조회 API
 * [GET] /app/goodsList
 */
 exports.getGoodsList = async function (req, res) {

    /**
     * Query String: goodsStatus
     */
    const goodsStatus = req.query.goodsStatus;

    if (!goodsStatus) {
        // 유저 전체 조회
        const goodsListResult = await goodsProvider.retrieveGoodsList();
        return res.send(response(baseResponse.SUCCESS, goodsListResult));
    } else {
        // 유저 검색 조회
        const goodsListByGoodsStatus = await goodsProvider.retrieveGoodsList(goodsStatus);
        return res.send(response(baseResponse.SUCCESS, goodsListByGoodsStatus));
    }
};

/**
 * API No. 21
 * API Name : 상품 삭제 API
 * [DELETE] /app/goods/{goodsId}
 */

exports.deleteGoodsByID = async function (req, res) {

    const goodsId = req.params.goodsId;

    if (!goodsId) return res.send(errResponse(baseResponse.GOODS_GOODSID_EMPTY));

    const goodsById = await goodsService.deleteGoods(goodsId);
    return res.send(response(baseResponse.SUCCESS, goodsById));
 }

