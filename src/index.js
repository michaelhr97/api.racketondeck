const app = require('express')();

const fs = require('fs');
const cors = require('cors');
const path = require('path');
const yaml = require('js-yaml');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const openApiValidator = require('express-openapi-validator');

const config = require('./config');
const logger = require('./utils/logger');

const openapiDoc = yaml.load(fs.readFileSync(path.join(__dirname, 'openapi', 'api.yml')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  openApiValidator.middleware({
    apiSpec: path.join(__dirname, 'openapi', 'api.yml'),
    operationHandlers: path.join(__dirname, 'controllers'),
  })
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDoc));

const PORT = config.get('port');
app.listen(PORT, () => logger.info(`[RacketOnDeck] Server listening on port ${PORT}`));

app.get('/', (req, res) => res.status(200).send('Welcome to RacketOnDeck'));

module.exports = app;
