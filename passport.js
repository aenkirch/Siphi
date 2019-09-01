const passport    = require('passport');
const passportJWT = require("passport-jwt");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const secret = require('./config').TOKEN_SECRET;
const UserModel = require('./models/userModel');

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy(
    async (username, password, done) => {

        try {
            const userDocument = await UserModel.findOne({username: username}).exec();
            const passwordsMatch = await bcrypt.compare(password, userDocument.passwordHash);
        
            if (passwordsMatch) {
              return done(null, userDocument);
            } else {
              return done('Incorrect Username / Password');
            }
          } catch (error) {
            done(error);
        }
        
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : secret
    },
    function (jwtPayload, cb) {

        //find the user in db if needed
        return UserModel.findOne({_id: jwtPayload._id})
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
    }
));