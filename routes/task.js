const express = require('express');
const { handleNewTask, getMyTasks, handleUpdateTask, handleDeleteTask } = require('../controllers/task');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const router = express.Router();


router.post("/new", isAuthenticated, handleNewTask);
router.get("/mytasks", isAuthenticated, getMyTasks);
router.route("/:id").put(isAuthenticated, handleUpdateTask).delete(isAuthenticated, handleDeleteTask);


module.exports = router;


