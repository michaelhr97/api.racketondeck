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
}

module.exports = applicationService;
