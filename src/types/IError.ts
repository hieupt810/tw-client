export interface IError {
  error: string;
}

export interface IValidationError {
  error:
    | {
        [key: string]: string[];
      }
    | string;
}
