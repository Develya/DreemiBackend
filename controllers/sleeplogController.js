const SleepLogDao = require('../dao/sleepLogDao');
const FitbitAuthDao = require('../dao/fitbitAuthDao');
const SleepLog = require('../models/sleepLog');

class SleepLogController {
    static async getSleepLogs(req, res) {
        const { userId } = req.params;
        SleepLogDao.getSleepLogsByUserId(userId)
            .then((sleepLogs) => {
                res.json(sleepLogs);
            });
    }

    static async getSleepLogsByPeriod(req, res) {
        const { userId } = req.params;
        const { startDate, endDate } = req.body;
        SleepLogDao.getSleepLogsByPeriod(userId, startDate, endDate)
            .then((sleepLogs) => {
                console.log(sleepLogs);
                res.json(sleepLogs);
            });
    }

    static async getLastSevenDaysSleepLogs(req, res) {
        const { userId } = req.params;
        SleepLogDao.getLastSevenDaysSleepLogsByUserId(userId)
            .then((sleepLogs) => {
                res.json(sleepLogs);
            });
    }

    static async getLastFourteenDaysSleepLogs(req, res) {
        const { userId } = req.params;
        SleepLogDao.getLastFourteenDaysSleepLogsByUserId(userId)
            .then((sleepLogs) => {
                res.json(sleepLogs);
            });
    }

    static async refreshData(req, res) {
        const { userId } = req.params;

        const fitbitAuth = await FitbitAuthDao.getFitbitAuthByUserId(userId);
        const { accessToken } = fitbitAuth;

        const today = new Date();

        // Extract year, month, and day from the date object
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        
        // Assemble the date string in the format "YYYY-MM-DD"
        const formattedDate = `${year}-${month}-${day}`;

        // Make the request to the Fitbit API
        const url = `https://api.fitbit.com/1.2/user/-/sleep/list.json?beforeDate=${formattedDate}&limit=100&offset=0&sort=asc`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);

        await SleepLogDao.deleteAllByUserId(userId);

        let count = 0;
        data.sleep.forEach(log => {
            const newSleepLog = new SleepLog(0, log.duration, log.startTime, log.endTime, log.efficiency, userId);
            SleepLogDao.newSleepLog(newSleepLog);
            count++;
        });
        res.send(count.toString());
    }
}

module.exports = SleepLogController;