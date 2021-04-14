const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");
var request = require("request");
const { logger } = require("../../../config/winston");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
// exports.getTest = async function (req, res) {
//     return res.send(response(baseResponse.SUCCESS))
// }

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: phonenum, nickname
     */
    const {phonenum, nickname} = req.body;

    // 빈 값 체크
    if (!phonenum)
        return res.send(response(baseResponse.SIGNUP_PHONENUM_EMPTY));

    // 길이 체크
    if (phonenum.length != 11)
        return res.send(response(baseResponse.SIGNUP_PHONENUM_LENGTH));

    // 형식 체크 (by 정규표현식)
    // if (!regexEmail.test(email))
    //     return res.send(response(baseResponse.SIGNUP_PHONENUM_ERROR_TYPE));

    // 기타 등등 - 추가하기


    const signUpResponse = await userService.createUser(
        phonenum,
        nickname
    );

    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 번호로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {

    /**
     * Query String: email
     */
    const phonenum = req.query.phonenum;

    if (!phonenum) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList();
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 유저 검색 조회
        
        const userListByPhonenum = await userProvider.retrieveUserList(phonenum);
        console.log(userListByPhonenum)
        return res.send(response(baseResponse.SUCCESS, userListByPhonenum));
    }
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const userByUserId = await userProvider.retrieveUser(userId);
    
    return res.send(response(baseResponse.SUCCESS, userByUserId));
};

/**
 * API No. 4
 * API Name : 특정 유저 삭제 API
 * [DELETE] /app/users/{userId}
 */

 exports.deleteUserByID = async function (req, res) {

    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const userByUserId = await userService.deleteUser(userId);
    return res.send(response(baseResponse.SUCCESS, userByUserId));
 }


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    // TODO: email, password 형식적 Validation

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
exports.patchUsers = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const nickname = req.body.nickname;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
};

exports.putUsers = async function (req, res) {

    const userId = req.params.userId;
    const nickname = req.body.nickname;

    if(!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

    const editUserInfo = await userService.editUser(userId, nickname)
    return res.send(editUserInfo);
}


exports.kakaoLogin = async function (req, res){
    const {access_token} = req.body;
    const options = {
        uri : "https://kapi.kakao.com/v2/user/me",
        method : 'GET',
        headers:{
            Authorization: `Bearer ${access_token}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        json:true
    }
    if(!access_token) {
        res.json({
            isSuccess: false,
            code: 2000,
            message:"kakaoToken을 입력해주세요"
        });
    }
    try{
        request(options, function(err, Response,body){
            console.log(body);
        })
    }
    

    catch (err){
        console.log(`App - kakaoLogin Query error\n: ${err}}`);
    }
}

// exports.getCode = async function(req, res) {
//     const {code} = req.query;

//     try{
//         const result = await request({
//             method: 'POST',
//             uri: 'https://kauth.kakao.com/oauth/token',
//             body: {
//                 code: 'Rxfl-nIoxFQ85nKhlJw2RkSvF55-iuAbzPByXpsfWZepU4Z0chusSd_yV4DzkN5t7biMgo9cuoAAAF4xgdI_w',
//                 grant_type: 'authorization_code',
//                 clientId: '80ab2b284163f57133dfdaabd2089d87',
//                 redirect_uri: 'http://localhost:3000/auth/oauth',
//                 client_secret: '7Ws1H3SmvqbldlQu091cRbgwiSZ50SmI'
//             },
//             json: true
//         })
//     }
//     catch (err) {
//         console.log('App - getCode Query error\n: ${JSON.stringify(err)}');
//     }
// }










/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
