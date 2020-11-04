const router = require('express').Router();
const passport = require('passport');
const auth = require('./auth');
const issue = require('./issue');
const label = require('./label');
const milestone = require('./milestone');
const user = require('./user');
const upload = require('./upload');

const passportJWT = passport.authenticate('jwt', { session: false });

router.use('/auth', auth);
// router.use('/issue', passportJWT, issue);
router.use('/issue', issue);
router.use('/label', label);
router.use('/milestone', milestone);
router.use('/user', user);
router.use('/upload', upload);

module.exports = router;