class ServiceResponse<T> {
  public success: boolean;
  public data: T;
  public message: string;
  public httpCode?: number;

  constructor(
    success: boolean,
    data: any,
    message: string,
    httpCode: number | undefined | null
  ) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.httpCode = httpCode || (success ? 200 : 400);
  }

  public static success<T>(
    data: T,
    message = "",
    httpCode?: number
  ): ServiceResponse<T> {
    return new ServiceResponse(true, data, message, httpCode);
  }

  public static error<T>(
    data: T,
    errorMessage: string,
    httpCode?: number
  ): ServiceResponse<T> {
    return new ServiceResponse(false, data, errorMessage, httpCode);
  }
}

export default ServiceResponse;
