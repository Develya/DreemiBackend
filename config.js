const mysql = require('mysql');

const secrets = require('./secrets');

// Function to create a new connection to MySQL
function createConnection() {
    return mysql.createConnection({
        host: secrets.database.host,
        user: secrets.database.user,
        password: secrets.database.password,
        database: secrets.database.database
    });
}

// Function to handle MySQL connection
function handleConnection() {
    const db = createConnection();

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err.stack);
            // Retry connecting after a delay (e.g., 5 seconds)
            setTimeout(handleConnection, 5000);
            return;
        }
        console.log('Connected to MySQL as id', db.threadId);

        // Handle MySQL connection errors
        db.on('error', (err) => {
            console.error('MySQL error:', err);
            handleConnection();
        });
    });

    return db;
}

// Start handling the MySQL connection
const db = handleConnection();

module.exports = db;
