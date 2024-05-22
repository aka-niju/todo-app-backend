const express = require('express');
const cookieParser = require('cookie-parser')
const {config} = require('dotenv');
const cors = require('cors')
const {connectToDb} = require('./services/connection')
const staticRouter = require('./routes/staticRoutes')
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task')
const { errorMiddleware } = require('./middlewares/error');

const app = express()

config({
    path: "./config.env",
})

// connecting to mongo db
const dbName = "todo-app"
connectToDb(process.env.MONGO_URI, dbName);


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

// routes
app.use("/", staticRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

// error middleware
app.use(errorMiddleware);

// listening to the server
app.listen(process.env.PORT, ()=> {
    console.log(`server is running on ${process.env.PORT} port in ${process.env.NODE_ENV} mode`);
})