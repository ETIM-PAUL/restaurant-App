import { useState, useContext } from "react";
import { Menu } from "antd";
import { ImHome } from "react-icons/im";
import { RiLoginCircleFill, RiLogoutCircleFill } from "react-icons/ri";
import {
  BsFillPersonPlusFill,
  BsFillMenuAppFill,
  BsPersonFill,
} from "react-icons/bs";
import Link from "next/link";
import { Context } from "pages/context";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";

const TopNav = () => {
  const [currentUser, setCurrentUser] = useState();

  const { state, dispatch } = useContext(Context);

  const { user } = state;

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get(
      `http://localhost:5000/authentication/logout`
    );
    toast(data.message);
    Router.push("/login");
  };

  return (
    <Menu mode="horizontal">
      {user === null && (
        <>
          <Menu.Item key="app" icon={<ImHome />}>
            <Link href="/">Home</Link>
          </Menu.Item>

          <Menu.Item key="login" icon={<RiLoginCircleFill />}>
            <Link href="/login">Login</Link>
          </Menu.Item>

          <Menu.Item key="register" icon={<BsFillPersonPlusFill />}>
            <Link href="/register">Register</Link>
          </Menu.Item>
        </>
      )}

      {user !== null && (
        <>
          <Menu.Item key="app" icon={<ImHome />}>
            <Link href="/">Home</Link>
          </Menu.Item>

          <Menu.Item key="dashboard" icon={<BsFillMenuAppFill />}>
            <Link href="/dashboard">Dashboard</Link>
          </Menu.Item>

          <Menu.Item
            key=""
            className="float-end"
            icon={<RiLogoutCircleFill />}
            onClick={logout}
          >
            Logout
          </Menu.Item>

          <Menu.Item key="profile" icon={<BsPersonFill />}>
            <Link href="/dashboard">{user.userdetails.name}</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default TopNav;
