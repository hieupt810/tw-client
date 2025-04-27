export type IError = {
  error:
    | string
    | {
        [key: string]: string[];
      };
};
