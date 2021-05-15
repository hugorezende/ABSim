export default class TokenUtil {
  public static saveToken(token: string) {
    localStorage.setItem("token", token || "");
  }
  public static getToken() {
    return localStorage.getItem("token") || "";
  }
  public static logout() {
    return localStorage.removeItem("token");
  }
}
