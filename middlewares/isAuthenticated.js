const jwt = require('jsonwebtoken');
const {User} = require('../models/user')

const isAuthenticated = async(req, res, next) => {
    const {token} = req.cookies;

    if(!token) return res.status(404).json({
        success: false,
        message: "Login First"
    })

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload._id);
    next();
}

module.exports = {isAuthenticated};