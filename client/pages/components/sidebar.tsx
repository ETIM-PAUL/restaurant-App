import Link from "next/link";
import React from "react";
import { BiLike } from "react-icons/bi";
import { BsClipboardCheck } from "react-icons/bs";
import { MdCreateNewFolder } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { SiGoogletagmanager } from "react-icons/si";

const Sidebar = ({
  setDashboardDisplay,
  setCreateDisplay,
  setOrderDisplay,
  setLikedDisplay,
  setManageDisplay,
}) => {
  const dashboardDisplay = () => {
    setCreateDisplay("none");
    setOrderDisplay("none");
    setLikedDisplay("none");
    setManageDisplay("none");
    setDashboardDisplay("block");
  };

  const changeDisplay = () => {
    setOrderDisplay("none");
    setLikedDisplay("none");
    setManageDisplay("none");
    setDashboardDisplay("none");
    setCreateDisplay("block");
  };
  const orderDisplay = () => {
    setCreateDisplay("none");
    setOrderDisplay("block");
    setLikedDisplay("none");
    setManageDisplay("none");
    setDashboardDisplay("none");
  };
  const likedDisplay = () => {
    setCreateDisplay("none");
    setOrderDisplay("none");
    setLikedDisplay("block");
    setManageDisplay("none");
    setDashboardDisplay("none");
  };
  const manageDisplay = () => {
    setCreateDisplay("none");
    setOrderDisplay("none");
    setLikedDisplay("none");
    setManageDisplay("block");
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
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={orderDisplay}
            >
              <span data-feather="file"></span>
              <BsClipboardCheck />
              Your Orders
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
              Liked Restaurants
            </span>
          </li>
          <li className="nav-item">
            {/* <Link href="/restaurant"></Link> */}
            <span
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={changeDisplay}
            >
              <span data-feather="users"></span>
              <MdCreateNewFolder />
              <span>Create Restaurant</span>
            </span>
          </li>
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={manageDisplay}
            >
              <span data-feather="bar-chart-2"></span>
              <SiGoogletagmanager />
              Manage Restaurant
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
