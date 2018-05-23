const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('./middleware/checkAuth');
const User = require('db').User;

function generateToken(userId) {
  return new Promise((resolve, reject) => {
    jwt.sign({ userId, }, process.env.JWT_KEY, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
}

router.all('/', (req, res) => {
  res.send('API');
});

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  generateToken(req.user.id).then(token => res.success(token));
});

router.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ where: { 'username': req.body.username }})
    .then(user => {
      if (user) return Promise.reject('Username already exists');
      return bcrypt.hash(password, 10);
    })
    .then(passwordHash => User.create({
      username,
      password: passwordHash,
    }))
    .then(user => generateToken(user.id))
    .then(token => res.success(token))
    .catch(error => {
      console.error(error);
      res.fail(error);
    });
});

router.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.success(req.user);
});

router.get('/logout', (req, res) => {
  res.send('Logout');
});

module.exports = router;