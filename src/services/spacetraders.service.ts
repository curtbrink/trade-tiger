import axios from 'axios';
import authService from './auth.service';

const instance = axios.create({});

// example retry logic for 429 rate-limit errors
instance.interceptors.response.use(undefined, async (error) => {
  const apiError = error.response?.data?.error;

  if (error.response?.status === 429) {
    const retryAfter = error.response.headers['retry-after'];

    await new Promise((resolve) => {
      setTimeout(resolve, retryAfter * 1000);
    });

    return instance.request(error.config);
  }

  return error.response;
});

instance.interceptors.request.use(
  async (request) => {
    if (authService.hasAuthToken()) {
      request.headers['Authorization'] = 'Bearer ' + authService.getAuthToken();
    }
    return request;
  },
  (error) => Promise.reject(error),
);

export default instance;
