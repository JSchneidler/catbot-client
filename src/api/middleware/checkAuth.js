const passport = require('passport');

module.exports = (required = false) => {
  return (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      console.log('Err', err);
      console.log('User', user);
      console.log('Info', info);
      next();
    });
  };
}