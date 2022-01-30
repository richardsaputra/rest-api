const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

connection.connect((err) => {
  if (err) console.log(err);
  console.log(`Terkoneksi ke dabase ${process.env.DB_NAME}`);
});

module.exports = connection;
