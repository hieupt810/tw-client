import IResponse from './IResponse';

export type ITokenPair = IResponse<{
  accessToken: string;
  refreshToken: string;
}>;
