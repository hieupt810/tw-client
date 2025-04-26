type IErrorResponse = {
  error:
    | string
    | {
        [key: string]: string[];
      };
  success: boolean;
};
