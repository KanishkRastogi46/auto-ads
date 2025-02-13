import { Router } from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import User from "../models/user.model.js";
import { config } from "dotenv";

config();

const router = Router();

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        scope: ['profile', 'email', "https://www.googleapis.com/auth/adwords"],
        // access_type: 'offline',
    },
    async function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        console.log(accessToken);
        console.log(refreshToken);
        try {
            let exists = await User.findOne({user_id: profile.id});
            if (!exists) {
                await User.create({
                    user_id: profile.id,
                    email: profile.emails[0].value,
                    picture: profile.photos[0].value,
                    accesstoken: accessToken,
                    refreshtoken: refreshToken,
                });
                
                let user = await User.findOne({user_id: profile.id});
                return cb(null, user);
            } else {
                return cb(null, exists);
            }
        } catch (error) {
            console.error(error);
            return cb(error, false);
        }
    }
));

// function to serialize a user/profile object into the session
passport.serializeUser(function (user, done) {
    done(null, user);
});

// function to deserialize a user/profile object into the session
passport.deserializeUser(function (user, done) {
    done(null, user);
});

router.get('/login', (req, res) => {
    res.json({message: 'Login page'});
});

router.get('/google', passport.authenticate('google', {accessType: 'offline', prompt: 'consent'}));

router.get('/google/callback', passport.authenticate('google'), function(req, res) {
    if (!req.user) return res.status(401);
    else return res.redirect(`${process.env.CLIENT_URL}`);
});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect(`${process.env.CLIENT_URL}`);
    });
})


export default router;
