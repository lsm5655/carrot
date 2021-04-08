const jwtMiddleware = require("../../../config/jwtMiddleware");
const categoryProvider = require("../Category/categoryProvider");
const categoryService = require("../Category/categoryService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");

//////////////
/**
 * API No. 11
 * API Name : 전체 카테고리 조회 API (+ 번호로 검색 조회)
 * [GET] /app/category
 */
exports.getCategory = async function (req, res) {

    const categoryListResult = await categoryProvider.retrieveCategoryList();
    return res.send(response(baseResponse.SUCCESS, categoryListResult));
    
};

/**
 * API No. 12
 * API Name : 특정 카테고리 글 조회 API
 * [GET] /app/category/{categoryId}
 */
exports.getCategoryById = async function (req, res) {

    /**
     * Path Variable: categoryId
     */
    const categoryId = req.params.categoryId;

    if (!categoryId) return res.send(errResponse(baseResponse.CATEGORY_CATEGORYID_EMPTY));

    const goodsByCategoryId = await categoryProvider.retrieveCategoryById(categoryId);
    return res.send(response(baseResponse.SUCCESS, goodsByCategoryId));
};

/**
 * API No. 13
 * API Name : 카테고리 생성 API
 * [POST] /app/category
 */

 exports.postCategory = async function (req, res) {

    /**
     * Body: categoryname
     */
    const {categoryname} = req.body;

    // 빈 값 체크
    if (!categoryname)
        return res.send(response(baseResponse.CATEGORY_CATEGORYNAME_EMPTY));


    const signUpResponse = await categoryService.createCategory(
        categoryname
    );

    return res.send(signUpResponse);
 }


/**
 * API No. 14
 * API Name : 특정 카테고리 삭제 API
 * [DELETE] /app/category/{categoryId}
 */

exports.deleteCategoryByID = async function (req, res) {

    const categoryId = req.params.categoryId;

    if (!categoryId) return res.send(errResponse(baseResponse.CATEGORY_CATEGORYID_EMPTY));

    const categoryById = await categoryService.deleteCategory(categoryId);
    return res.send(response(baseResponse.SUCCESS, categoryById));
 }

