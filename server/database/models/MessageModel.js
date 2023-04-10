const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    { timestamps: { createdAt: 'sent_at' } }
);

module.exports = mongoose.model('messages', MessageSchema);
