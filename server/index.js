const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { verifyToken, openMethod } = require('./authentication/Authentication');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;
const app = express();
const db = require('./db');
const router = require('./routes');

// middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// cors
app.use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', '*');
    next();
});
// authentication
openMethod('/api/users/login', 'POST');
openMethod('/api/users', 'POST');
app.use(verifyToken);

db.connect();
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
