const pool = require("../../config/database");
// const { QuestionService, questions, selectQuestion } = require("./question.service");
const { createQuestion, getAllQuestions}= require('./question.service')

module.exports = {
  
  // createQuestion: async (req, res) => {
  //   try {
  //     const { question, question_description, question_code_block, tags, user_id } = req.body;
  //     const createdQuestion = await QuestionService.createQuestion(question, question_description, question_code_block, tags, user_id);
  //     res.status(201).json({
  //       message: 'Question created successfully',
  //       question: createdQuestion,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       message: 'An error occurred while creating the question',
  //       error: error.message,
  //     });
  //   }
  // },
  // getAllQuestions: async (req, res) => {
  //   try {
  //     const questions = await QuestionService.getAllQuestions();
  //     res.status(200).json({
  //       questions,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       message: 'An error occurred while retrieving the questions',
  //       error: error.message,
  //     });
  //   }
  // },

  // getQuestionDetails: (req, res) => {
    // questionDetail(req.body, (err, result) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).json({ msg: "Database connection err!" });
    //   }
    //   return res.status(200).json({ data: result });
    // });

    createQuestion: (req, res) => {
      const { question, question_description } = req.body;
      // console.log("question title ", title);
      // console.log(" question description ", description);
  
      if (!question || !question_description)
        return res
          .status(400)
          .json({ msg: "Please provide a title for your question." });
  
      createQuestion(req.body, (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ msg: "Error adding the question: database connection err" });
        }
        return res.status(200).json({
          msg: "New question is created successfully",
          data: results,
        });
      });
    },
    getQuestions: (req, res) => {
      getAllQuestions((err, results) => {
        if (err) {
          console.log("get Questions: ", err);
          return res.status(500).json({ msg: "Database connection error." });
        }
        // console.log(">>>>>>> getQestions: response passed");
        //   console.log(res);
        //   console.log(results);
        //   return res;
        return res.status(200).json({ data: results });
      });
  },
};
