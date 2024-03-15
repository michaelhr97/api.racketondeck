const _ = require('lodash');
const isemail = require('isemail');

const errorCodes = require('../constants/errorCodes.js');
const errorMessages = require('../constants/errorMessages.js');
const cryptoHelper = require('../helpers/cryptoHelper.js');
const responseHelper = require('../helpers/responseHelper.js');
const userService = require('../services/userService.js');
const authService = require('../services/authService.js');

/**
 * Controller class for handling authentication-related requests.
 */
class authController {
  /**
   * Handler for POST /auth/register
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  static async register(req, res) {
    const payload = req.body;

    if (!isemail.validate(payload.email)) {
      responseHelper.badRequest(res, errorMessages.EMAIL_FORMAT_INVALID, errorCodes.BAD_REQUEST);
      return;
    }

    const user = await userService.findByEmail(payload.email);
    if (user) {
      responseHelper.conflict(res, errorMessages.EMAIL_ALREADY_EXISTS, errorCodes.CONFLICT);
      return;
    }

    payload.password = await cryptoHelper.hash(payload.password);
    let data = await authService.createUserWithAssociatedAccount(payload);
    data = _.omit(data, 'password');

    responseHelper.created(res, data);
  }

  /**
   * Handler for POST /auth/login
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  static async loginWithEmailAndPassword(req, res) {
    const payload = req.body;

    if (!isemail.validate(payload.email)) {
      responseHelper.badRequest(res, errorMessages.EMAIL_FORMAT_INVALID, errorCodes.BAD_REQUEST);
      return;
    }

    const user = await userService.findByEmail(payload.email);
    if (!user) {
      responseHelper.notFound(res, errorMessages.USER_NOT_FOUND, errorCodes.NOT_FOUND);
      return;
    }

    const areCredentialsCorrect = await cryptoHelper.comparePasswords(payload.password, user.password);
    if (!areCredentialsCorrect) {
      responseHelper.badRequest(res, errorMessages.CREDENTIALS_NOT_CORRECT, errorCodes.BAD_REQUEST);
      return;
    }

    let data = _.omit(user, 'password');
    data = await cryptoHelper.sign(data);

    responseHelper.ok(res, data);
  }
}

module.exports = authController;
