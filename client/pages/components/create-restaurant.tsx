import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  Divider,
  Select,
} from "antd";
import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

export const CreateRestaurant = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [officialChef, setOfficialChef] = useState("");
  const [reservations, setReservations] = useState<Boolean>();
  const [orderOut, setOrderOut] = useState<Boolean>();
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");

  const clickedOrder = (value: boolean) => {
    setOrderOut(value);
  };

  const clickedRes = (value: boolean) => {
    setReservations(value);
  };

  const clickedCategory = (value: string) => {
    setCategory(value);
  };

  const onFinish = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };

    try {
      console.log({
        name,
        description,
        officialChef,
        reservations,
        orderOut,
        email,
        contactNo,
        address,
        category,
      });
      const { data } = await axios.post(
        `http://localhost:5000/restaurants`,
        {
          name,
          description,
          officialChef,
          reservations,
          orderOut,
          email,
          contactNo,
          address,
          category,
        },
        config
      );
      toast.success("Restaurant added successfully");
      Router.push("/");
    } catch (error) {
      toast.error(error.response.data.message.toString());
      // if(error.res.statusCode ===)
      toast.error(error.response.statusCode);
      console.log(error.response);
    }
  };

  return (
    <>
      <Row>
        <h4>Add Restaurant</h4>
      </Row>
      <Divider />
      <Row justify="center" className="createRestShadow">
        <Col>
          <Form name="nest-messages" onFinish={onFinish} autoComplete="off">
            <Form.Item>
              Restaurant Name
              <Input
                value={name}
                size="large"
                required
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              Restaurant Email
              <Input
                value={email}
                size="large"
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              Phone Number
              <Input
                type="number"
                maxLength={11}
                showCount
                value={contactNo}
                size="large"
                required
                onChange={(e) => setContactNo(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              Address (Please fill a correct address, if possible include a zip
              code. To display your location on Google Map. e.g )
              <Input
                value={address}
                size="large"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              Official Chefs Name
              <Input
                value={officialChef}
                size="large"
                required
                onChange={(e) => setOfficialChef(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              Order Out (Please select True, if your Restaurant takes External
              Orders. Otherwise, select False)
              <Select
                value={orderOut}
                size="large"
                defaultValue={false}
                onChange={clickedOrder}
              >
                <Select.Option value={true}>True</Select.Option>
                <Select.Option value={false}>False</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              Reservations (Please select True, if your Restaurant takes
              Reservations. Otherwise, select False)
              <Select
                value={reservations}
                size="large"
                defaultValue={false}
                onChange={clickedRes}
              >
                <Select.Option value={true}>True</Select.Option>
                <Select.Option value={false}>False</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              Category
              <Select
                value={category}
                size="large"
                defaultValue="Dinning"
                onChange={clickedCategory}
              >
                <Select.Option value="Fast_Food">Fast Food</Select.Option>
                <Select.Option value="Cafe">Cafe</Select.Option>
                <Select.Option value="Dinning">Dinning</Select.Option>
                <Select.Option value="Cuisine_Restaurant">
                  Cuisine{" "}
                </Select.Option>
                <Select.Option value="Seafood_Restaurant">
                  Seafood
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              Description
              <Input.TextArea
                value={description}
                size="large"
                maxLength={1000}
                showCount
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CreateRestaurant;
