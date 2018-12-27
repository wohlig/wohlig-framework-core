global.app = express();
global.port = 3000;
global.Router = express.Router;
// Define Here
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

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
