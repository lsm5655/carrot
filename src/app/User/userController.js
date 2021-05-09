const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");
var request = require("request");
const { logger } = require("../../../config/winston");

const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const SHA256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');

var regPhonenum =/(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
var regNickname= /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g; 

// push alarm

var admin = require("firebase-admin");

var serviceAccount = require("../../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

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
 
    if(!regPhonenum.test(phoneNum)){ 
        return res.send(baseResponse.SIGNUP_PHONENUM_ERROR_TYPE)
    } 

    if(nickname.length < 2 && nickname.length > 6) {
        return res.send(baseResponse.USER_NICKNAME_LENGTH)
    }

    if(!regNickname.test(nikcname)) {
        return res. send(baseResponse.USER_NICKNAME_TYPE)
    }


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
 * API Name : 프로필 조회 API
 * [GET] /app/profile/{userId}
 */
exports.getProfileById = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const getProfileInfo = await userProvider.getProfile(userId)
        return res.send(getProfileInfo);
    }
};



/**
 * API No. 4
 * API Name : 특정 유저 삭제 API
 * [DELETE] /app/users/{userId}
 */

 exports.deleteUserByID = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const deleteUserInfo = await userService.deleteUser(userId)
        return res.send(deleteUserInfo);
    }
 }


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {phonenum} = req.body;

    // TODO: email, password 형식적 Validation

    const signInResponse = await userService.postSignIn(phonenum);

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

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
};


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

exports.postVerifyCode = async function (req, res) {
    var phonenum = req.body.phonenum;
    var authnum = '';
	var resultCode = 404;

    for (let i=0; i<6; i++) {
        authnum += parseInt(Math.random() * 10);
    };

    console.log(authnum);

    if (!phonenum) return res.send(errResponse(baseResponse.SIGNUP_PHONENUM_EMPTY));
    
    const authByPhonenum = await userService.createAuthnum(phonenum, authnum);
    res.send(response(baseResponse.SUCCESS, authByPhonenum));  

    
    const date = Date.now().toString();
	const uri = 'ncp:sms:kr:266711619475:test';
	const secretKey = 'rJRfAGWKZA73v21KZjkTM60E1ktmBew0CCtoETmY';
	const accessKey = 'dGjcR0KwfdR8Pw5051ns';
	const method = 'POST';
	const space = " ";
	const newLine = "\n";
	const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
	const url2 = `/sms/v2/services/${uri}/messages`;

	const hmac = crypto.createHmac('sha256', secretKey);
    let mes = [];
    mes.push(method);
    mes.push(space);
    mes.push(url2);
    mes.push(newLine);
    mes.push(date);
    mes.push(newLine);
    mes.push(accessKey);
    const signature = hmac.update(mes.join('')).digest('base64');

	// hmac.update(method);
	// hmac.update(space);
	// hmac.update(url2);
	// hmac.update(newLine);
	// hmac.update(date);
	// hmac.update(newLine);
	// hmac.update(accessKey);

	// const hash = hmac.finalize();
	// const signature = hash.toString(CryptoJS.enc.Base64);

        request({
            method : method,
            json : true,
            uri : url,
            headers : {
                'Contenc-type': 'application/json; charset=utf-8',
                'x-ncp-iam-access-key': accessKey,
                'x-ncp-apigw-timestamp': date,
                'x-ncp-apigw-signature-v2': signature.toString(),
            },
            body : {
                'type' : 'SMS',
                'countryCode' : '82',
                'from' : '01034415655',
                'content' : `WEIVER 인증번호 ${authnum} 입니다.`,
                'messages' : [
                    {
                        'to' : `${phonenum}`
                    }
                ]
            }
        }, function(err, res, html) {
            if(err) console.log(err);
            else {
                resultCode = 200;
                console.log(html);
            }
        });
    
        // res.json({
    
        //     'code' : resultCode
        // });

          
};

exports.authnumcheck = async function (req, res) {
    const phonenum = req.body.phonenum;
    const authnum = req.body.authnum;

    const authnumRows = await userProvider.authnumCheck(phonenum);

    console.log(minutes);

    if(authnumRows[0].authTime > 5){
        return res.send(errResponse(baseResponse.AUTH_TIME_OVER));
    }

    if(authnumRows[0].authnum != authnum) {
        return res.send(errResponse(baseResponse.AUTH_AUTHNUM_WRONG));
    }
    else {
        return res.send(response(baseResponse.SUCCESS));
    }
};

// 푸쉬 알람 API
exports.pushAlarm = async function (req, res) {

    const deviceToken = req.body.access_token;

    
        let message = {
            notification:{
                title:'테스트 발송',
                body:'당근마켓 앱 확인해보세요!',
            },
            token: deviceToken,
        }

        admin
        .messaging()
        .send(message)
        .then(function(response){
            console.log('Successfully sent message::', response)
            return res.status(200).json({success:true})
        })
        .catch(function(err){
            console.log('Error Sending message!!!:', err)
            return res.status(400).json({success:false})
        });
};



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
