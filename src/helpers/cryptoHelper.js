const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config').get('crypto');

/**
 * A helper class for cryptographic operations such as hashing passwords and generating JWT tokens.
 */
class CryptoHelper {
  /**
   * Generates a hash for the provided text using bcrypt.
   * @param {string} text - The text to hash.
   * @returns {Promise<string>} A promise that resolves with the hashed text.
   */
  static async hash(text) {
    return bcrypt.hash(text, config.saltRounds);
  }

  /**
   * Compares a plaintext password with a hashed password.
   * @param {string} text - The plaintext password.
   * @param {string} hash - The hashed password to compare against.
   * @returns {Promise<boolean>} A promise that resolves with true if the passwords match, otherwise false.
   */
  static async comparePasswords(text, hash) {
    return bcrypt.compare(text, hash);
  }

  /**
   * Signs the provided data into a JWT token.
   * @param {Object} data - The data to include in the token.
   * @returns {Promise<string>} A promise that resolves with the signed JWT token.
   */
  static async sign(data) {
    return jwt.sign(data, config.privateKey, { expiresIn: config.expiresIn });
  }

  /**
   * Verifies the authenticity of a JWT token and decodes its payload.
   * @param {string} token - The JWT token to verify.
   * @returns {Object | string} The decoded payload if the token is valid, otherwise throws an error.
   */
  static verify(token) {
    return jwt.verify(token, config.privateKey);
  }
}

module.exports = CryptoHelper;
