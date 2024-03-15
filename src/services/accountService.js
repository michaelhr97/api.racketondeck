const account = require('../models/account');

/**
 * Service class for account-related operations.
 */
class accountService {
  /**
   * Finds an account by id.
   * @param {string} id - The id of the account to find.
   * @returns {Promise<Object|null>} A promise that resolves to the found account object or null if not found.
   */
  static async findById(id) {
    return account.findOne({ where: { id }, raw: true });
  }
}

module.exports = accountService;
