const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const openMethods = [];

const verifyToken = (req, res, next) => {
    if (!isOpenPathAndMethod(req)) {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res
                .status(401)
                .send('A token is required for authentication');
        }
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decoded;
        } catch (err) {
            return res.status(401).send('Invalid token');
        }
    }
    return next();
};

const openMethod = (path, method) => {
    openMethods.push({ path, method });
};

const isOpenPathAndMethod = (req) => {
    const path = req.path;
    const method = req.method;
    return openMethods.find((e) => e.path === path && e.method === method);
};

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

const testPasswordStregth = (password) =>
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])(?=.{8,})/.test(password);

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const comparePasswords = async (providedPassword, actualPassword) => {
    return await bcrypt.compare(providedPassword, actualPassword);
};

module.exports = {
    verifyToken,
    openMethod,
    hashPassword,
    signToken,
    comparePasswords,
    testPasswordStregth
};
