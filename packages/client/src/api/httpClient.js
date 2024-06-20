import axios from 'axios';

/**
 * Creates an Axios instance configured with a base URL.
 * The base URL is sourced from the environment variable REACT_APP_API_URL.
 *
 * @constant {AxiosInstance} HttpClient - The Axios instance with custom configuration.
 */

const HttpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

/**
 * Intercepts the response to extract data or handle errors.
 * If the response is successful, it returns the data directly.
 * If there is an error and the error response is available, it rejects with the error response data.
 * Otherwise, it rejects with the error itself.
 *
 * @param {Object} response - The Axios response object.
 * @returns {Object} - The data from the response.
 * @throws {Object} - The error response data or the error object.
 */
HttpClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error?.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

export default HttpClient;
