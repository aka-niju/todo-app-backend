const express = require('express');

const { handleUserRegister, handleUserLogin, handleUserLogout, getMyProfile, getAllUsers } = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

const router = express.Router();

router.post("/new", handleUserRegister);
router.post("/login", handleUserLogin);
router.get("/logout", isAuthenticated, handleUserLogout);
router.get("/me", isAuthenticated, getMyProfile);
router.get("/admin/all", getAllUsers);

module.exports = router;

