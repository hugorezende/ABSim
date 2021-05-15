import {
  DesktopOutlined,
  FireOutlined,
  LogoutOutlined,
  DotChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import * as React from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import logo from "../../../assets/images/logo.png";
import TokenUtil from "../../../utils/TokenUtils";
interface ISideMenuProps {}

const SideMenu: React.FunctionComponent<ISideMenuProps> = (props) => {
  const history = useHistory();
  const location = useLocation();
  const logout = () => {
    TokenUtil.logout();
    history.push("/");
  };

  return (
    <Sider width={200} className='site-layout-background'>
      <LogoWrapper
        style={{ padding: "20px", background: "#141414", fontWeight: 600 }}
      >
        <img src={logo}></img>ABSim
      </LogoWrapper>

      <Menu
        mode='inline'
        selectedKeys={[location.pathname]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key='/' icon={<FireOutlined />}>
          <NavLink to='/'>Dashboard</NavLink>
        </Menu.Item>

        <SubMenu key='sub1' title='Simulations' icon={<DotChartOutlined />}>
          <Menu.Item key='/simulation'>
            <NavLink to='/simulation'> My Simulations</NavLink>
          </Menu.Item>
          <Menu.Item key='/simulation/new'>
            <NavLink to='/simulation/new'> New Simulation</NavLink>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key='3' icon={<DesktopOutlined />}>
          Configurations
        </Menu.Item>
        <Menu.Item key='4' icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

const LogoWrapper = styled.div`
  img {
    width: 40px;
    margin-right: 20px;
  }
  font-size: 18px;
`;

export default SideMenu;
