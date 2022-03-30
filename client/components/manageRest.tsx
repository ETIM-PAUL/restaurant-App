import {
  Row,
  Divider,
  Card,
  Space,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Select,
  Popconfirm,
  Avatar,
  Badge,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsClipboardPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import FileResizer from "react-image-file-resizer";

const ManageRest = ({ token, ownerRest }) => {
  // console.log(ownerRest);
  useEffect(() => {
    const id = ownerRest[0]["_id"];
    const getMeals = async () => {
      try {
        const data = await axios.get(
          `http://localhost:5000/meals/restaurant/${id}`
        );

        setMeals(data.data);
        setImage(ownerRest[0].images[0]["Location"]);
      } catch (error) {
        console.log(error.response);
      }
    };
    getMeals();
  }, [ownerRest]);
  const {
    location,
    images,
    category,
    address,
    contactNo,
    email,
    orderOut,
    reservations,
    officialChef,
    description,
    name,
  } = ownerRest[0];

  const [visible, setVisible] = useState(false);
  const [mealCategory, setMealCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [mealName, setMealName] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({});
  const [meals, setMeals] = useState([]);
  const [mealDesc, setMealDesc] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [manageDisplay, setManageDisplay] = useState("none");

  const [changedFields, setChangedFields] = useState({});

  const [values, setValues] = useState({
    name: name,
    description: description,
    officialChef: officialChef,
    reservations: reservations,
    orderOut: orderOut,
    email: email,
    contactNo: contactNo,
    address: address,
    category: category,
  });

  const showEditModal = () => {
    setVisible(true);
  };

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleImageRemove(e) {
    setImage({});
    setPreview("");
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/restaurants/image-delete/${ownerRest[0]._id}`
      );
      toast("image deleted");
      setImage("");
    } catch (error) {
      console.log(error);
    }
  }

  const clickedCategory = (value: string) => {
    setMealCategory(value);
  };

  const deleteRest = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    try {
      const data = await axios.delete(
        `http://localhost:5000/meal/${ownerRest[0]._id}`,
        config
      );
      toast("Restaurant Deleted");
      location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteMeal = async (id) => {
    const mealId = id;
    const config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    try {
      const data = await axios.delete(
        `http://localhost:5000/meals/${mealId}`,
        config
      );
      toast("Restaurant Deleted");
      location.reload();
    } catch (error) {
      console.log(error.response);
    }
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
    try {
      const { data } = await axios.post(
        `http://localhost:5000/meals`,
        {
          name: mealName,
          description: mealDesc,
          restaurant: ownerRest[0]["_id"],
          price: price,
          category: mealCategory,
        },
        config
      );
      toast("Meal Created Successfully");
    } catch (error) {
      console.log(error.response);
    }
    setMealDesc("");
    setMealName("");
    setPrice(0);
    setManageDisplay("none");
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEdit = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    console.log({
      ...values,
    });
    try {
      const { data } = await axios.put(
        `http://localhost:5000/restaurants/${ownerRest[0]["_id"]}`,
        {
          ...values,
        },
        config
      );
      // console.log(data);
      toast.success("Restaurant edited successfully");
    } catch (error) {
      toast.error(error.response.data.message.toString());
      console.log(error.response);
    }
    setVisible(false);
  };

  const imageUpload = async (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setLoading(true);
    let formData = new FormData();
    formData.append("files", file, file.name);

    //resize
    FileResizer.imageFileResizer(
      file,
      720,
      500,
      "JPEG",
      100,
      0,
      async (uri) => {
        const config = {
          headers: { Authorization: `Bearer ${token.token}` },
        };
        try {
          const data = await fetch(
            `http://localhost:5000/restaurants/upload/${ownerRest[0]["_id"]}`,
            {
              method: "PUT",
              body: formData,
            }
          );
          setLoading(false);
          toast("Image uploaded successfully");
          setPreview("");
        } catch (error) {
          console.log(error);
          setLoading(false);
          toast("Image upload failed. Try later.");
        }
      }
    );
  };

  return (
    <>
      <Row>
        <Space>
          {images && images.length > 0 ? (
            <Badge
              count="X"
              onClick={handleImageRemove}
              style={{ cursor: "pointer" }}
            >
              {<Avatar src={image} />}
            </Badge>
          ) : (
            "Please click on upload image to set a restaurant image"
          )}
          <h4 className="ps-3">Manage Restaurant</h4>
          <Form encType="multipart/form-data">
            <Form.Item>
              <label className="mt-4 btn btn-outline-secondary ">
                {images && images.length > 0 ? "Change Image" : "Upload Image"}
                <Input
                  type="file"
                  required
                  accept="image/*"
                  onChange={imageUpload}
                  hidden
                />
              </label>
            </Form.Item>
          </Form>
          {preview && <Avatar src={preview} />}
          <Button size="large" type="primary" onClick={showEditModal}>
            Edit Restaurant
          </Button>
          <Popconfirm
            placement="top"
            title="Are you sure you want to delete this restaurant"
            onConfirm={deleteRest}
          >
            <Button size="large" type="primary" className="float-right">
              Delete Restaurant
            </Button>
          </Popconfirm>
        </Space>
      </Row>
      <Divider className="bg-danger" />
      <Row justify="center">
        {manageDisplay === "none" ? (
          <Button
            className="bg-danger text-white"
            size="large"
            onClick={() => setManageDisplay("flex")}
          >
            Add A Meal
          </Button>
        ) : (
          <Button
            className="bg-danger text-white"
            size="large"
            onClick={() => setManageDisplay("none")}
          >
            Close Form
          </Button>
        )}
      </Row>

      <Row justify="center" style={{ display: manageDisplay }}>
        <Col className="gap-3">
          <Form onFinish={handleOk}>
            Restaurant Name
            <Form.Item>
              <Input
                value={name}
                size="large"
                style={{ width: "400px" }}
                disabled
              />
            </Form.Item>
            Meal Name
            <Form.Item>
              <Input
                required
                value={mealName}
                style={{ width: "400px" }}
                size="large"
                showCount
                placeholder="Meal Name"
                maxLength={15}
                onChange={(e) => setMealName(e.target.value)}
              />
            </Form.Item>
            Meal Category
            <Form.Item>
              <Select
                value={mealCategory}
                size="large"
                defaultValue="Dinning"
                onChange={clickedCategory}
              >
                <Select.Option key="pasta" value="Pasta">
                  Pasta
                </Select.Option>
                <Select.Option key="salads" value="Salads">
                  Salads
                </Select.Option>
                <Select.Option key="sandwiches" value="Sandwiches">
                  Sandwiches
                </Select.Option>
                <Select.Option key="pastries" value="Pastries">
                  Pastries
                </Select.Option>
                <Select.Option key="drinks" value="Drinks">
                  Drinks
                </Select.Option>
                <Select.Option key="african-soups" value="African Soups">
                  African Soups
                </Select.Option>
              </Select>
            </Form.Item>
            Meal Price
            <Form.Item>
              <Input
                value={price}
                required
                type="number"
                max={5000}
                min={0}
                addonAfter={<span>&#8358;</span>}
                size="large"
                placeholder="Meal Price"
                style={{ width: "400px" }}
                onChange={(e) => setPrice(e.target.valueAsNumber)}
              />
            </Form.Item>
            Additional Information
            <Form.Item>
              <Input.TextArea
                placeholder="Meal Description"
                value={mealDesc}
                onChange={(e) => setMealDesc(e.target.value)}
                maxLength={100}
                showCount
                required
              />
            </Form.Item>
            <button
              key="submit"
              type="submit"
              className="bg-primary text-white w-10 float-end"
              // loading={confirmLoading}
              onSubmit={handleOk}
              style={{ width: "100%", height: "2rem" }}
            >
              Create Meal
            </button>
          </Form>
        </Col>
      </Row>
      {/* </Modal> */}

      <div className="container">
        <Row justify="center"></Row>
        <Row className="gap-4 mt-3">
          {meals.map((meal) => (
            <Card
              key={meal._id}
              title={meal.name}
              style={{ width: 220 }}
              actions={[
                <>
                  <Space size={13}>
                    <AiFillEdit key="edit" />
                    <Popconfirm
                      placement="top"
                      title="Are you sure you want to remove this meal from your menu"
                      onConfirm={() => deleteMeal(meal._id)}
                    >
                      <AiFillDelete key="delete" />
                    </Popconfirm>
                  </Space>
                </>,
              ]}
            >
              <Card.Meta
                description={
                  <>
                    <p style={{ color: "green" }}>{meal.description}</p>
                    <p style={{ color: "green" }}>
                      Price:
                      {meal.price}
                      <span>&#8358;</span>
                    </p>
                  </>
                }
              />
            </Card>
          ))}
        </Row>
      </div>

      <Modal
        title="Edit Restaurant"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form name="nest-messages" autoComplete="off" onFinish={handleEdit}>
          <Form.Item>
            Restaurant Name
            <Input
              value={values.name}
              size="large"
              required
              name="name"
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item>
            Restaurant Email
            <Input
              value={values.email}
              size="large"
              required
              type="email"
              name="email"
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item>
            Phone Number
            <Input
              showCount
              name="contactNo"
              value={values.contactNo}
              size="large"
              required
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item>
            Address (Please fill a correct address, if possible include a zip
            code. To display your location on Google Map. e.g House Number,
            Street Name, City State, Postal Code )
            <Input
              value={values.address}
              size="large"
              required
              onChange={handleChange}
              name="address"
            />
          </Form.Item>

          <Form.Item>
            Official Chefs Name
            <Input
              value={values.officialChef}
              size="large"
              required
              onChange={handleChange}
              name="officialChef"
            />
          </Form.Item>

          <Form.Item>
            Order Out (Please select True, if your Restaurant takes External
            Orders. Otherwise, select False)
            <Select
              value={values.orderOut}
              size="large"
              onChange={(value) => setValues({ ...values, orderOut: value })}
            >
              <Select.Option value={true}>True</Select.Option>
              <Select.Option value={false}>False</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            Reservations (Please select True, if your Restaurant takes
            Reservations. Otherwise, select False)
            <Select
              value={values.reservations}
              size="large"
              onChange={(value) =>
                setValues({ ...values, reservations: value })
              }
            >
              <Select.Option value={true}>True</Select.Option>
              <Select.Option value={false}>False</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            Category
            <Select
              value={values.category}
              size="large"
              defaultValue="Dinning"
              onChange={(value) => setValues({ ...values, category: value })}
            >
              <Select.Option value="FastFood">Fast Food</Select.Option>
              <Select.Option value="Cafe">Cafe</Select.Option>
              <Select.Option value="Dinning">Dinning</Select.Option>
              <Select.Option value="Cuisine">Cuisine </Select.Option>
              <Select.Option value="Seafood">Seafood</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            Description
            <Input.TextArea
              value={values.description}
              size="large"
              maxLength={1000}
              showCount
              onChange={handleChange}
              name="description"
            />
          </Form.Item>

          <Form.Item>
            <button
              key="submit"
              type="submit"
              className="bg-primary text-white w-10 float-end"
              // loading={confirmLoading}
              onSubmit={handleEdit}
              style={{ width: "100%", height: "2rem" }}
            >
              Edit Restaurant
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManageRest;
