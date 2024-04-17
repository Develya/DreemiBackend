const express = require('express');
const SleepLogController = require('../controllers/sleeplogController');

const router = express.Router();

router.get('/:userId', SleepLogController.getSleepLogs);
router.get('/:userId/lastsevendays', SleepLogController.getLastSevenDaysSleepLogs);
router.get('/:userId/refresh', SleepLogController.refreshData);

module.exports = router;