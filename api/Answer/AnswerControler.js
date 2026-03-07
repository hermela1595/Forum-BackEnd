const { addAnswer, getAnswers } = require("./AnswerService");

module.exports = {
  createAnswer: (req, res) => {
    const { answer, questionId, user_id } = req.body;
    console.log(answer, questionId);

    if (!answer || !answer.trim() || !questionId || !user_id) {
      console.log(">>>>>>>>ERROR: at createAnswer lela");
      return res.status(400).json({
        msg: "Please provide answer text, question id, and user id.",
      });
    }

    addAnswer(req.body, (err, results) => {
      if (err) {
        console.log(err);
        console.log(">>>>>>>>ERROR: at createAnswer:addAnswer", req.body);
        return res.status(500).json({
          msg: "ERROR: adding the answer: database connection err",
          error: err.message,
        });
      }

      return res
        .status(200)
        .json({ msg: "New answer is added successfully", data: results });
    });
  },
  readAnswers: (req, res) => {
    // console.log(">>>>>>>>readAnswers question Id: ", req.params.questionId);
    getAnswers(req.params.questionId, (err, results) => {
      if (err) {
        // console.log(">>>>>>>>ERROR: at readAnswers:getAnswers ");
        return res
          .status(500)
          .json({ msg: "ERROR: getting the answers: database connection err" });
      }
      // console.log(">>>>>>>>success: at readAnswers:getAnswers");

      return res
        .status(200)
        .json({ msg: "The answers are imported successfully", data: results });
    });
  },
};
