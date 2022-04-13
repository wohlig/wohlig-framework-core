global.app = express();
global.port = 3000;
global.Router = express.Router;
// Define Here
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
const cors = require("cors");
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
