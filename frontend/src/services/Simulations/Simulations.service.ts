import { AxiosRequestConfig } from "axios";
import { ConfigApi } from "../config.api";
import APIServices from "../util/ApiService";
import ServiceResponse from "../util/ServiceResponse";

export default class SimulationsService {
  public static list(): Promise<ServiceResponse<any>> {
    const axiosConfig: AxiosRequestConfig = {
      ...ConfigApi.getBearerConfig(),
      url: "/simulation/list",
      method: "GET",
    };
    return APIServices.request<any>(axiosConfig);
  }

  public static create(payload: any): Promise<ServiceResponse<any>> {
    const axiosConfig: AxiosRequestConfig = {
      ...ConfigApi.getBearerConfig(),
      url: "/simulation/create",
      method: "POST",
      data: payload,
    };
    return APIServices.request<any>(axiosConfig);
  }
}
