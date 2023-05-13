import axios from 'axios';
import authService from '@/services/auth.service';
import {
  AgentsApi,
  Configuration,
  ContractsApi,
  DefaultApi,
  FactionsApi,
  FleetApi,
  SystemsApi,
} from '../../../spacetraders-sdk';
import { useRouter } from 'vue-router';
import router from '../router';

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

const config = new Configuration({});

export default {
  agents: new AgentsApi(config, undefined, instance),
  contracts: new ContractsApi(config, undefined, instance),
  defaultApi: new DefaultApi(config, undefined, instance),
  factions: new FactionsApi(config, undefined, instance),
  fleet: new FleetApi(config, undefined, instance),
  systems: new SystemsApi(config, undefined, instance),
};
