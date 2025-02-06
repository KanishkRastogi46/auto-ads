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
    scope: ['profile', 'email'],
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
        let exists = await User.findOne({user_id: profile.id});
        if (!exists) {
            await User.create({
                user_id: profile.id,
                email: profile.emails[0].value,
                profile: profile.picture,
            });
            
            let user = await User.findOne({user_id: profile.id});
            return cb(null, user);
        } else {
            return cb(null, exists);
        }
    } catch (error) {
        console.error(error);
        return cb(error, null);
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

router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'] 
}));

router.get('/google/callback', passport.authenticate('google', {
    access_type: "offline",
    scope: ["email", "profile"],
}), function(req, res) {
    if (!req.user) return res.status(401).json({message: 'Login failed', success: false});
    else return res.status(200).json({message: 'Login successful', success: true, user: req.user});
});

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.status(200).json({message: 'Logout successful', success: true});
    });
})


export default router;