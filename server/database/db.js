const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

module.exports.connect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('MongoDB started');
    }).catch(err => {
        console.error('Error connecting to MongoDB', err);
    });
}