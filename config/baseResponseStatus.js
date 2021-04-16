module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2002, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 6~20자리를 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"닉네임을 입력 해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2007,"message":"닉네임은 최대 20자리를 입력해주세요." },

    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2008, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2009, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2010, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2011, "message": "비밀번호를 입력 해주세요." },
    SIGNIN_PHONENUM_EMPTY : { "isSuccess": false, "code": 2041, "message": "전화번호를 입력 해주세요." },

    USER_USERID_EMPTY : { "isSuccess": false, "code": 2012, "message": "userId를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },

    SIGNUP_PHONENUM_EMPTY : {"isSuccess": false, "code" : 2019, "message": "번호를 입력해주세요."},
    SIGNUP_PHONENUM_LENGTH : {"isSuccess": false, "code" : 2020, "message": "번호를 11자리로 입력해주세요."},
    SIGNUP_PHONENUM_ERROR_TYPE : {"isSuccess": false, "code" : 2021, "message": "번호를 형식을 정확하게 입력해주세요."},

    DONGNAME_EMPTY : {"isSuccess": false, "code" : 2022, "message": "동이름을 입력해주세요."},
    RANGE_EMPTY : {"isSuccess": false, "code" : 2023, "message": "범위를 입력해주세요."},

    CATEGORY_CATEGORYID_EMPTY : { "isSuccess": false, "code": 2024, "message": "categoryId를 입력해주세요." },
    CATEGORY_CATEGORYNAME_EMPTY : { "isSuccess": false, "code": 2025, "message": "category이름을 입력해주세요." },
    CATEGORY_CATEGORYID_NOT_EXIST : { "isSuccess": false, "code": 2026, "message": "해당 categoryID가 존재하지 않습니다." },

    GOODS_GOODSID_EMPTY : { "isSuccess": false, "code": 2027, "message": "goodsId를 입력해주세요." },
    GOODS_GOODSID_NOT_EXIST : { "isSuccess": false, "code": 2028, "message": "해당 goodsID가 존재하지 않습니다." },
    GOODS_SELLERLOCATIONID_EMPTY : { "isSuccess": false, "code": 2029, "message": "sellerlocationId를 입력해주세요." },
    GOODS_GOODSTITLE_EMPTY : { "isSuccess": false, "code": 2030, "message": "상품제목을 입력해주세요." },
    GOODS_PRICE_EMPTY : { "isSuccess": false, "code": 2031, "message": "상품가격을 입력해주세요. }"},
    GOODS_ISPRICEOFFER_EMPTY : { "isSuccess": false, "code": 2032, "message": "가격제안여부를 입력해주세요." },
    GOODS_CONTENT_EMPTY : { "isSuccess": false, "code": 2033, "message": "내용을 입력해주세요." },
    GOODS_FILELINK_EMPTY : { "isSuccess": false, "code": 2041, "message": "파일링크를 입력해주세요." },

    NOTICE_TYPE_EMPTY : { "isSuccess": false, "code": 2034, "message": "알림 종류를 입력해주세요." },
    NOTICE_ID_EMPTY : { "isSuccess": false, "code": 2035, "message": "알림 ID를 입력해주세요." },

    KEYWORD_NAME_EMPTY : { "isSuccess": false, "code": 2036, "message": "키워드를 입력해주세요." },
    KEYWORD_ID_EMPTY : { "isSuccess": false, "code": 2037, "message": "키워드 ID를 입력해주세요." },

    REVIEW_CONTENT_EMPTY : { "isSuccess": false, "code": 2038, "message": "후기 내용을 입력해주세요." },
    REVIEW_ID_EMPTY : { "isSuccess": false, "code": 2039, "message": "후기 ID를 입력해주세요." },

    CHATROOM_ID_EMPTY : { "isSuccess": false, "code": 2040, "message": "채팅방 ID를 입력해주세요." },
    
    // Response error
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },
    SIGNUP_REDUNDANT_PHONENUM : { "isSuccess": false, "code": 3007, "message":"중복된 번호입니다." },
    SIGNUP_REDUNDANT_CATEGORYNAME : { "isSuccess": false, "code": 3007, "message":"중복된 카테고리 이름입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 3003, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
 
}
