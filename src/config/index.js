const convict = require('convict');
require('dotenv').config();

convict.addFormat(require('convict-format-with-validator').ipaddress);

const config = convict({
  port: {
    doc: 'The port to bind',
    format: 'port',
    default: 3606,
    env: 'PORT',
  },
});

config.validate({ allowed: 'strict' });

module.exports = config;
