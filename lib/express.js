global.app = express()
global.port = 3000
global.Router = express.Router;
// Define Here
const bodyParser = require('body-parser')
app.use(bodyParser.json())