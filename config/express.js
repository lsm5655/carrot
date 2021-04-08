const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
var cors = require('cors');
module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(cors());
    // app.use(express.static(process.cwd() + '/public'));

    /* App (Android, iOS) */
    // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
    require('../src/app/User/userRoute')(app);
    require('../src/app/Dong/dongRoute')(app);
    require('../src/app/Category/categoryRoute')(app);
    require('../src/app/InterestGoods/interestRoute')(app);
    require('../src/app/Goods/goodsRoute')(app);
    require('../src/app/Priceoffer/offerRoute')(app);
    require('../src/app/Notice/noticeRoute')(app);
    require('../src/app/Keyword/keywordRoute')(app);
    require('../src/app/Review/reviewRoute')(app);
    require('../src/app/Chatroom/chatroomRoute')(app);
    require('../src/app/Kakao/kakao')(app);
    // require('../src/app/Board/boardRoute')(app);

    return app;
};