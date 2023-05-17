import spacetradersApi from '@/api/spacetraders.api';
import { PagedResponseData } from '@/api/misc.types';
import { Ship } from '@/api/ship/ship.model';

const shipApi = {
  getMyShips: (limit: number, page: number) =>
    `my/ships?page=${page}&limit=${limit}`,
};

export default {
  getMyShips(
    limit: number = 20,
    page: number = 1,
  ): Promise<PagedResponseData<Ship>> {
    return spacetradersApi
      .get(shipApi.getMyShips(limit, page))
      .then((res) => res.data)
      .catch((ex) => {
        console.log(ex);
      });
  },
};
