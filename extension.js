
const bodyParser = require('body-parser');

module.exports.extendApp = ({ app }) => {

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

  let routes = require('./routes');
  routes(app);
}