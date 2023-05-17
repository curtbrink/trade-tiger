import { ResponseData } from '@/api/misc.types';
import spacetradersApi from '@/api/spacetraders.api';
import { Agent } from '@/api/agent/agent.model';

const agentApi = {
  getMyAgent: () => 'my/agent',
};

export default {
  getMyAgent(): Promise<ResponseData<Agent>> {
    return spacetradersApi
      .get(agentApi.getMyAgent())
      .then((res) => res.data)
      .catch((ex) => {
        console.log(ex);
      });
  },
};
