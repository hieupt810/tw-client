export type ITokenPair = {
  access_token: string;
  refresh_token: string;
};

export type ITokenPairResponse = {
  data: ITokenPair;
  success: boolean;
};

export type IAccessToken = Omit<ITokenPair, 'refresh_token'>;

export type IAccessTokenResponse = {
  data: IAccessToken;
  success: boolean;
};
