const jwt = require('jsonwebtoken');
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

module.exports = { verifyToken, openMethod };
