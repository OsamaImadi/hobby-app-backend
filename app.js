const express = require("express");
var cors = require('cors')
const app = express();

app.use(cors())

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();

module.exports = app;
