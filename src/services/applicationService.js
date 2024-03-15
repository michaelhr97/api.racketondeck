const application = require('../models/application');

/**
 * Service class for application-related operations.
 */
class applicationService {
  /**
   * Creates a new application.
   * @param {object} data - The data for creating the application.
   * @returns {Promise<Object>} A promise that resolves with the created application.
   */
  static async create(data) {
    return application.create(data, { raw: true });
  }

  /**
   * Finds an application by id.
   * @param {string} id - The id of the application to find.
   * @returns {Promise<Object|null>} A promise that resolves to the found application object or null if not found.
   */
  static async findById(id) {
    return application.findOne({ where: { id }, raw: true });
  }
}

module.exports = applicationService;
