const express = require('express');
const app = express();
const port = process.env.PORT || 3010;

const userRoutes = require('./routes/userRoutes');
const sleepLogRoutes = require('./routes/sleeplogRoutes');
const fitbitAuthRoutes = require('./routes/fitbitauthRoutes');

app.use(express.json());
app.use('/users', userRoutes);
app.use('/sleeplogs', sleepLogRoutes);
app.use('/fitbitauths', fitbitAuthRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});