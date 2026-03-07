require("dotenv").config();
const pool = require("./config/database");
const express = require("express");
const cors = require("cors");
const app = express();
const port = Number(process.env.PORT) || 4000;
const userRouter = require("./api/users/user.router");
const questionRouter = require("./api/question/question.router");
const answerRouter = require("./api/Answer/AnswerRouter");

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

const server = app.listen(port, "0.0.0.0", () =>
  console.log(`listening at http://localhost:${port}`),
);

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${port} is already in use. Set a different PORT in .env.`,
    );
    process.exit(1);
  }

  throw err;
});
