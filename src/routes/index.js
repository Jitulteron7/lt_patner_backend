const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const middleware = require('../middleware');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const router = Router();





router.get('/testing', async (req, res) => {
    res.json({ message: "working" });
})

router.post('/login', asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        const error = new Error('Account not found !');
        error.statusCode = 401;
        error.name = 'Unauthorized';
        throw error;
    }


    const isMatched = await bcrypt.compare(password, user?.password);

    if (!isMatched) {
        const error = new Error('Password is invalid');
        error.statusCode = 401;
        error.name = 'Unauthorized';
        throw error;
    }

    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRECT);
    const userObj = user.toObject();
    delete userObj.password;
    res.json({ user: userObj, token }).status(200);

}))



router.post('/register', asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    let check = await User.findOne({ email });
    if (check) {
        const error = new Error(`Admin of type ${adminType} already exists`);
        error.statusCode = 400;
        throw error;
    }

    const user = await User.create({
        name,
        email,
        password
    });


    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRECT);
    const userObj = user.toObject();
    delete userObj.password;

    res.json({ user: userObj, token }).status(200);

}))


router.post('/logout', middleware(), asyncHandler(async (req, res, next) => {

    console.log('logout')
    res.json({ message: 'Logout succesfully' }).status(201);

}))



module.exports = router
