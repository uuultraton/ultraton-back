const router = require('express').Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const valid = require('../middlewares/valid.middleware');
const { userValid } = require('../validators');

const {
  getUser,
  updateAvatar,
  updateAbout,
} = require('../controllers/user.controller');

router.get('/getInfo', (req, res) => getUser(req, res));

router.patch('/updateAbout', valid(userValid.aboutUpload), (req, res) =>
  updateAbout(req, res),
);

router.patch(
  '/updateAvatar',
  valid(userValid.avatarUpload),
  upload.single('avatar'),
  (req, res) => updateAvatar(req, res),
);

module.exports = router;
