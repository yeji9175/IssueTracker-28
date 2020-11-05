const router = require('express').Router();
const controller = require('./controller');

router.get('/list', controller.getIssues);
router.post('/', controller.createIssue);
router.put('/status', controller.updateIssueStatus);

module.exports = router;