import axios from 'axios';
import browserStorageService from '@/services/browser-storage.service';
import pThrottle from 'p-throttle';

const instance = axios.create({
  // replace this with the real API when the API itself is all built out
  baseURL: 'https://api.spacetraders.io/v2/',
});

instance.interceptors.response.use(undefined, async (error) => {
  const apiError = error.response?.data?.error;

  // if (error.response?.status === 429) {
  //   const retryAfter = error.response.headers['retry-after'];
  //
  //   await new Promise((resolve) => {
  //     setTimeout(resolve, retryAfter * 1000);
  //   });
  //
  //   return instance.request(error.config);
  // }

  return error.response;
});

instance.interceptors.request.use(
  async (request) => {
    if (browserStorageService.hasAuthToken()) {
      request.headers['Authorization'] =
        'Bearer ' + browserStorageService.getAuthToken();
    }
    return request;
  },
  (error) => Promise.reject(error),
);

const throttler = pThrottle({ limit: 2, interval: 1000 });

export default {
  get: throttler(instance.get),
  post: throttler(instance.post),
  patch: throttler(instance.patch),
};
