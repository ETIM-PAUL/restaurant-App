import { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Tooltip,
  InputNumber,
  Button,
  Checkbox,
  Select,
} from "antd";
import Link from "next/link";
import { AiTwotoneEyeInvisible, AiTwotoneEye } from "react-icons/ai";
import { EnumType } from "typescript";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";
import { Context } from "./context";

const Login = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [role, setRole] = useState("");

  const clickedCategory = (value: string) => {
    setRole(value);
  };
  // console.log(category);
  useEffect(() => {
    if (user !== null) Router.push("/");
  }, [user]);

  const addUser = async (e: { preventDefault: () => void }) => {
    console.log({ name, role });
    try {
      const { data } = await axios.post(
        `http://localhost:5000/authentication/register`,
        {
          name,
          email,
          password,
          address,
          contactNo,
          role,
        }
      );
      toast.success("Registration successful. Please login");
      Router.push("/login");
    } catch (error) {
      console.log(error.response);
      toast.error(
        error.response.data.message[0] || error.response.data.message
      );
    }
  };

  return (
    <>
      <div className="jumbotron text-center bg-success">Register</div>;
      <Row className="registerRow" justify="center">
        <Col>
          <Form onFinish={addUser} autoComplete="off">
            <Form.Item name="name">
              <Tooltip
                trigger={["focus"]}
                title="Enter your name"
                placement="topLeft"
              >
                <Input
                  required
                  name="name"
                  value={name}
                  placeholder="Name"
                  size="large"
                  style={{ width: "400px" }}
                  onChange={(e) => setName(e.target.value)}
                />
              </Tooltip>
            </Form.Item>

            <Form.Item name="email">
              <Tooltip
                trigger={["focus"]}
                title="Enter Email"
                placement="topLeft"
              >
                <Input
                  required
                  value={email}
                  type="email"
                  placeholder="Email Address"
                  size="large"
                  style={{ width: "400px" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Tooltip>
            </Form.Item>

            <Form.Item name="password">
              <Input.Password
                required
                value={password}
                // pattern="[0-9a-fA-F]{4,8}"
                autoComplete="new-password"
                type="password"
                size="large"
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <AiTwotoneEye /> : <AiTwotoneEyeInvisible />
                }
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item name="address">
              <Tooltip
                trigger={["focus"]}
                title="Enter your address"
                placement="topLeft"
              >
                <Input
                  required
                  value={address}
                  placeholder="Residential Address"
                  size="large"
                  style={{ width: "400px" }}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Tooltip>
            </Form.Item>

            <Form.Item name="number">
              <Tooltip
                trigger={["focus"]}
                title="Phone Number"
                placement="topLeft"
              >
                <Input
                  required
                  value={contactNo}
                  inputMode="numeric"
                  type="tel"
                  placeholder="Phone Number"
                  size="large"
                  style={{ width: "400px" }}
                  onChange={(e) => setContactNo(e.target.value)}
                />
              </Tooltip>
            </Form.Item>

            <Form.Item name="number">
              <Select
                value={role}
                placeholder="Select Role"
                size="large"
                style={{ width: "400px" }}
                onChange={clickedCategory}
              >
                <Select.Option value="user">Customer</Select.Option>
                <Select.Option value="owner">Restaurant Owner</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                block
                className="registerButton"
                htmlType="submit"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
