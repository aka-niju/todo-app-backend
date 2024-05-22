const express = require('express');

const { handleUserRegister, handleUserLogin, handleUserLogout, getMyProfile } = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

const router = express.Router();

router.post("/new", handleUserRegister);
router.post("/login", handleUserLogin);
router.get("/logout", isAuthenticated, handleUserLogout);
router.get("/me", isAuthenticated, getMyProfile);

module.exports = router;

