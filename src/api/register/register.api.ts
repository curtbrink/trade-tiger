import { RegisterRequest } from '@/api/register/register-request.model';
import spacetradersApi from '@/api/spacetraders.api';
import { RegisterResponse } from '@/api/register/register-response.model';
import { ResponseData } from '@/api/misc.types';

const registerApi = {
  register: () => 'register',
};

export default {
  register(
    registerRequest: RegisterRequest,
  ): Promise<ResponseData<RegisterResponse>> {
    return spacetradersApi
      .post(registerApi.register(), registerRequest)
      .then((res) => res.data)
      .catch((ex) => {
        console.log(ex);
      });
  },
};
