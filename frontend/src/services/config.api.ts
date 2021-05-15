import { AxiosRequestConfig } from "axios";

// Faking API endPoint
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export class ConfigApi {
  public static getConfig(): AxiosRequestConfig {
    return {
      baseURL: API_ENDPOINT,
      timeout: 10000,
    };
  }

  public static getBearerConfig(): AxiosRequestConfig {
    return {
      baseURL: API_ENDPOINT,
      timeout: 10000,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  }
}
