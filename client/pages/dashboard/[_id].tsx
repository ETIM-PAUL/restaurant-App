import React, { useContext, useEffect } from "react";
import Router from "next/router";
import { toast } from "react-toastify";
import { Context } from "../context";
import { CreateRestaurant } from "../../components/create-restaurant";
import Sidebar from "../../components/sidebar";
import { useState } from "react";
import { Orders } from "../../components/orders";
import UserOrders from "../../components/userOrders";
import ManageRest from "components/manageRest";
import Chart from "components/chart";
import OwnerChart from "components/ownerChart";

export async function getServerSideProps({ params }) {
  try {
    const { _id } = params;
    const restaurants = await fetch("http://localhost:5000/restaurants/");
    if (!restaurants) {
      throw new Error(`Error! status: ${restaurants.status}`);
    }
    const rest = await restaurants.json();

    const res = await fetch(`http://localhost:5000/restaurants/user/${_id}`);
    if (!res) {
      throw new Error(`Error! status: ${res.status}`);
    }
    const restaurant = await res.json();

    return {
      props: {
        restaurant,
        rest,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

const Dashboard = ({ restaurant, rest }) => {
  const [_id, setId] = useState();

  const { state } = useContext(Context);

  const token = state.user;
  const id = state.userdetails;
  const restOwners = rest.map((x) => x.user);

  const owners = restOwners.toString();

  const [dashboardDisplay, setDashboardDisplay] = useState("block");
  const [createDisplay, setCreateDisplay] = useState("none");
  const [orderDisplay, setOrderDisplay] = useState("none");
  const [myOrderDisplay, setMyOrderDisplay] = useState("none");
  const [likedDisplay, setLikedDisplay] = useState("none");
  const [manageDisplay, setManageDisplay] = useState("none");

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("user"));
    if (data) {
      const myId = data.userdetails._id;
      setId(myId);
    }
    if (!data) {
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
            setMyOrderDisplay={setMyOrderDisplay}
            setLikedDisplay={setLikedDisplay}
            setManageDisplay={setManageDisplay}
            owners={owners}
            _id={_id}
          />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="" style={{ display: dashboardDisplay }}>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                {state &&
                state.user &&
                state.user.userdetails &&
                state.user.userdetails.role === "owner" &&
                restaurant &&
                restaurant[0] &&
                restaurant[0].images.length > 0 ? (
                  <img
                    height={100}
                    src={restaurant[0].images[0]["Location"]}
                    width={150}
                    alt="*Restaurant image"
                    style={{ marginBottom: "7px" }}
                  />
                ) : (
                  ""
                )}
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="btn-group mr-2">
                    <button className="btn btn-sm btn-outline-secondary">
                      Share
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      Download
                    </button>
                  </div>
                  <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                    <span data-feather="calendar"></span>
                    Favourites
                  </button>
                </div>
              </div>
              <br />
              <div>
                {state &&
                state.user &&
                state.user.userdetails &&
                state.user.userdetails.role === "owner" &&
                owners.includes(_id) ? (
                  <OwnerChart restaurant={restaurant} />
                ) : (
                  ""
                )}
              </div>
              <div>
                {state &&
                state.user &&
                state.user.userdetails &&
                state.user.userdetails.role === "user" ? (
                  <Chart />
                ) : (
                  ""
                )}
              </div>
            </div>

            {state &&
            state.user &&
            state.user.userdetails &&
            state.user.userdetails.role === "owner" &&
            owners.includes(_id) ? (
              <div style={{ display: orderDisplay }} className="mt-4">
                <Orders token={token} ownerRest={restaurant} />
              </div>
            ) : (
              " "
            )}

            <div style={{ display: myOrderDisplay }} className="mt-4">
              <UserOrders id={id} />
            </div>

            <div style={{ display: createDisplay }} className="mt-4">
              <CreateRestaurant token={token} />
            </div>

            {state &&
            state.user &&
            state.user.userdetails &&
            state.user.userdetails.role === "owner" &&
            owners.includes(_id) ? (
              <div style={{ display: manageDisplay }} className="mt-4">
                <ManageRest token={token} ownerRest={restaurant} />
              </div>
            ) : (
              ""
            )}

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
