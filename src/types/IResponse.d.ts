type IResponse<T> = {
  data: T;
  status: number;
  message: string;
};

export default IResponse;
