global.app = express();
global.Router = express.Router;
// Define Here
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

global.Sentry.init({
  dsn:
    "https://6e210f1d9aa24812b0d90b7337ccc204@o442642.ingest.sentry.io/5414980"
});
global.app.use(global.Sentry.Handlers.requestHandler());
global.app.use(global.Sentry.Handlers.errorHandler());

global.ValidateRequest = validationObj => {
  return (req, res, next) => {
    const errorData = {};
    _.each(validationObj, (schema, key) => {
      const validate = ajv.compile(schema);
      const dataToValidate = req[key];
      var valid = validate(dataToValidate);
      if (!valid) {
        errorData[key] = validate.errors;
      }
    });
    if (!_.isEmpty(errorData)) {
      res.status(400).json(errorData);
    } else {
      next();
    }
  };
};
