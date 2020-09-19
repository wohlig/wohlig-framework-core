global.app = express();
Sentry.init({
  dsn: process.env["sentry_dsn"],
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express(),
  ],
  tracesSampleRate: 1.0, // Be sure to lower this in production
});
app.use(Sentry.Handlers.requestHandler()(req, res, next));
app.use(Sentry.Handlers.tracingHandler()(req, res, next));
global.Router = express.Router;
// Define Here
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
global.ValidateRequest = (validationObj) => {
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
app.use(Sentry.Handlers.errorHandler()(req, res, next));
