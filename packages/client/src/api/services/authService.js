import endpoints from '../endpoints';
import HttpClient from '../httpClient';

const authService = {};

const register = async (data) => {
  return HttpClient.post(endpoints.REGISTER, data);
};

authService.register = register;

export default authService;
