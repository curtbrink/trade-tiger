import spacetradersApi from '@/api/spacetraders.api';
import { PagedResponseData } from '@/api/misc.types';
import { Contract } from '@/api/contract/contract.model';

const contractApi = {
  getMyContracts: (limit: number, page: number) =>
    `my/contracts?page=${page}&limit=${limit}`,
};

export default {
  getMyContracts(
    limit: number = 20,
    page: number = 1,
  ): Promise<PagedResponseData<Contract>> {
    return spacetradersApi
      .get(contractApi.getMyContracts(limit, page))
      .then((res) => res.data)
      .catch((ex) => {
        console.log(ex);
      });
  },
};
