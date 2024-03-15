const errorCodes = require('../constants/errorCodes.js');
const errorMessages = require('../constants/errorMessages.js');
const responseHelper = require('../helpers/responseHelper.js');
const accountService = require('../services/accountService');
const applicationService = require('../services/applicationService.js');

/**
 * Controller class for handling application requests.
 */
class applicationController {
  /**
   * Handler for POST /application
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  static async create(req, res) {
    const payload = req.body;

    const account = await accountService.findById(payload.accountId);
    if (!account) {
      responseHelper.notFound(res, errorMessages.ACCOUNT_NOT_FOUND, errorCodes.NOT_FOUND);
      return;
    }

    const data = await applicationService.create(payload);
    responseHelper.created(res, data);
  }

  /**
   * Handler for GET /application/{id}
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  static async findById(req, res) {
    const id = req.params.id;

    const application = await applicationService.findById(id);
    if (!application) {
      responseHelper.notFound(res, errorMessages.APPLICATION_NOT_FOUND, errorCodes.NOT_FOUND);
      return;
    }

    responseHelper.ok(res, application);
  }

  /**
   * Handler for PUT /application/{id}
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  static async update(req, res) {
    const id = req.params.id;
    const payload = req.body;

    const application = await applicationService.findById(id);
    if (!application) {
      responseHelper.notFound(res, errorMessages.APPLICATION_NOT_FOUND, errorCodes.NOT_FOUND);
      return;
    }

    const data = await applicationService.update(id, payload);
    responseHelper.ok(res, data);
  }
}

module.exports = applicationController;
