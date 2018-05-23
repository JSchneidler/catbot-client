const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('db').User;

const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy({ session: false }, (username, password, done) => {
  let user;
  User.findOne({ where: { username }})
    .then(fetchedUser => {
      if (!fetchedUser) return done(null, false, { message: 'Username not found' });
      user = fetchedUser;
      return bcrypt.compare(password, fetchedUser.password);
    })
    .then(match => {
      if (!match) return done(null, false, { message: 'Password incorrect' });
      return done(null, user);
    })
    .catch(err => done(err));
}));

passport.use(new JWTStrategy({
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
}, (payload, done) => {
  User.findOne({ where: { id: payload.userId }})
    .then(user => {
      if (!user) return done(null, false, { message: 'User does not exist' });
      done(null, user);
    })
    .catch(error => done(error));
}));