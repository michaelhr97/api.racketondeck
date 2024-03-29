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

  /**
   * Updates an existing application.
   * @param {string} id - The ID of the application to update.
   * @param {object} data - The updated data for the application.
   * @returns {Promise<Object>} A promise that resolves with the updated application.
   */
  static async update(id, data) {
    const updatedApplication = await application.update(data, { where: { id }, raw: true, returning: true });
    return updatedApplication[1][0];
  }

  /**
   * Deletes an application by id.
   * @param {string} id - The id of the application to delete.
   */
  static async delete(id) {
    await application.destroy({ where: { id } });
  }
}

module.exports = applicationService;
