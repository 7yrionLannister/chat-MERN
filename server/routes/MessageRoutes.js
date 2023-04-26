const express = require('express');
const router = express.Router();
const messageDB = require('../database/models/MessageModel');
const userDB = require('../database/models/UserModel');

router
    .route('/:receiver')
    .post(async (req, res) => {
        const sender = req.user.user_id;
        const receiver = req.params.receiver;
        const message = req.body.message;
        if (!message) return res.status(400).send('Provide a message to send');
        const friend = await userDB
            .findOne({ _id: sender, friends: receiver })
            .exec();
        if (!friend) {
            return res
                .status(403)
                .send(
                    'You are not allowed to message someone who is not your friend'
                );
        }
        await messageDB
            .create({
                sender,
                receiver,
                message
            })
            .then(() => res.status(200).send('Message sent succesfully'))
            .catch(() => res.status(500).send('Could not send message'));
    })
    .get(async (req, res) => {
        await messageDB
            .find({
                $or: [
                    { sender: req.user.user_id, receiver: req.params.receiver },
                    { receiver: req.user.user_id, sender: req.params.receiver }
                ]
            })
            .sort('sent_at')
            .then((data) => res.status(200).json(data))
            .catch(() => res.status(500).send('Error getting messages'));
    });

module.exports = router;
