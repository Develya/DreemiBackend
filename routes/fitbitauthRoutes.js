const express = require('express');
const FitbitAuthController = require('../controllers/fitbitAuthController');

const router = express.Router();

router.get('/:userId', FitbitAuthController.getFitbitAuthByUserId);
router.post('/fitbitSignIn', FitbitAuthController.fitbitSignIn);
router.get('/:userId/isFitbitAuthorized', FitbitAuthController.isFitbitAuthorized);

module.exports = router;