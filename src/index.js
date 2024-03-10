const app = require('express')();

const config = require('./config');
const logger = require('./utils/logger');

const PORT = config.get('port');
app.listen(PORT, () => logger.info(`[RacketOnDeck] Server listening on port ${PORT}`));

app.get('/', (req, res) => res.status(200).send('Welcome to RacketOnDeck'));

module.exports = app;
