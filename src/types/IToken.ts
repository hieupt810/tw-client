export interface IAccessToken {
  accessToken: string;
}

export interface ITokenPair extends IAccessToken {
  refreshToken: string;
}
