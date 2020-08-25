const router = require('express').Router();

const { postSignUp, postLogin } = require('../controllers/auth.controller');

const valid = require('../middlewares/valid.middleware');
const { authValid } = require('../validators');

router.post('/signup', valid(authValid.signup, 'body'), (req, res) =>
  postSignUp(req, res),
);
router.post('/login', valid(authValid.login, 'body'), (req, res) =>
  postLogin(req, res),
);

module.exports = router;
