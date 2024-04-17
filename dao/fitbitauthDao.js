const db = require('../config');

class FitbitAuthDao {
    static async getFitbitAuthByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM FitbitAuth WHERE userID = ?', [userId], (error, results) => {
                if (error) {
                    console.error('Error fetching FitbitAuth:', error);
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

    static async newFitbitAuth(accessToken, expiresIn, refreshToken, tokenType, userId, scope) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO FitbitAuth (accessToken, expiresIn, refreshToken, tokenType, userID, scope) VALUES (?,?,?,?,?,?)', [accessToken, expiresIn, refreshToken, tokenType, userId, scope], (error, results) => {
                if (error) {
                    console.error('Error creating FitbitAuth:', error);
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }
}

module.exports = FitbitAuthDao;
