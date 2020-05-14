const app = require("./app");
const winston = require("winston");

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  winston.info(`Listening on port ${port}`);
});
