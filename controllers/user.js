const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { createCookie } = require('../utils/auth');
const { ErrorHandler } = require('../middlewares/error')

async function handleUserRegister(req, res) {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) return next(new ErrorHandler("User already exists", 404))

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name, email, password: hashedPassword,
        })

        return res.status(201).json({
            success: true,
            message: "User Registered Succesfully",
            user
        })
    } catch (error) {
        next(error);
    };
}

async function handleUserLogin(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new ErrorHandler("User doesn't found, please register first", 404))

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new ErrorHandler("Invalid Password", 404))

        req.user = user;
        createCookie(user, res, `Welcome back ${user.name}`, 200);
    } catch (error) {
        next(error)
    }
}

async function handleUserLogout(req, res, next) {
    try {
        return res.status(200).cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: "User logged out successfully",
            user: req.user
        })
    } catch (error) {
        next(error);
    }
}

async function getMyProfile(req, res, next) {
    try {
        return res.status(200).json({
            success: true,
            user: req.user
        })
    } catch (error) {
        next(error);
    }
}

async function getAllUsers(req, res){
    try{
    const users = await User.find({});
    return res.status(200).json({
        success: true,
        users
    })
    }catch(error){
        next(error)
    }
}



module.exports = { handleUserRegister, handleUserLogin, handleUserLogout, getMyProfile, getAllUsers };