const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 6,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photoURL: {
        type: String,
        default:
            'https://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png'
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    bio: String,
    token: String
});

module.exports = mongoose.model('users', UserSchema);
