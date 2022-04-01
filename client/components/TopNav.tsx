import { useState, useContext, useEffect } from "react";
import { Menu, Row } from "antd";
import { ImHome } from "react-icons/im";
import { RiLoginCircleFill, RiLogoutCircleFill } from "react-icons/ri";
import {
  BsFillPersonPlusFill,
  BsFillMenuAppFill,
  BsPersonFill,
} from "react-icons/bs";
import Link from "next/link";
import { Context } from "context";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";
import {
  MdNoMealsOuline,
  MdOutlineCoffee,
  MdOutlineCoffeeMaker,
} from "react-icons/md";
import { GiCoffeeMug } from "react-icons/gi";
import { BiCoffeeTogo } from "react-icons/bi";
import { FaCoffee } from "react-icons/fa";
import Input from "antd/lib/input/Input";

const TopNav = () => {
  const [currentUserId, setCurrentUserId] = useState("");
  const [current, setCurrent] = useState("");
  const [keyword, setKeyword] = useState("");

  const { state, dispatch } = useContext(Context);

  const { user } = state;

  const search = async (value) => {
    setKeyword(value);
  };
  var url = new URL("http://http://localhost:3000/");
  url.searchParams.append("keyword", keyword);
  // console.log(url);

  useEffect(() => {
    typeof window && setCurrent(window.location.pathname);
    const data = JSON.parse(window.localStorage.getItem("user"));
    if (data) {
      const myId = data.userdetails._id;
      setCurrentUserId(myId);
    }
    dispatch({
      type: "SETKEYWORD",
      payload: keyword,
    });
  }, [keyword]);

  const logout = async () => {
    try {
      dispatch({ type: "LOGOUT" });
      window.localStorage.removeItem("user");
      Router.push("/login");
      const { data } = await axios.get(
        `http://localhost:5000/authentication/logout`
      );
      toast(data.message);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  function placeOrder() {
    toast(`Click on any Restaurant of your choice, to place an order `);
  }

  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Menu.Item key="search" onClick={(e) => setCurrent(e.key)}>
        <Input
          type="search"
          value={keyword}
          placeholder="Search For Restaurant"
          onChange={(e) => search(e.target.value)}
        />
      </Menu.Item>
      {user === null && (
        <>
          <Menu.Item
            key="/"
            icon={<ImHome />}
            onClick={(e) => setCurrent(e.key)}
          >
            <Link href="/">Home</Link>
          </Menu.Item>

          <Menu.Item
            key="login"
            icon={<RiLoginCircleFill />}
            onClick={(e) => setCurrent(e.key)}
          >
            <Link href="/login">Login</Link>
          </Menu.Item>

          <Menu.Item
            key="register"
            icon={<BsFillPersonPlusFill />}
            onClick={(e) => setCurrent(e.key)}
          >
            <Link href="/register">Register</Link>
          </Menu.Item>
        </>
      )}

      {user !== null && (
        <>
          <Menu.Item
            key=""
            icon={<ImHome />}
            onClick={(e) => setCurrent(e.key)}
          >
            <Link href="/">Home</Link>
          </Menu.Item>
          {user.userdetails.role === "owner" ? (
            <Menu.Item
              key="dashboard"
              icon={<BsFillMenuAppFill />}
              onClick={(e) => setCurrent(e.key)}
            >
              <Link href={`/dashboard/${currentUserId}`}> Dashboard </Link>
            </Menu.Item>
          ) : (
            <>
              <Menu.Item
                key="order"
                icon={<MdNoMealsOuline />}
                onClick={placeOrder}
              >
                <Link href="/">Place an Order</Link>
              </Menu.Item>

              <Menu.Item
                key="pdashboard"
                icon={<BsFillMenuAppFill />}
                onClick={(e) => setCurrent(e.key)}
              >
                <Link href={`/dashboard/${currentUserId}`}>Dashboard</Link>
              </Menu.Item>
            </>
          )}

          <Menu.Item
            key="logout"
            icon={<RiLogoutCircleFill />}
            onClick={logout}
          >
            Logout
          </Menu.Item>

          <Menu.Item
            key="profile"
            icon={<FaCoffee />}
            style={{ float: "right" }}
            onClick={(e) => setCurrent(e.key)}
          >
            <Link href="/profile">{user.userdetails.name}</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default TopNav;
