import spacetradersApi from '@/api/spacetraders.api';
import { PagedResponseData, ResponseData } from '@/api/misc.types';
import { Contract } from '@/api/contract/contract.model';
import { AcceptContractResponse } from '@/api/contract/contract-response.model';

const contractApi = {
  getMyContracts: (limit: number, page: number) =>
    `my/contracts?page=${page}&limit=${limit}`,
  acceptContract: (id: string) => `my/contracts/${id}/accept`,
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

  acceptContract(
    contractId: string,
  ): Promise<ResponseData<AcceptContractResponse>> {
    return spacetradersApi
      .post(contractApi.acceptContract(contractId))
      .then((res) => res.data)
      .catch((ex) => {
        console.log(ex);
      });
  },
};
