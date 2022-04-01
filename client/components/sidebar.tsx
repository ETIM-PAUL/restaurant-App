import { Badge } from "antd";
import Link from "next/link";
import { Context } from "context";
import React, { useContext } from "react";
import { BiLike } from "react-icons/bi";
import { BsClipboardCheck } from "react-icons/bs";
import {
  MdCreateNewFolder,
  MdNotificationImportant,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { RiDashboardFill, RiNotification2Fill } from "react-icons/ri";
import { SiGoogletagmanager } from "react-icons/si";

const Sidebar = ({
  setDashboardDisplay,
  setCreateDisplay,
  setOrderDisplay,
  setMyOrderDisplay,
  setLikedDisplay,
  setManageDisplay,
  owners,
  _id,
}) => {
  const {
    state: { user },
  } = useContext(Context);
  const dashboardDisplay = () => {
    setCreateDisplay("none");
    setOrderDisplay("none");
    setLikedDisplay("none");
    setMyOrderDisplay("none");
    setManageDisplay("none");
    setDashboardDisplay("block");
  };

  const changeDisplay = () => {
    setMyOrderDisplay("none");
    setOrderDisplay("none");
    setLikedDisplay("none");
    setManageDisplay("none");
    setDashboardDisplay("none");
    setCreateDisplay("block");
  };
  const orderDisplay = () => {
    setMyOrderDisplay("none");
    setCreateDisplay("none");
    setOrderDisplay("block");
    setLikedDisplay("none");
    setManageDisplay("none");
    setDashboardDisplay("none");
  };

  const myorderDisplay = () => {
    setCreateDisplay("none");
    setOrderDisplay("none");
    setMyOrderDisplay("block");
    setLikedDisplay("none");
    setManageDisplay("none");
    setDashboardDisplay("none");
  };
  const likedDisplay = () => {
    setCreateDisplay("none");
    setOrderDisplay("none");
    setLikedDisplay("block");
    setManageDisplay("none");
    setMyOrderDisplay("none");
    setDashboardDisplay("none");
  };
  const manageDisplay = () => {
    setCreateDisplay("none");
    setOrderDisplay("none");
    setLikedDisplay("none");
    setManageDisplay("block");
    setMyOrderDisplay("none");
    setDashboardDisplay("none");
  };

  return (
    <nav
      className="col-md-2 d-none d-md-block bg-light text-white sidebar"
      style={{ lineHeight: "3" }}
    >
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <span
              className="nav-link active"
              style={{ cursor: "pointer" }}
              onClick={dashboardDisplay}
            >
              <span data-feather="home"></span>
              <RiDashboardFill />
              <span className="pt-5">Dashboard</span>
            </span>
          </li>
          {user && user.userdetails && user.userdetails.role === "user" ? (
            <>
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={myorderDisplay}
                >
                  <span data-feather="file"></span>
                  <BsClipboardCheck />
                  My Orders
                </span>
              </li>

              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={likedDisplay}
                >
                  <span data-feather="shopping-cart"></span>
                  <BiLike />
                  Favourite Restaurants
                </span>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Badge count={<RiNotification2Fill />}>
                  <span
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={orderDisplay}
                  >
                    <span data-feather="file"></span>
                    <BsClipboardCheck />
                    Your Orders
                  </span>
                </Badge>
              </li>
              <li className="nav-item">
                {/* <Link href="/restaurant"></Link> */}
                {!owners.includes(_id) ? (
                  <>
                    <span
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={changeDisplay}
                    >
                      <span data-feather="users"></span>
                      <MdCreateNewFolder />
                      <span>Create Restaurant</span>
                    </span>
                  </>
                ) : (
                  " "
                )}
              </li>
              <li className="nav-item">
                {owners.includes(_id) ? (
                  <>
                    <span
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={manageDisplay}
                    >
                      <span data-feather="users"></span>
                      <SiGoogletagmanager />
                      <span>Manage Restaurant</span>
                    </span>
                  </>
                ) : (
                  " "
                )}
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
