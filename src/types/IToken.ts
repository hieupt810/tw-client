export type ITokenPair = {
  access_token: string;
  refresh_token: string;
};

export type IAccessToken = Omit<ITokenPair, 'refresh_token'>;
