import { toast } from 'sonner';

import api from '@/api';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants';
import { AuthRoutes } from '@/constants/routes';
import IMessage from '@/types/IMessage';
import { ITokenPair } from '@/types/ITokenPair';

export async function postSignIn(values: { email: string; password: string }) {
  try {
    const response = await api
      .post(AuthRoutes.SIGN_IN, { json: values })
      .json<ITokenPair>();
    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      toast.success(response.message);
      return true;
    }
  } catch {
    return false;
  }
}

export async function postSignUp(values: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const response = await api
      .post(AuthRoutes.SIGN_UP, { json: values })
      .json<IMessage>();
    if (response.status === 200) {
      toast.success(response.message);
      return true;
    }
  } catch {
    return false;
  }
}
