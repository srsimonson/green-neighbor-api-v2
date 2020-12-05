const router = require('express').Router();
const getPrograms = require('./getPrograms');
const getGoecodeData = require('./getGeocodeData');

// get programs by zip
router.get('/:zip', getPrograms);
router.get('/geocode/:zip', getGoecodeData);

module.exports = router;
