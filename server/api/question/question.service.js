const pool = require("../../config/database");

module.exports = {
  // createQuestion: (data, callback) => {
  //   return new Promise((resolve, reject) => {
  //     pool.query(
  //       "INSERT INTO question (question, question_description, user_id) VALUES (?, ?, ?, ?)",
  //       [question, description, codeBlock, tags, userId],
  //       (error, result) => {
  //         if (error) {
  //           return reject(error);
  //         }
  //         const questionId = result.insertId;
  //         resolve({
  //           questionId,
  //           question,
  //           description,
  //           codeBlock,
  //           tags,
  //           userId,
  //         });
  //       }
  //     );
  //   });
  // },
 

  // getAllQuestions: () => {
  //   return new Promise((resolve, reject) => {
  //     pool.query("SELECT * FROM question", (error, result) => {
  //       if (error) {
  //         return reject(error);
  //       }
  //       resolve(result);
  //     });
  //   });
  // },

  createQuestion: (data, callback) => {
    pool.query(
      "INSERT INTO question(question, question_description, user_id)VALUES(?,?,?)",
      [data.question, data.description, data.user_id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  getAllQuestions: (callback) => {
    pool.query(
      `SELECT registration.user_name,question_id, question,question_description,question.user_id FROM question JOIN registration ON question.user_id = registration.user_id ORDER BY question_id DESC`,
      (err, result) => {
        if (err) {
          console.log("import questions: database connection error");
          return callback(err);
        }
        console.log(">>>>>>> importQuestions:  passed");
        // console.log(">>>>>>>>> importQuestions: ", result);
        return callback(null, result);
      }
    );
  },
};
