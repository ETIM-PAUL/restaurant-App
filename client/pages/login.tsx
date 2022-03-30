import React from "react";
import { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Input, Button, Checkbox } from "antd";
import Link from "next/link";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { FaUserAlt, FaLock } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";
import { Context } from "./context/index";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //state
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (user !== null) Router.push("/");
  }, [user]);

  const loginUser = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/authentication/login`,
        {
          email,
          password,
        }
      );

      dispatch({
        type: "LOGIN",
        payload: data,
      });
      dispatch({
        type: "SETUSER",
        payload: data.userdetails,
      });
      window.localStorage.setItem("user", JSON.stringify(data));
      Router.push("/");
      location.reload();
    } catch (error) {
      toast(error.response.data.message);
      console.log(error.request);
    }
  };

  return (
    <>
      <div className="jumbotron text-center bg-success square">Login</div>
      <br />
      <br />

      <Row className="loginShadow">
        <Col className="loginRow">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={loginUser}
          >
            <label>Email</label>
            <Form.Item name="email">
              <Input
                name="email"
                value={email}
                type="email"
                required
                // style={{ width: "20rem" }}
                size="large"
                prefix={<FaUserAlt className="site-form-item-icon" />}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <label>Password</label>
            <Form.Item name="password">
              <Input.Password
                name="password"
                value={password}
                required
                size="large"
                prefix={<FaLock className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <AiTwotoneEye /> : <AiTwotoneEyeInvisible />
                }
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                block
                size="large"
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Not yet registered?
              <Link href="/register"> Register</Link>
            </Form.Item>

            <Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password?
              </a>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
