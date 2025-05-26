export interface IAccessToken {
  access_token: string;
}

export interface ITokenPair extends IAccessToken {
  refresh_token: string;
}
