const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/auth.routes");
const boardRouter = require("./routes/board.routes");
const taskRouter = require("./routes/task.routes");
const subTaskRouter = require("./routes/subTask.routes");
const authCheck = require("./middlewares/auth.middleware");
const connectDB = require("./configs/db");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
     res.send("Welcome to Kanban-board's API Home page...")
});

app.use("/", authRouter);

app.use("/", authCheck);

app.use(authCheck);

app.use('/board', boardRouter);
app.use('/task', taskRouter);
app.use('/subtask', subTaskRouter);

// ! Wrong URL-Endpoint
app.use('/', (req, res) => {
     res.status(404).send({message: 'Invalid URL-endpoint!'})
});


app.listen(process.env.PORT ?? 8080, async () => {
     try {
          console.log(`✅ Server started at : http://localhost:${process.env.PORT ?? 8080}`);
          console.log('⏳ Database connecting...')
          await connectDB;
          console.log('✅ Database Connected')
     } catch (error) {
          console.log('❌ error:', error.message);
     }
})