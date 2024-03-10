const rolesTypes = require('../constants/rolesTypes');
const db = require('../lib/db');
const account = require('../models/account');
const user = require('../models/user');

/**
 * Service class for user authentication operations.
 */
class authService {
  /**
   * Creates a new user along with an associated account.
   * @param {Object} data - The data for creating the user.
   * @returns {Promise<Object>} A promise that resolves to the created user data.
   */
  static async createUserWithAssociatedAccount(data) {
    const transaction = await db.transaction();

    const newAccount = await account.create({}, { transaction });
    const newAccountData = await newAccount.get({ plain: true });

    const newUserPayload = {
      ...data,
      accountId: newAccountData.id,
      roleType: rolesTypes.ACCOUNT_OWNER,
    };
    const newUser = await user.create(newUserPayload, { transaction });

    await transaction.commit();
    return newUser.get({ plain: true });
  }
}

module.exports = authService;
