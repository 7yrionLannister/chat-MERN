const express = require('express');
const router = express.Router();
const userDB = require('../database/models/UserModel');
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
            if (
                !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])(?=.{8,})/.test(
                    password
                )
            ) {
                return res
                    .status(400)
                    .send(
                        'Provide a strong password (uppercase and lowercase letters, digits and special characters)'
                    );
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
                { new: true }
            )
            .select('-password')
            .then((data) => res.status(200).json(data))
            .catch(() => res.status(500).send('Error while updating user'));
    })
    .get(async (req, res) => {
        const { user_id, username } = req.query;
        let filter = username
            ? { username }
            : { _id: { $ne: req.user.user_id } };
        if (user_id) filter = { _id: user_id };
        let query =
            user_id || username ? userDB.findOne(filter) : userDB.find(filter);
        await query
            .select('-password')
            .then((data) => res.status(200).json(data))
            .catch(() => res.status(500).send('Error getting users'));
    });

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
            return res.status(400).send('Required input was not set');
        }
        const user = await userDB.findOne({ username }).exec();
        if (user && (await comparePasswords(password, user.password))) {
            const token = signToken(user);
            user.token = token;
            user.password = undefined;
            return res.status(200).json(user);
        }
        res.status(401).send('Invalid credentials');
    } catch (err) {
        res.status(500).send('Server error when authenticating');
    }
});

router.post('/unfriend/:unfriend', async (req, res) => {
    const currentUser = req.user.user_id;
    const userToUnfriend = req.params.unfriend;
    await userDB
        .findByIdAndUpdate(currentUser, { $pull: { friends: userToUnfriend } })
        .then(async () => {
            await userDB
                .findByIdAndUpdate(userToUnfriend, {
                    $pull: { friends: currentUser }
                })
                .then((exFriend) =>
                    res
                        .status(200)
                        .send(
                            `You are no longer friends with ${exFriend.username}`
                        )
                );
        })
        .catch(() => res.status(500).send('Error removing friend'));
});

module.exports = router;
