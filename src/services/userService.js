const user = require('../models/user');

/**
 * Service class for user-related operations.
 */
class userService {
  /**
   * Finds a user by email.
   * @param {string} email - The email of the user to find.
   * @returns {Promise<Object|null>} A promise that resolves to the found user object or null if not found.
   */
  static async findByEmail(email) {
    return user.findOne({ where: { email }, raw: true });
  }
}

module.exports = userService;
