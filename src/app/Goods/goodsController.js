const jwtMiddleware = require("../../../config/jwtMiddleware");
const goodsProvider = require("../Goods/goodsProvider");
const goodsService = require("../Goods/goodsService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");
const compression = require("compression");

/**
 * API No. 18
 * API Name : 카테고리 생성 API
 * [POST] /app/goods
 */

exports.postGoods = async function (req, res) {

    /**
     * Body: userId, userlocationId, categoryId, goodsTitle, price, isPriceOffer, content
     */

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const {userlocationId, categoryId, goodsTitle, price, isPriceOffer, content, fileLink} = req.body;

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

    if (!fileLink)
        return res.send(response(baseResponse.GOODS_FILELINK_EMPTY));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const goodsResponse = await goodsService.createGoods(
            userId, userlocationId, categoryId, goodsTitle, price, isPriceOffer, content, fileLink
        );
        return res.send(goodsResponse);
    }
    // const goodsInfo = await goodsProvider.retrieveGoodsByUserId(userId);
    
    // const goodsImgResponse = await goodsService.createGoodsImg(
    //     goodsInfo[0].idx, fileLink
    // );
 }

/**
 * API No. 
 * API Name : 상품 이미지 생성 API
 * [POST] /app/goodsimg
 */

exports.postGoodsImg = async function (req, res) {

    /**
     * Body: goodsId, fileLink
     */
    const {goodsId, fileLink} = req.body;

    // 빈 값 체크
    if (!goodsId)
        return res.send(response(baseResponse.GOODS_GOODSID_EMPTY));
    
    if (!fileLink)
        return res.send(response(baseResponse.GOODS_FILELINK_EMPTY));

    const goodsImgResponse = await goodsService.createGoodsImg(
        goodsId, fileLink
    );

    return res.send(goodsImgResponse);
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
    const goodsViewResult = await goodsProvider.retrieveGoodsView(goodsId);
    const goodsFilelinkResult = await goodsProvider.retrieveGoodsFilelink(goodsId);

    return res.send(response(baseResponse.SUCCESS, [goodsByIdResult, goodsViewResult, goodsFilelinkResult]));
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
    // const goodsStatus = req.query.goodsStatus;
    // const page = req.query.page;
    // const pageSize = req.query.pageSize;

    const {goodsStatus, page, pageSize} = req.query

    if(!page || !pageSize){
        return res.send(errResponse(baseResponse.GOODS_PAGE_EMPTY));
    }

    if (!goodsStatus) {
        // 상품 전체 조회
        const goodsListResult = await goodsProvider.retrieveGoodsList(page, pageSize);
        return res.send(response(baseResponse.SUCCESS, goodsListResult));
    } else {
        // 상품 판매내역에 따라 조회
        const goodsListByGoodsStatus = await goodsProvider.retrieveGoodsStatus(goodsStatus, page, pageSize);
        return res.send(response(baseResponse.SUCCESS, goodsListByGoodsStatus));
    }
};

/**
 * API No. 20
 * API Name : 판매내역 조회 API
 * [GET] /app/goodsList
 */
exports.getGoodsListByUser = async function (req, res) {

    /**
     * Query String: goodsStatus
     */
    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const goodsStatus = req.query.goodsStatus;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!goodsStatus) {
            // 상품 전체 조회
            const goodsListResult = await goodsProvider.retrieveGoodsListByUser(userId);
            return res.send(response(baseResponse.SUCCESS, goodsListResult));
        } else {
            // 상품 판매내역에 따라 조회
            const goodsListByGoodsStatus = await goodsProvider.retrieveGoodsListByUser(userId, goodsStatus);
            return res.send(response(baseResponse.SUCCESS, goodsListByGoodsStatus));
        }
    }
    

    
};

/**
 * API No. 21
 * API Name : 상품 삭제 API
 * [PUT] /app/goods/{goodsId}
 */

exports.deleteGoodsByID = async function (req, res) {
    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const goodsId = req.body.goodsId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!goodsId) return res.send(errResponse(baseResponse.GOODS_GOODSID_EMPTY));

        const goodsById = await goodsService.deleteGoods(userId, goodsId);
        return res.send(response(baseResponse.SUCCESS, goodsById));
    }

 }

