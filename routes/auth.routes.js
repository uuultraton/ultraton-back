const router = require('express').Router();

const { postSignUp, postLogin } = require('../controllers/auth.controller');

router.post('/signup', (req, res) => postSignUp(req, res));
router.post('/login', (req, res) => postLogin(req, res));

module.exports = router;
