import * as React from "react";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import jwt from "jsonwebtoken";
import TokenUtil from "../utils/TokenUtils";
// import UserType from "../models/User/UserTypeModel";
// import UserSelection from "../pages/UserSelection/UserSelection.page";
// import { getUserId } from "../util/UsersUtil";

interface PrivateRouteProps {
  token: string;
  render: React.FC;
  path: string;
  exact: boolean;
  userSelectedNotRequired?: boolean;
  //roles?: UserType[];
}

// const verifyRole = (role: UserType[], auth: any): boolean => {
//   if (role === undefined || role.length === 0) return true;
//   //const userId = getUserId();
//   const userId = "";
//   return userId ? role.includes(auth.tokenParsed?.["accounts"][userId]) : false;
// };

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = (props) => {
  const { token, path, exact, userSelectedNotRequired, render } = props;
  const location = useLocation();
  const history = useHistory();

  //   auth?.updateToken(30);
  const decodedToken: any = jwt.decode(TokenUtil.getToken());
  if (
    decodedToken &&
    (decodedToken.exp === undefined ||
      decodedToken.exp > new Date().getTime() / 1000)
  ) {
    //     // If No User is selected userSelection is required
    //     // (if userSelectedNotRequired was not sent, UserSelection is mandatory)
    //     const selectedUser = getUserId();
    //     if (
    //       (!userSelectedNotRequired && !selectedUser) ||
    //       (!userSelectedNotRequired && selectedUser === "null")
    //     ) {
    //       return <UserSelection />;
    //     }

    //     // If user don't have permission for Role
    //     if (roles && !verifyRole(roles, auth)) {
    //       return (
    //         <Redirect
    //           to={{
    //             pathname: "/",
    //             state: { from: location },
    //           }}
    //         />
    //       );
    //     }

    // if (auth?.isTokenExpired()) {
    //   auth
    //     .updateToken(5)
    //     .then((data) => {
    //       localStorage.setItem("token", auth.token || "");
    //       localStorage.setItem("kc_refreshToken", auth.refreshToken || "");
    //     })
    //     .catch(() => {
    //       localStorage.setItem("token", "");
    //       history.push("/login");
    //     });
    // }

    // otherwise render route
    return <Route path={path} exact={exact} component={render} />;
  }

  // If user is not autenticated, redirect to login
  return (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
};

export default PrivateRoute;
