const db = require('../config');

class UserDao {
    static async getUserByGoogleId(googleId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM User WHERE googleID = ?', [googleId], (error, results) => {
                if (error) {
                    console.error('Error fetching user:', error);
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

    static async newUser(googleId, email, name, pictureURL) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO User (googleId, email, name, pictureURL) VALUES (?,?,?,?)', [googleId, email, name, pictureURL], (error, results) => {
                if (error) {
                    console.error('Error creating user:', error);
                    reject(error);
                } else {
                    // Get the newly inserted user from the database
                    db.query('SELECT * FROM User WHERE userID = ?', [results.insertId], (error, userResults) => {
                        if (error) {
                            console.error('Error fetching newly created user:', error);
                            reject(error);
                        } else {
                            // Resolve with the user object
                            resolve(userResults[0]);
                        }
                    });
                }
            });
        });
    }
}

module.exports = UserDao;
