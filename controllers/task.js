const { ErrorHandler } = require('../middlewares/error');
const { Task } = require('../models/task');


async function handleNewTask(req, res, next) {
    try {
        const { title, description } = req.body;

        const task = await Task.create({
            title, description, user: req.user
        });

        return res.status(201).json({
            success: true,
            message: "Task add successfully",
            task
        })
    } catch (error) {
        next(error)
    }
}

async function getMyTasks(req, res, next) {
    try {
        const { _id } = req.user;
        const myTasks = await Task.find({ user: _id });
        return res.status(200).json({
            success: true,
            myTasks
        })
    } catch (error) {
        next(error)
    }
}

async function handleUpdateTask(req, res, next) {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) return next(new ErrorHandler("Task not found", 404));

        task.isCompleted = !task.isCompleted;
        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task Updated Successfully"
        })
    } catch (error) {
        next(error)
    }
}

async function handleDeleteTask(req, res, next) {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) return next(new ErrorHandler("Task not found", 404));

        await task.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Task Deleted Successfully"
        })
    } catch (error) {
        next(error)
    }
}

async function getAllTasks(req, res, next) {
    try {
        const tasks = await Task.find({});
        return res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { handleNewTask, getMyTasks, handleUpdateTask, handleDeleteTask, getAllTasks }