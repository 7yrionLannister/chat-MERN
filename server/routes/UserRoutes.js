const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const userDB = require('../models/UserModel');
const {
    hashPassword,
    signToken,
    comparePasswords
} = require('../authentication/Authentication');

router
    .route('/')
    .post(async (req, res) => {
        try {
            const { username, password, photoURL, bio } = req.body;
            if (!(username && password)) {
                return res
                    .status(400)
                    .send('Username and password are required');
            }
            const oldUser = await userDB.findOne({ username }).exec();
            if (oldUser) {
                return res.status(409).send('User already exists');
            }
            let encryptedPwd = await hashPassword(password);
            const user = await userDB.create({
                username,
                password: encryptedPwd,
                photoURL,
                bio
            });
            const token = signToken(user);
            user.token = token;
            user.password = undefined;
            res.status(201).json(user);
        } catch (err) {
            res.status(500).send('Server error while registering user');
        }
    })
    .put(async (req, res) => {
        const currentUsername = req.user.username;
        const { username, password, photoURL, bio } = req.body;
        let encryptedPwd = await hashPassword(password);
        await userDB
            .findOneAndUpdate(
                { username: currentUsername },
                {
                    username,
                    password: encryptedPwd,
                    photoURL,
                    bio
                },
                {
                    new: true
                }
            )
            .select('-password')
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(500).send('Error while updating user');
            });
    })
    .get(async (req, res) => {
        await userDB
            .find()
            .select('-password')
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(500).send({
                    status: false,
                    message: 'Error getting users'
                });
            });
    });

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send('Required input was not set');
        } else {
            const user = await userDB.findOne({ username }).exec();
            if (user && (await comparePasswords(password, user.password))) {
                const token = signToken(user);
                user.token = token;
                user.password = undefined;
                res.status(200).json(user);
            } else {
                res.status(401).send('Invalid credentials');
            }
        }
    } catch (err) {
        res.status(500).send('Server error when authenticating');
    }
});

router.post('/request/send', async (req, res) => {
    const userId = req.user.user_id;
    const potentialNewFriend = req.body.username;
    await userDB
        .findOneAndUpdate(
            {
                username: potentialNewFriend,
                friends: { $not: { $elemMatch: { $eq: userId } } }
            },
            { $addToSet: { requests: userId } },
            { new: true }
        )
        .then((data) => {
            res.status(200).send('Friend request sent succesfully');
        })
        .catch((err) => {
            res.status(500).send('Could not send friend request');
        });
});
router.post('/request/respond', async (req, res) => {
    const action = req.body.response;
    const targetUser = req.body.user_id;
    switch (action) {
        case 'accept':
            await userDB
                .findOneAndUpdate(
                    {
                        username: req.user.username,
                        requests: targetUser
                    },
                    {
                        $pull: { requests: targetUser },
                        $push: { friends: targetUser }
                    },
                    { new: true }
                )
                .then(async (data) => {
                    const currentUserId = data._id;
                    await userDB.findOneAndUpdate(
                        { _id: targetUser },
                        {
                            $pull: { requests: currentUserId },
                            $push: { friends: currentUserId }
                        },
                        { new: true }
                    );
                    res.status(200).send('Friend request accepted');
                })
                .catch((err) => {
                    res.status(500).send(
                        'Error while accepting friend request'
                    );
                });
            break;
        case 'reject':
            await userDB
                .findOneAndUpdate(
                    { username: req.user.username },
                    { $pull: { requests: targetUser } },
                    { new: true }
                )
                .then((data) => {
                    res.status(200).send('Friend request rejected');
                })
                .catch((err) => {
                    res.status(500).send(
                        'Error while rejecting friend request'
                    );
                });
            break;
        default:
            res.status(400).send('"response" must be "accept" or "reject"');
            break;
    }
});

module.exports = router;
