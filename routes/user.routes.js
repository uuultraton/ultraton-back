const router = require('express').Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const valid = require('../middlewares/valid.middleware');
const { userValid } = require('../validators');

const {
  getUser,
  getSkills,
  updateAvatar,
  updateAbout,
} = require('../controllers/user.controller');

router.get('/:id', (req, res) => getUser(req, res));

router.get('/:id/skills', (req, res) => getSkills(req, res));
router.get('/:id/updateSkills', (req, res) => updateSkills(req, res));

router.patch('/:id/updateAbout', valid(userValid.aboutUpload), (req, res) =>
  updateAbout(req, res),
);

router.patch(
  '/:id/updateAvatar',
  valid(userValid.avatarUpload),
  upload.single('avatar'),
  (req, res) => updateAvatar(req, res),
);

module.exports = router;
