process.env.NODE_ENV = !process.env.NODE_ENV
  ? "development"
  : process.env.NODE_ENV;
global.pwd = __dirname + "/../..";
global.env = require(pwd + "/config/env/" + process.env.NODE_ENV).default;
require("./lib/globals");
require(pwd + "/config/globals");
require("./lib/mongoose.js");
require("./lib/express.js");
require(pwd + "/config/middleware.js");
require("./lib/responses.js");
require("./lib/controllers.js");
require("./lib/models.js");
require("./lib/views.js");
require("./lib/test.js");

app.listen(env.port, () => {
  console.log(`Server Started at Port ${env.port}`);
  require(pwd + "/config/cron");
});
