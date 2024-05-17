const express = require('express');
const SleepLogController = require('../controllers/sleeplogController');

const router = express.Router();

router.get('/:userId', SleepLogController.getSleepLogs);
router.get('/:userId/lastsevendays', SleepLogController.getLastSevenDaysSleepLogs);
router.get('/:userId/lastfourteendays', SleepLogController.getLastFourteenDaysSleepLogs);
router.get('/:userId/refresh', SleepLogController.refreshData);
router.post('/:userId/byperiod', SleepLogController.getSleepLogsByPeriod);

module.exports = router;