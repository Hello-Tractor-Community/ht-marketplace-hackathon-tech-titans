const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            let user = await User.findOne({ email: email });

            if (!user) {
                return done(null, false, { message: 'No user with that email' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Password incorrect' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
           const user = await User.findById(id)
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
}

module.exports = initialize;
