const router = require('express').Router();
const { getUtilities } = require('../controllers/SelectUtility');

router.get('/:zip', getUtilities);

module.exports = router;
