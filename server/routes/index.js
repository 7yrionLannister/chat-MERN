const express = require('express');
const router = express.Router();

const userRoutes = require('./UserRoutes');

router.get('/', (req, res) => {
    res.send('Wellcome to the server');
});

router.use('/users', userRoutes);

module.exports = router;
