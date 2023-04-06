const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();

const userDB = require('../models/UserModel');

function signToken(user) {
    return jwt.sign(
        { user_id: user._id, username: user.username },
        process.env.TOKEN_KEY,
        {
            expiresIn: '5h',
            issuer: 'Server'
        }
    );
}

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
            let encryptedPwd = await bcrypt.hash(password, 10);
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
        const username = req.body.username;
        await userDB
            .findOneAndUpdate({ username }, req.body)
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
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = signToken(user);
                user.token = token;
                user.password = undefined;
                res.status(200).json(user);
            } else {
                res.status(401).send('Invalid credentials');
            }
        }
    } catch (err) {
        res.status(400).send('Server error when authenticating');
    }
});

router.post('/request/send', (req, res) => {
    res.send('send');
});
router.post('/request/respond', (req, res) => {
    res.send(req.body.response);
});

module.exports = router;
