const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models/users");
const jwt = require("jsonwebtoken")

const  config = require("./config");

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
}

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secretKey
}

exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    console.log("Jwt Payload: ", jwtPayload);
    User.findOne({
        _id: jwtPayload._id
    }, (err, user) => {
        if (err) {
            return done(err, false);
        } else if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
}))

exports.verifyUser = passport.authenticate("jwt", {
    session: false
}, () => true)

exports.verifyAdmin = (req, res, next) => {
    if (req.user.admin) {
        next();
    } else {
        let err = new Error("You are not allowed to perform this action");
        err.status = 403;
        return next(err);
    }
}
