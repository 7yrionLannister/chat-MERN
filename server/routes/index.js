const express = require('express');
const router = express.Router();

const userRoutes = require('./UserRoutes');
const friendRequestRoutes = require('./FriendRequestRoutes');
const messageRoutes = require('./MessageRoutes');

router.get('/', (req, res) => {
    res.send('Wellcome to the server');
});

router.use('/users', userRoutes);
router.use('/requests', friendRequestRoutes);
router.use('/messages', messageRoutes);

module.exports = router;
