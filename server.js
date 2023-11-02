require("dotenv").config();
const pool = require("./server/config/database");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT||80;
const userRouter = require('./server/api/users/user.router');
const questionRouter = require("./server/api/question/question.router");
const answerRouter = require("./server/api/Answer/AnswerRouter");


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/Answer", answerRouter);


app.listen(port,"0.0.0.0", () => console.log(`listening at http://localhost:${port}`));

