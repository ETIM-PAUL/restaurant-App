import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "antd";

export const UserOrders = ({ id }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [getRest, setGetRest] = useState([]);

  useEffect(() => {
    //get user id
    const data = JSON.parse(window.localStorage.getItem("user"));
    // const id = data.userdetails._id;
    if (data) {
      const id = data.userdetails._id;
    }
    //get all orders of user
    const orders = async () => {
      try {
        const data = await fetch(`http://localhost:5000/order/user/${id}`).then(
          (res) => res.json()
        );

        //map through each order and get the restaurant
        const p = data.map((x) => x.restaurant);
        setAllOrders(data);

        //for each order, get the restaurant name
        for (let i = 0; i < p.length; i++) {
          var rest = await fetch(
            "http://localhost:5000/restaurants/" + p[i]
          ).then((res) => res.json());

          //push each name to a pre-defined array
          getRest.push(rest.name);
          // allOrders.push(rest.name);
        }
      } catch (error) {
        console.log(error);
      }
    };
    orders();
  }, []);

  const columns = [
    {
      title: "Restaurant's Name",
      dataIndex: "rest",
    },
    {
      title: "Meal Ordered",
      dataIndex: "name",
    },
    {
      title: "Portions",
      dataIndex: "portion",
    },
    {
      title: "Amount Paid",
      dataIndex: "amount",
    },
    {
      title: "Order Desc",
      dataIndex: "desc",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Pending",
          value: "Pending",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
  ];

  const iterator = getRest.values();
  const allData = allOrders.map((x) => {
    return {
      key: x.length,
      rest: iterator.next().value,
      name: x["name"],
      status: x["status"],
      portion: x["portions"],
      amount: x["amount"],
      desc: x["description"],
    };
  });

  function onChange(pagination, filters, sorter, extra) {
    // console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <>
      <Row>
        <h4>Your Orders</h4>
      </Row>
      <Row justify="center">
        <Col style={{ width: "100%" }}>
          <Table columns={columns} dataSource={allData} onChange={onChange} />
        </Col>
      </Row>
    </>
  );
};

export default UserOrders;
