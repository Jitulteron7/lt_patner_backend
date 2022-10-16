const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const isValid = (data) => {
    if (data === '' || data === undefined || data === null) {
        return true;
    }
    return false;
};


const multipleRouteAuth = () => {
    return asyncHandler(async (req, res, next) => {
        try {
            req.token = req.headers['authorization'];
            
            const decode = jwt.verify(req.token, process.env.JWT_SECRECT);
            const user = await User.findById(decode.id);
            if (isValid(user)) {
                const error = new Error('Unauthorized Admin');
                error.StatusCode = 401;
                error.name = 'Unauthorized Admin';
                throw error;
            }

            req.user = user;

            if (req.user == null) {
                const error = new Error('Unauthorized Admin');
                error.StatusCode = 401;
                error.name = 'Unauthorized Admin';
                throw error;
            } else {
                return next();

            }
        } catch (error) {
            console.log(error, 'error from middleware');
            throw new Error(error);
        }
    });
};

module.exports = multipleRouteAuth;
