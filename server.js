require("dotenv").config();
const pool = require("./server/config/database");
const express = require("express");
const cors = require("cors");
const app = express();
const port = Number(process.env.PORT) || 4000;
const userRouter = require("./server/api/users/user.router");
const questionRouter = require("./server/api/question/question.router");
const answerRouter = require("./server/api/Answer/AnswerRouter");

const allowedOrigins = (process.env.FRONTEND_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server or curl requests with no origin header.
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS: Origin not allowed"));
    },
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/Answer", answerRouter);

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
