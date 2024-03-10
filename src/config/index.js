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
  crypto: {
    saltRounds: {
      doc: 'The salts rounds to generate hash',
      format: 'int',
      default: 10,
      env: 'SALTROUNDS',
    },
    privateKey: {
      doc: 'The private key to sign and generate a token',
      format: '*',
      default: 'Ek5z6VQueJ2bSw8GaZ9y4P',
      env: 'PRIVATEKEY',
    },
    expiresIn: {
      doc: 'The time token expires',
      format: '*',
      default: '1d',
      env: 'EXPIRESIN',
    },
  },
  sequelize: {
    database: {
      doc: 'The name of the database',
      format: '*',
      default: 'racketondeck',
      env: 'SEQUELIZE_DATABASE',
    },
    username: {
      doc: 'The username of the database',
      format: '*',
      default: 'racketondeck',
      env: 'SEQUELIZE_USERNAME',
    },
    password: {
      doc: 'The password of the database',
      format: '*',
      default: 'racketondeck',
      env: 'SEQUELIZE_PASSWORD',
    },
  },
});

config.validate({ allowed: 'strict' });

module.exports = config;
