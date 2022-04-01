import { Component, useContext, useState } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Space,
  Layout,
  Image,
  Card,
  Button,
  Form,
  Input,
  Modal,
  Rate,
  Divider,
} from "antd";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import { GetServerSideProps } from "next";
import { MdRateReview } from "react-icons/md";
import { toast } from "react-toastify";
import { Context } from "context";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const { _id } = params;
    const [getRest, meals] = await Promise.all([
      fetch(`http://localhost:5000/restaurants/${_id}`),
      fetch(`http://localhost:5000/meals/restaurant/${_id}`),
    ]);

    const [restaurant, getMeals] = await Promise.all([
      getRest.json(),
      meals.json(),
    ]);

    return {
      props: {
        restaurant,
        getMeals,
      },
    };
  } catch (error) {}
};

const Restaurant = ({ restaurant, getMeals }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
  };
  const [visible, setVisible] = useState(false);
  const [mealId, setMealId] = useState("");
  const [orderName, setOrderName] = useState("");
  const [orderDesc, setOrderDesc] = useState("");
  const [price, setPrice] = useState();
  const [review, setReview] = useState("");
  const [portions, setPortions] = useState(0);
  const [amount, setAmount] = useState<number>();
  const [mealName, setMealName] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const orderStatus = "Pending";

  const { state } = useContext(Context);

  const token = state.user;

  function getAmount() {
    var portion = document.getElementById("portions") as HTMLInputElement;
    var number = parseFloat(portion.value);
    var totalAmount = number * price;
    document.getElementById("amountResult").value = totalAmount;
    setAmount(totalAmount);
  }

  const showModal = (meal_id, price, mealName) => {
    setVisible(true);
    setMealId(meal_id);
    setPrice(price);
    setPortions(1);
    setMealName(mealName);
    setAmount(price);
  };

  async function submitReview() {
    const data = JSON.parse(window.localStorage.getItem("user"));
    const token = data.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const { data } = await axios.put(
        `http://localhost:5000/restaurants/reviews/${restaurant._id}`,
        {
          review: review,
        },
        config
      );
      toast("Review Added");
      setReview("");
    } catch (error) {
      console.log(error);
    }
  }

  const handleOk = async () => {
    const data = JSON.parse(window.localStorage.getItem("user"));
    const token = data.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);

    try {
      const { data } = await axios.post(
        `http://localhost:5000/order`,
        {
          name: orderName,
          portions: portions,
          description: orderDesc,
          status: orderStatus,
          restaurant: restaurant._id,
          meal: mealId,
          amount: amount,
        },
        config
      );
      toast("Order Placed Successfully");
    } catch (error) {
      console.log(error.response.data.message);
      toast(error.response.data.message);
    }
    setOrderName("");
    setOrderDesc("");
    setPortions(1);
  };

  const handleCancel = () => {
    setVisible(false);
    setOrderName("");
    setOrderDesc("");
    setPortions(1);
  };

  const rest = [restaurant];
  const {
    order,
    menu,
    _id,
    location,
    images,
    category,
    address,
    contactNo,
    email,
    orderOut,
    reservations,
    reviews,
    officialChef,
    description,
    name,
  } = restaurant;

  const coordinates = location[0]["coordinates"];
  const lat = coordinates[0];
  const long = coordinates[1];
  // const img = restaurant["images"][0]["Location"];
  return (
    <>
      <Layout>
        <Layout.Content style={{ overflowX: "hidden" }}>
          <Row className="mt-3">
            <>
              <Col span={10} xs={0} lg={10} push={1}>
                <Image
                  // 4.988005, 8.331707
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${long},${lat}&zoom=13&size=500x600&maptype=roadmap
&markers=color:blue%7Clabel:S%7C${long},${lat}&key=AIzaSyBybqWJjDU3YPcTmlCPkGc7oHtpEXrFQFM`}
                  // height={675}
                  alt="Address on Google Map"
                />
              </Col>

              <Col
                span={14}
                xs={24}
                md={24}
                lg={14}
                style={{ backgroundColor: "white", height: "740px" }}
              >
                <Row>
                  <Col
                    span={19}
                    push={1}
                    style={{ paddingTop: "5px", color: "green" }}
                  >
                    <h5 className="display-6">
                      <b>
                        {name}{" "}
                        <span className="bg-gray" style={{ fontSize: "20px" }}>
                          Category: {category}
                        </span>
                      </b>
                    </h5>
                  </Col>
                  <Col span={5} style={{ paddingTop: "5px" }}>
                    <Space size={15}>
                      <span className="pt-10">
                        <BsFillSuitHeartFill
                          style={{ fontSize: "20px", color: "darkgray" }}
                        />
                      </span>
                    </Space>
                  </Col>
                </Row>{" "}
                <Row>
                  <Col push={1} style={{ display: "flex" }} className="gap-3">
                    {restaurant.images.length === 1 ? (
                      <Image
                        height={200}
                        src={restaurant.images[0]["Location"]}
                        width={250}
                        alt="*Restaurant image"
                      />
                    ) : (
                      ""
                    )}
                    {restaurant.images.length >= 2 ? (
                      <Image
                        height={200}
                        src={restaurant.images[1]["Location"]}
                        width={250}
                        alt="*Restaurant image"
                      />
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col className="ms-4">
                    <h6>
                      <b>{address}</b>
                    </h6>
                  </Col>
                </Row>
                <Row>
                  <Col className="ms-4">
                    <p>{description}</p>
                  </Col>
                </Row>
                <Row className="ms-4">
                  <Col span={8}>
                    {/* <Row>
                      <Col span={15}> */}
                    <p>Phone Number: 0{contactNo}</p>
                    {/* </Col>
                    </Row> */}
                  </Col>
                  <Col span={8}>
                    {/* <Row>
                      <Col span={15}> */}
                    <p>Email Address: {email}</p>
                  </Col>
                  {/* </Row>
                  </Col> */}
                  <Col span={8}>
                    {/* <Row>
                      <Col span={15}> */}
                    <p>Executive Chef: {officialChef}</p>
                    {/* </Col>
                    </Row> */}
                  </Col>
                </Row>
                <div className="ms-4 gap-4">
                  <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                  >
                    {getMeals.map((meal) => (
                      <Card
                        key={meal._id}
                        bordered={true}
                        title={meal.name}
                        style={{
                          width: 250,
                        }}
                      >
                        <p>Price: {meal.price}</p>
                        <p>Category: {meal.category}</p>
                        <p>{meal.description}</p>

                        {token &&
                        token.userdetails &&
                        token.userdetails.role === "user" &&
                        restaurant.orderOut === true ? (
                          <Button
                            // value={meal._id}
                            block
                            type="primary"
                            onClick={() =>
                              showModal(meal._id, meal.price, meal.name)
                            }
                          >
                            Place an Order
                          </Button>
                        ) : (
                          ""
                        )}
                      </Card>
                    ))}
                  </Carousel>
                </div>
                <br />
                <Row className="ms-4">
                  <Col>
                    <Row>
                      <Space size={17}>
                        <Col>
                          <GiMeal />
                          <p>Meals ({menu.length})</p>
                        </Col>
                        <Col>
                          <MdRateReview /> {}
                          <p>Reviews ({reviews.length})</p>
                        </Col>
                        <Col>
                          <Rate
                            disabled
                            allowHalf
                            defaultValue={4.5}
                            style={{ fontSize: "12px" }}
                          />
                          <p>Ratings ({4.5})</p>
                        </Col>
                      </Space>
                    </Row>
                  </Col>
                </Row>
                <Divider />
                {token &&
                  token.userdetails &&
                  token.userdetails.role === "user" && (
                    <Form onFinish={submitReview}>
                      <Form.Item>
                        <Input.TextArea
                          required
                          size="large"
                          style={{ width: "80%", marginLeft: "5px" }}
                          placeholder="Please leave a review"
                          maxLength={150}
                          showCount
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                        />
                        <Rate
                          allowHalf
                          style={{
                            marginLeft: "5px",
                            marginTop: "3px",
                            backgroundColor: "white",
                          }}
                          defaultValue={2}
                          onChange={() => console.log(2)}
                        />
                      </Form.Item>
                      <button
                        type="submit"
                        style={{
                          marginLeft: "5px",
                          border: "dashed",
                          marginBottom: "5px",
                        }}
                      >
                        Submit Review
                      </button>
                    </Form>
                  )}
                <br />
              </Col>
            </>
          </Row>
        </Layout.Content>
      </Layout>

      <Modal
        title="Place a Meal Order"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[]}
      >
        <Row justify="center">
          <Col className="gap-3">
            <Form onFinish={handleOk}>
              Order Title
              <Form.Item>
                <Input
                  required
                  value={orderName}
                  size="large"
                  showCount
                  placeholder="Order Title"
                  maxLength={20}
                  onChange={(e) => setOrderName(e.target.value)}
                />
              </Form.Item>
              Restaurant Name
              <Form.Item>
                <Input size="large" placeholder={name} disabled />
              </Form.Item>
              Meal Name
              <Form.Item>
                <Input size="large" placeholder={mealName} disabled />
              </Form.Item>
              Meal Price
              <Form.Item>
                <Input size="large" placeholder={price} disabled />
              </Form.Item>
              Portions Needed
              <Form.Item>
                <Input
                  required
                  type="number"
                  value={portions}
                  onInput={getAmount}
                  id="portions"
                  defaultValue={1}
                  max={10}
                  min={0}
                  size="large"
                  onChange={(e) => setPortions(e.target.valueAsNumber)}
                  placeholder="Portions"
                ></Input>
              </Form.Item>
              Total Amount
              <Form.Item>
                <Input
                  value={amount}
                  addonAfter={<span>&#8358;</span>}
                  id="amountResult"
                  size="large"
                  placeholder={price}
                  disabled
                />
              </Form.Item>
              Additional Information
              <Form.Item>
                <Input.TextArea
                  placeholder="Order Description"
                  value={orderDesc}
                  onChange={(e) => setOrderDesc(e.target.value)}
                  maxLength={100}
                  showCount
                  required
                />
              </Form.Item>
              <Button key="back" onClick={handleCancel}>
                Cancel Order
              </Button>
              <button
                key="submit"
                type="submit"
                className="bg-primary text-white w-10 float-end"
                // loading={confirmLoading}
                onSubmit={handleOk}
              >
                Place Order
              </button>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Restaurant;
