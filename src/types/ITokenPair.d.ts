import IResponse from './IResponse';

export type ITokenPair = IResponse<{
  access_token: string;
  refresh_token: string;
}>;
