import { AuthRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IMe } from '@/types/IMe';
import { ISignInSchema } from '@/types/ISignInSchema';
import { ISignUpSchema } from '@/types/ISignUpSchema';
import { ITokenPair } from '@/types/IToken';

export class AuthService {
  static async postSignIn(values: ISignInSchema) {
    const response = await api
      .post(AuthRoutes.SIGN_IN, { json: values })
      .json<ITokenPair>();
    return response;
  }

  static async postSignUp(values: ISignUpSchema) {
    const { name, email, password } = values;
    const response = await api
      .post(AuthRoutes.SIGN_UP, { json: { name, email, password } })
      .json();
    return response;
  }

  static async getMe() {
    const response = await api.get(AuthRoutes.ME).json<IMe>();
    return response;
  }
}
