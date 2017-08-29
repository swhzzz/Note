var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;


passport.serializeUser(function(user, done) { //第一次登录保存到session
    // console.log('---serializeUser---')
    // console.log(user)
    done(null, user);
});
passport.deserializeUser(function(obj, done) { //第二次登录从session中读取用户，不需要再次登录
    // console.log('---deserializeUser---')
    done(null, obj);
});

passport.use(new GitHubStrategy({
        clientID: '0c9d9f19b88d549e0087',
        clientSecret: 'ca549ad5f96c055711448557ea1011f3b99f71c3',
        callbackURL: "http://note.swhzzz.site/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate({githubId: profile.id}, function (err, user) {
        //     return done(err, user);
        // });
        // console.log(profile)
        done(null, profile) //返回用户数据
    }
));


router.get('/github', passport.authenticate('github'));
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // console.log(req)
        req.session.user = {
            id: req.user.id,
            username: req.user.displayName || req.user.username,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        };
        // console.log(req.session)
        // Successful authentication, redirect home.
        res.redirect('/');
    });
router.get('/logOut', (req, res) => {
    req.session.destroy()
        // req.session.user=null
    res.redirect('/')
})


module.exports = router;