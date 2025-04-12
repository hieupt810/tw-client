import IResponse from './IResponse';

export type IShortUser = {
  id: string;
  name: string;
  avatar: string;
};

export type IMe = IResponse<IShortUser>;
