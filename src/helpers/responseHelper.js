const _ = require('lodash');
const { ReasonPhrases, StatusCodes } = require('http-status-codes');

const errorCodes = require('../constants/errorCodes');

/**
 * A helper class for handling HTTP responses.
 */
class ResponseHelper {
  /**
   * Sends a successful response (HTTP status code 200 OK).
   * @param {Response} res - The response object.
   * @param {Object?} [data=null] - The data to send in the response body.
   * @param {number?} [count=null] - The count of data items
   */
  static ok(res, data = null, count = null) {
    const response = {
      statusCode: StatusCodes.OK,
      message: ReasonPhrases.OK,
    };

    if (!_.isNil(data)) {
      response.data = data;
    }

    if (!_.isNil(count)) {
      response.count = count;
    }

    res.status(response.statusCode).json(response);
  }

  /**
   * Sends a response indicating a resource was created (HTTP status code 201 Created).
   * @param {Response} res - The response object.
   * @param {Object?} [data=null] - The data to send in the response body.
   */
  static created(res, data = null) {
    const response = {
      statusCode: StatusCodes.CREATED,
      message: ReasonPhrases.CREATED,
    };

    if (!_.isNil(data)) {
      response.data = data;
    }

    res.status(response.statusCode).json(response);
  }

  /**
   * Sends a response indicating a bad request (HTTP status code 400 Bad Request).
   * @param {Response} res - The response object.
   * @param {string} [message='Bad Request'] - The error message.
   * @param {string} [errorCode='400'] - The error code.
   */
  static badRequest(res, message = ReasonPhrases.BAD_REQUEST, errorCode = errorCodes.BAD_REQUEST) {
    const response = {
      statusCode: StatusCodes.BAD_REQUEST,
      message,
      errorCode,
    };

    res.status(response.statusCode).json(response);
  }

  /**
   * Sends a response indicating unauthorized access (HTTP status code 401 Unauthorized).
   * @param {Response} res - The response object.
   * @param {string} [message='Unauthorized'] - The error message.
   * @param {string} [errorCode='401'] - The error code.
   */
  static unAuthorized(res, message = ReasonPhrases.UNAUTHORIZED, errorCode = errorCodes.UNAUTHORIZED) {
    const response = {
      statusCode: StatusCodes.UNAUTHORIZED,
      message,
      errorCode,
    };

    res.status(response.statusCode).json(response);
  }

  /**
   * Sends a response indicating forbidden access (HTTP status code 403 Forbidden).
   * @param {Response} res - The response object.
   * @param {string} [message='Forbidden'] - The error message.
   * @param {string} [errorCode='403'] - The error code.
   */
  static forbidden(res, message = ReasonPhrases.FORBIDDEN, errorCode = errorCodes.FORBIDDEN) {
    const response = {
      statusCode: StatusCodes.FORBIDDEN,
      message,
      errorCode,
    };

    res.status(response.statusCode).json(response);
  }

  /**
   * Sends a response indicating resource not found (HTTP status code 404 Not Found).
   * @param {Response} res - The response object.
   * @param {string} [message='Not Found'] - The error message.
   * @param {string} [errorCode='404'] - The error code.
   */
  static notFound(res, message = ReasonPhrases.NOT_FOUND, errorCode = errorCodes.NOT_FOUND) {
    const response = {
      statusCode: StatusCodes.NOT_FOUND,
      message,
      errorCode,
    };

    res.status(response.statusCode).json(response);
  }

  /**
   * Sends a response indicating a conflict (HTTP status code 409 Conflict).
   * @param {Response} res - The response object.
   * @param {string} [message='Conflict'] - The error message.
   * @param {string} [errorCode='409'] - The error code.
   */
  static conflict(res, message = ReasonPhrases.CONFLICT, errorCode = errorCodes.CONFLICT) {
    const response = {
      statusCode: StatusCodes.CONFLICT,
      message,
      errorCode,
    };

    res.status(response.statusCode).json(response);
  }
}

module.exports = ResponseHelper;
