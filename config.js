const mysql = require('mysql');

// Function to create a new connection to MySQL
function createConnection() {
    return mysql.createConnection({
        host: 'mysql-sleeptracker.alwaysdata.net',
        user: '347696',
        password: 'HxPLQ2^LL@owA5',
        database: 'sleeptracker_main'
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
