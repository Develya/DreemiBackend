const db = require('../config');

class SleepLogDao {
    static async getSleepLogsByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM SleepLog WHERE userID = ?', [userId], (error, results) => {
                if (error) {
                    console.error('Error fetching sleeplogs:', error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async getLastSevenDaysSleepLogsByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM SleepLog WHERE userID = ? ORDER BY startDate DESC LIMIT 7', [userId], (error, results) => {
                if (error) {
                    console.error('Error fetching sleeplogs:', error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async deleteAllByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM SleepLog WHERE userID = ?', [userId], (error, results) => {
                if (error) {
                    console.error('Error deleting sleeplogs:', error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async newSleepLog(sleepLog) {
        delete sleepLog.logId;
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO SleepLog SET?', sleepLog, (error, results) => {
                if (error) {
                    console.error('Error creating sleeplog:', error);
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }
}

module.exports = SleepLogDao;
