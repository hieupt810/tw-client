export type IMe = {
  id: string;
  name: string;
  avatar: string;
};

export type IMeResponse = {
  data: IMe;
  success: boolean;
};
