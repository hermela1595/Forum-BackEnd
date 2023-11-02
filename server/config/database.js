const mysql2 = require("mysql2");

// const pool = mysql2.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.MYSQL_DB,
//   connectionLimit: 10,
// });
const pool = mysql2.createConnection(process.env.DATABASE_URL)


let registration = `CREATE TABLE IF NOT EXISTS registration(
  user_id INT AUTO_INCREMENT, 
  user_name VARCHAR(255) NOT NULL, 
  user_email VARCHAR (255) NOT NULL, 
  user_password VARCHAR(255) NOT NULL, 
  PRIMARY KEY(user_id)
  )`;

pool.query(registration, (err, results) => {
  if (err) throw err;
  console.log("registrtion table created");
});

let profile = `CREATE TABLE IF NOT EXISTS profile(
  user_profile_id INT AUTO_INCREMENT,
  user_id INT NOT NULL,
  first_name VARCHAR (255) NOT NULL, 
  last_name VARCHAR (255) NOT NULL,
  PRIMARY KEY( user_profile_id )
)`;

pool.query(profile, (err, results) => {
  if (err) throw err;
  console.log("profile, table created");
});

let question = `CREATE TABLE if not exists question(
  question_id int auto_increment,
  question varchar(255) not null,
  question_description varchar(255) not null,
  question_code_block varchar(255) not null,
  tags varchar(255) not null,
  user_id int not null,        
  PRIMARY KEY (question_id)
)`;

pool.query(question, (err, results2) => {
  if (err) throw err;
  console.log("question, table created");
});

let answer = `CREATE TABLE IF NOT EXISTS answer (
    answer_id INT AUTO_INCREMENT,
    answer_text VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    PRIMARY KEY (answer_id)
    )`;

pool.query(answer, (err, results2) => {
  if (err) throw err;
  console.log("answer, table created");
});

module.exports = pool;
