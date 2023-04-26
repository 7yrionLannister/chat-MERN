const express = require('express');
const router = express.Router();
const userDB = require('../database/models/UserModel');

router.post('/send', async (req, res) => {
    const userId = req.user.user_id;
    const potentialNewFriend = req.body.username;
    if (!potentialNewFriend)
        return res
            .status(400)
            .send('Provide "username" of the recipient of the friend request');
    await userDB
        .findOneAndUpdate(
            {
                username: potentialNewFriend,
                friends: { $not: { $elemMatch: { $eq: userId } } }
            },
            { $addToSet: { requests: userId } }
        )
        .then(() => res.status(200).send('Friend request sent succesfully'))
        .catch(() => res.status(500).send('Could not send friend request'));
});

router.post('/respond', async (req, res) => {
    const currentUserId = req.user.user_id;
    const action = req.body.response;
    const targetUser = req.body.user_id;
    if (!(targetUser && action))
        return res
            .status(400)
            .send(
                'You must provide both the target user ("user_id") and the action to take ("response")'
            );
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
                        $addToSet: { friends: targetUser }
                    }
                )
                .then(async () => {
                    await userDB
                        .findByIdAndUpdate(targetUser, {
                            $pull: { requests: currentUserId },
                            $addToSet: { friends: currentUserId }
                        })
                        .then(() =>
                            res.status(200).send('Friend request accepted')
                        );
                })
                .catch(() =>
                    res.status(500).send('Error while accepting friend request')
                );
            break;
        case 'reject':
            await userDB
                .findByIdAndUpdate(currentUserId, {
                    $pull: { requests: targetUser }
                })
                .then(() => res.status(200).send('Friend request rejected'))
                .catch(() =>
                    res.status(500).send('Error while rejecting friend request')
                );
            break;
        default:
            res.status(400).send('"response" must be "accept" or "reject"');
            break;
    }
});

module.exports = router;
