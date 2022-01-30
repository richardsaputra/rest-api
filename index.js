require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

require("./router/forum-router")(app);
require("./router/anggota-router")(app);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Aplikasi berhasil dijalankan - http://${process.env.HOST}:${process.env.PORT}`
  );
});
