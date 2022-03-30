import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import axios from "axios";
import { toast } from "react-toastify";

export const Orders = ({ ownerRest, token }) => {
  useEffect(() => {
    //get user id
    const data = JSON.parse(window.localStorage.getItem("user"));
    if (data) {
      const id = data.userdetails._id;
    }
    //get all orders of user
    const orders = async () => {
      try {
        const data = await fetch(
          `http://localhost:5000/order/restaurant/${ownerRest[0]["_id"]}`
        ).then((res) => res.json());

        //map through each order and get the meal
        const p = data.map((x) => x.meal);

        const user = data.map((x) => x.user);
        for (let i = 0; i < user.length; i++) {
          const users = await fetch(
            "http://localhost:5000/authentication/" + user[i]
          ).then((res) => res.json());
          setAllRestOrders(data);
          allRestOrderClient.push(users.name);
          getClientAddress.push(users.address);
          getClientContact.push(users.contactNo);

          //for each order, get the meal name
          for (let i = 0; i < p.length; i++) {
            const meal = await fetch(
              "http://localhost:5000/meals/" + p[i]
            ).then((res) => res.json());
            //push each name to a pre-defined array
            getMeal.push(meal.name);
            getMealPrice.push(meal.price);
            // allOrders.push(rest.name);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    orders();
  }, []);
  const [allRestOrders, setAllRestOrders] = useState([]);
  const [allRestOrderClient, setAllRestOrderClient] = useState([]);
  const [getMeal, setAllMeals] = useState([]);
  const [getMealPrice, setGetAllMealPrice] = useState([]);
  const [getClientContact, setGetClientContact] = useState([]);
  const [getClientAddress, setGetClientAddress] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [orderId, setOrderId] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const clickedStatus = (value: string) => {
    setOrderStatus(value);
  };

  const showModal = (id) => {
    setVisible(true);
    setOrderId(id);
  };

  const handleOk = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
    console.log(orderStatus);
    try {
      const { data } = await axios.put(
        `http://localhost:5000/order/${orderId}`,
        {
          status: orderStatus,
        },
        config
      );
      toast("Order Updated Successfully");
    } catch (error) {
      console.log(error.response.data.message);
    }
    setOrderStatus("");
  };

  const handleCancel = () => {
    setVisible(false);
    setOrderStatus("");
  };

  async function deleteOrder(id) {
    const orderId = id;
    const config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    try {
      const data = await axios.delete(
        `http://localhost:5000/order/${orderId}`,
        config
      );
      toast("Order Deleted");
      location.reload();
    } catch (error) {
      console.log(error.response);
    }
  }

  const columns = [
    {
      title: "Meal Ordered",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
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
      title: "Order Description",
      dataIndex: "desc",
    },
    {
      title: "Customer's Name",
      dataIndex: "customer",
    },
    {
      title: "Customer's Contact",
      dataIndex: "contact",
    },
    {
      title: "Customer's Address",
      dataIndex: "address",
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
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const iterator = getMeal.values();
  const iteratorUser = allRestOrderClient.values();
  const iteratorUserContact = getClientContact.values();
  const iteratorUserAddress = getClientAddress.values();
  const iteratorPrice = getMealPrice.values();

  const allData = allRestOrders.map((x) => {
    return {
      key: x.length,
      name: iterator.next().value,
      status: x["status"],
      portion: x["portions"] + " plates",
      price: iteratorPrice.next().value + "\u20A6",
      customer: iteratorUser.next().value,
      amount: x["amount"] + "\u20A6",
      desc: x["description"],
      address: iteratorUserAddress.next().value,
      contact: iteratorUserContact.next().value,
      action: (
        <>
          <Space>
            <Popconfirm
              placement="top"
              title="Are you sure you want to delete this restaurant"
              onConfirm={() => deleteOrder(x._id)}
            >
              <button type="submit" className="bg-primary text-white">
                delete
              </button>
            </Popconfirm>
            <button
              type="submit"
              className="bg-primary text-white"
              onClick={() => showModal(x._id)}
            >
              edit
            </button>
          </Space>
        </>
      ),
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
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.description}</p>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={allData}
            onChange={onChange}
          />
        </Col>
      </Row>

      <Modal
        title="Place a Meal Order"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form onFinish={handleOk}>
          <Form.Item>
            Order Status
            <Select value={orderStatus} size="large" onChange={clickedStatus}>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Ongoing">Ongoing</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
              <Select.Option value="Completed">Delivered</Select.Option>
            </Select>
            <Button block type="primary" className="mt-3" onClick={handleOk}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Orders;
