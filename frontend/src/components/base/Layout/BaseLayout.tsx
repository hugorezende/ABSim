import { Breadcrumb } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { MainRoutes } from "../../../routes/Routes";
import TokenUtil from "../../../utils/TokenUtils";
import BreadCrumbs from "../Breadcrumbs/Breadcrumbs";
import SideMenu from "../SideMenu/SideMenu";

interface IBaseLayoutProps {}

const BaseLayout: React.FunctionComponent<IBaseLayoutProps> = (props) => {
  const { children } = props;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenu />
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          <div style={{ marginLeft: "auto", width: "60px" }}>
            <Avatar src='https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png'></Avatar>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <BreadCrumbs routes={MainRoutes} />
          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default BaseLayout;
