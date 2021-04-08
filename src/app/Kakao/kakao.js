module.exports = function(app){
    const express = require('express');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;

passport.use('kakao', new KakaoStrategy({
    clientID: '80ab2b284163f57133dfdaabd2089d87',
    callbackURL: '/auth/kakao/callback',     // 위에서 설정한 Redirect URI
  }, async (accessToken, refreshToken, profile, done) => {
    //console.log(profile);
    console.log(accessToken);
    console.log(refreshToken);
}))


app.get('/kakao', passport.authenticate('kakao'));

app.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (res, req) => {
  res.redirect('/auth');
});

};