import { AxiosRequestConfig } from "axios";
import { ConfigApi } from "../config.api";
import APIServices from "../util/ApiService";
import ServiceResponse from "../util/ServiceResponse";

export default class AuthenticationService {
  public static login(
    user: string,
    password: string
  ): Promise<ServiceResponse<any>> {
    const axiosConfig: AxiosRequestConfig = {
      ...ConfigApi.getConfig(),
      url: "/auth/login",
      method: "POST",
      data: { user: user, password: password },
    };

    return APIServices.request<any>(axiosConfig);
  }
}
