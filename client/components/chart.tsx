import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, PolarArea } from "react-chartjs-2";
import { Row, Col, Space, Divider } from "antd";
import { AiFillDollarCircle } from "react-icons/ai";
import { SiCircleci } from "react-icons/si";
import { RiEditCircleFill, RiHeart2Fill } from "react-icons/ri";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const Chart = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [allPendingOrders, setAllPendingOrders] = useState();
  const [allOngoingOrders, setAllOngoingOrders] = useState();
  const [allCompletedOrders, setAllCompletedOrders] = useState();
  const [allDeliveredOrders, setAllDeliveredOrders] = useState();
  const [amount, setAmount] = useState(0);
  const [rest, setRest] = useState([]);
  const [meal, setMeal] = useState([]);

  useEffect(() => {
    //get user id
    const data = JSON.parse(window.localStorage.getItem("user"));
    // const id = data.userdetails._id;
    if (data) {
      const id = data.userdetails._id;

      //get all orders of user
      const orders = async () => {
        try {
          const data = await fetch(
            `http://localhost:5000/order/user/${id}`
          ).then((res) => res.json());

          //map through each order and get the restaurant
          const p = data.map((x) => x.amount);
          const pending = data.filter((x) => x.status === "Pending");
          const ongoing = data.filter((x) => x.status === "Ongoing");
          const delivered = data.filter((x) => x.status === "Delivered");
          const completed = data.filter((x) => x.status === "Completed");
          const uniquep = [...new Set(data.map((x) => x.restaurant))];
          const uniquem = [...new Set(data.map((x) => x.meal))];
          const sum = p.reduce((a, b) => a + b);
          setAllOrders(data);
          setRest(uniquep);
          setAmount(sum);
          setAllPendingOrders(pending.length);
          setAllOngoingOrders(ongoing.length);
          setAllCompletedOrders(completed.length);
          setAllDeliveredOrders(delivered.length);
          setMeal(uniquem);
        } catch (error) {
          console.log(error);
        }
      };
      orders();
    }
  }, []);

  var k = 4;
  var data = {
    labels: ["Pending", "Ongoing", "Completed", "Delivered"],
    datasets: [
      {
        // label: `${allData?.length} Years of Award`,
        // data: [...map.values()],
        data: [
          allPendingOrders,
          allOngoingOrders,
          allCompletedOrders,
          allDeliveredOrders,
        ],

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      legend: {
        labels: {
          fontSize: 23,
        },
      },
    },
  };
  return (
    <>
      <Row style={{ width: "100%", marginLeft: "" }}>
        {/* <Col> */}
        <Col
          span={5}
          style={{
            backgroundColor: "green",
            height: "100px",
            // display: "flex",
          }}
          className="text-white pt-3 justify-content-center"
        >
          <Row justify="center">{allOrders.length}</Row>
          <Row style={{ display: "flex", paddingTop: "9px" }} justify="center">
            <RiEditCircleFill className="mt--1 fs-2 ms-3" />
            <p>Total Orders</p>
          </Row>
        </Col>
        <br />
        <Col
          span={5}
          style={{
            backgroundColor: "#ae1212",
            height: "100px",
            // width: "200px",
          }}
          className="text-white pt-3 ms-3 justify-content-center"
        >
          <Row justify="center">{meal.length}</Row>
          <Row style={{ display: "flex", paddingTop: "9px" }} justify="center">
            <RiHeart2Fill className="mt--1 fs-2 ms-3" />
            <p>Total Meals</p>
          </Row>
        </Col>
        <br />
        <Col
          span={5}
          style={{ backgroundColor: "blue", height: "100px" }}
          className="text-white pt-3 ms-3 justify-content-center"
        >
          <Row justify="center">{amount}</Row>
          <Row style={{ display: "flex", paddingTop: "9px" }} justify="center">
            <AiFillDollarCircle className="mt--1 fs-2 ms-3" />
            <p> Amount Paid</p>
          </Row>
        </Col>
        <br />
        <Col
          span={5}
          style={{ backgroundColor: "violet", height: "100px" }}
          className="text-white pt-3 ms-3 justify-content-center"
        >
          <Row justify="center">{rest.length}</Row>
          <Row style={{ display: "flex", paddingTop: "9px" }} justify="center">
            <SiCircleci className="mt--1 fs-2 ms-3" />
            <p> Restaurants</p>
          </Row>
        </Col>
        {/* </Col> */}
      </Row>
      <Divider />
      <h4>Orders</h4>
      <Row justify="center" style={{ width: "100%" }}>
        <Col span={12}>
          <PolarArea data={data} height={200} />
        </Col>
        <Col span={12}>
          <Pie data={data} height={200} />
        </Col>
      </Row>
    </>
  );
};

export default Chart;
