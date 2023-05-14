import axios from 'axios';
import authService from './auth.service';
import { Configuration } from '../lib/spacetraders-sdk/configuration';
import { AgentsApi } from '../lib/spacetraders-sdk/api/agents-api';
import { ContractsApi } from '../lib/spacetraders-sdk/api/contracts-api';
import { DefaultApi } from '../lib/spacetraders-sdk/api/default-api';
import { FactionsApi } from '../lib/spacetraders-sdk/api/factions-api';
import { FleetApi } from '../lib/spacetraders-sdk/api/fleet-api';
import { SystemsApi } from '../lib/spacetraders-sdk/api/systems-api';

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
