import { AuthRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IMe } from '@/types/IMe';
import IMessage from '@/types/IMessage';
import { ISignInSchema } from '@/types/ISignInSchema';
import { ISignUpSchema } from '@/types/ISignUpSchema';
import { ITokenPair } from '@/types/ITokenPair';

export async function postSignIn(values: ISignInSchema): Promise<ITokenPair> {
  const response = await api
    .post(AuthRoutes.SIGN_IN, { json: values })
    .json<ITokenPair>();
  return response;
}

export async function postSignUp(values: ISignUpSchema): Promise<IMessage> {
  const { name, email, password } = values;
  const response = await api
    .post(AuthRoutes.SIGN_UP, { json: { name, email, password } })
    .json<IMessage>();
  return response;
}

export async function getMe(): Promise<IMe> {
  const response = await api.get(AuthRoutes.ME).json<IMe>();
  return response;
}
