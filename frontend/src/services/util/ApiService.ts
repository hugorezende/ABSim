import Axios, { AxiosRequestConfig } from "axios";
import ServiceResponse from "./ServiceResponse";

class APIServices<T> {
  static async request<T>(
    axiosConfig: AxiosRequestConfig
  ): Promise<ServiceResponse<T>> {
    return Axios.request(axiosConfig)
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          return ServiceResponse.success(response.data, "");
        }

        return ServiceResponse.error(response.data, "");
      })
      .catch((error) => {
        // If unautorized try refresh token and request again
        if (error.response?.status === 401) {
          //   return TokenUtil.refreshToken().then(() => {
          //     // Replace previous axiosConfig with new token
          //     const newAxiosConfig = {
          //       ...axiosConfig,
          //       headers: {
          //         ...axiosConfig.headers,
          //         Authorization: `Bearer ${localStorage.getItem('token')}`,
          //       },
          //     };
          //     // Resend request
          //     return Axios.request(newAxiosConfig).then((response) => {
          //       if (response.status >= 200 && response.status < 400) {
          //         return ServiceResponse.success(response.data, '');
          //       }
          //       return ServiceResponse.error(response.data, '');
          //     });
          //   });
        }
        return ServiceResponse.error(error, error.response?.data?.message);
      });
  }
}

export default APIServices;
