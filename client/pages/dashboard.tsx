import React, { useContext, useEffect } from "react";
import Router from "next/router";
import { toast } from "react-toastify";
import { Context } from "./context";
import { CreateRestaurant } from "./components/create-restaurant";
import Sidebar from "./components/sidebar";
import { useState } from "react";
import { Orders } from "./components/orders";

const Dashboard = () => {
  const { state } = useContext(Context);

  const token = state.user;

  const [dashboardDisplay, setDashboardDisplay] = useState("block");
  const [createDisplay, setCreateDisplay] = useState("none");
  const [orderDisplay, setOrderDisplay] = useState("none");
  const [likedDisplay, setLikedDisplay] = useState("none");
  const [manageDisplay, setManageDisplay] = useState("none");

  useEffect(() => {
    if (state.user === null) {
      Router.push("/login");
      toast("Log in to view your dashboard");
    }
  }, [state.user]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Sidebar
            setDashboardDisplay={setDashboardDisplay}
            setCreateDisplay={setCreateDisplay}
            setOrderDisplay={setOrderDisplay}
            setLikedDisplay={setLikedDisplay}
            setManageDisplay={setManageDisplay}
          />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="" style={{ display: dashboardDisplay }}>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="btn-group mr-2">
                    <button className="btn btn-sm btn-outline-secondary">
                      Share
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      Export
                    </button>
                  </div>
                  <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                    <span data-feather="calendar"></span>
                    This week
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: orderDisplay }} className="mt-4">
              <Orders />
            </div>

            <div style={{ display: createDisplay }} className="mt-4">
              <CreateRestaurant token={token} />
            </div>

            <canvas
              className="my-4 w-100"
              id="myChart"
              width="900"
              height="380"
            ></canvas>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
