import {AxiosError} from "axios";

export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

/**
 * WeatherApiError contains the weather api error's code and message.
 * Please refer https://www.weatherapi.com/docs/
 */
export class WeatherApiError extends Error {
  code?: string;
  status?: number;
  response?: ApiErrorResponse;

  constructor(
    message: string,
    code?: string,
    status?: number,
    response?: ApiErrorResponse
  ) {
    super(message);
    this.code = code;
    this.status = status;
    this.response = response;
  }

  /**
   * Sets Response
   *
   * @param res {ApiResponse} - api response with error: {code, message}
   */
  setResponse(res: ApiErrorResponse) {
    this.response = res;
  }

  /**
   * Creates an instance of WeatherApiError
   *
   * @param error {AxiosError} - axios error object
   * @returns {@link WeatherApiError}
   */
  public static createApiError(error: AxiosError): WeatherApiError {
    const weatherApiError = new WeatherApiError(
      error.message,
      error.code,
      error.status
    );

    //if any error resposne data exist
    if (error?.response?.data) {
      weatherApiError.setResponse(error?.response?.data as ApiErrorResponse);
    }

    return weatherApiError;
  }
}
