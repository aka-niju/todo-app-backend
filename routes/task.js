const express = require('express');
const { handleNewTask, getMyTasks, handleUpdateTask, handleDeleteTask, getAllTasks } = require('../controllers/task');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const router = express.Router();


router.post("/new", isAuthenticated, handleNewTask);
router.get("/mytasks", isAuthenticated, getMyTasks);
router.route("/:id").put(isAuthenticated, handleUpdateTask).delete(isAuthenticated, handleDeleteTask);
router.get("/admin/all", getAllTasks)


module.exports = router;


