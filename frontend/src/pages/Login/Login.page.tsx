import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import * as React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import logo from "../../assets/images/logo.png";
import AuthenticationService from "../../services/Auth/Auth.service";
import TokenUtil from "../../utils/TokenUtils";
import { useHistory } from "react-router-dom";
import { useState } from "react";

interface ILoginPageProps {
  auth?: string;
  routeFrom?: string;
}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const history = useHistory();
  const [errorLogin, setErrorLogin] = useState(false);
  const onSubmit = (data: { user: string; password: string }) => {
    setErrorLogin(false);
    AuthenticationService.login(data.user, data.password).then((res) => {
      if (res.success) {
        TokenUtil.saveToken(res.data.accessToken);
        history.push("/");
      } else {
        setErrorLogin(true);
      }
    });
  };

  return (
    <>
      <Row justify='center' align='top'>
        <Col
          span={12}
          style={{
            height: "100vh",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1507919981044-3b672b208db9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
          }}
        ></Col>
        <Col
          span={12}
          style={{ display: "flex", alignItems: "center", height: "100vh" }}
        >
          <div style={{ padding: "30px", width: "500px", margin: "0 auto" }}>
            <LogoWrapper style={{ textAlign: "center", fontWeight: 700 }}>
              <img src={logo}></img>ABSim
            </LogoWrapper>
            <h3>Login</h3>
            <div style={{ fontStyle: "italic" }}>
              <p>admin@admin.com</p>
              <p>admin</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form.Item
                label='Username'
                name='user'
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <input ref={register} name='user' />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <input ref={register} type='password' name='password' />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  LOGIN
                </Button>
              </Form.Item>
              {errorLogin && <ErrorBox>Wrong username or password</ErrorBox>}
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
};

const ErrorBox = styled.div`
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  background-color: #842929;
`;
const LogoWrapper = styled.div`
  img {
    width: 50px;
    margin-right: 20px;
  }
  font-size: 30px;
`;

export default LoginPage;
