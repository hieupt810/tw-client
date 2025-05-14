import { AuthRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IMe } from '@/types/IMe';
import { ISignInSchema } from '@/types/ISignInSchema';
import { ISignUpSchema } from '@/types/ISignUpSchema';
import { ITokenPair } from '@/types/IToken';

export class AuthService {
  static signIn(values: ISignInSchema) {
    return api.post(AuthRoutes.SIGN_IN, { json: values }).json<ITokenPair>();
  }

  static signUp(values: ISignUpSchema) {
    const { fullName, email, password } = values;
    return api
      .post(AuthRoutes.SIGN_UP, { json: { fullName, email, password } })
      .json();
  }

  static me() {
    return api.get(AuthRoutes.ME).json<IMe>();
  }
}
