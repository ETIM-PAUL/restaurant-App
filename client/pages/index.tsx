import { Card, Avatar, Row, Button, Rate, Empty } from "antd";
import { data } from "jquery";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context";

export async function getServerSideProps({ params }) {
  const res = await fetch("http://localhost:5000/restaurants");
  if (!res) {
    throw new Error(`Error! status: ${res.status}`);
  }
  const restaurant = await res.json();

  return {
    props: {
      restaurant,
    },
  };
}
const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const { state, dispatch } = useContext(Context);
  const [keyword, setKeyword] = useState();
  const { Meta } = Card;

  useEffect(() => {
    const keyword = state.keyword;
    console.log(keyword);
    const getRest = async () => {
      const res = await fetch(
        `http://localhost:5000/restaurants?keyword=${keyword}`
      );
      if (!res) {
        throw new Error(`Error! status: ${res.status}`);
      }
      const restaurants = await res.json();
      setRestaurants(restaurants);
    };
    getRest();
  }, [state.keyword]);
  console.log(restaurants);

  return (
    <>
      <div className="jumbotron text-center bg-success h3 pt-2">Home Page</div>
      <Row justify="center" className="mt-4 gap-4 ">
        {restaurants &&
          restaurants.map((x) => (
            <>
              <Link
                href={{
                  pathname: "/restaurant/[_id]",
                  query: { _id: x._id },
                }}
                passHref
                key="x._id"
              >
                <Card
                  style={{ width: 300, cursor: "pointer" }}
                  cover={
                    x.images.length === 1 ? (
                      <img
                        height={200}
                        src={x.images[0]["Location"]}
                        // width={250}
                        alt="*Restaurant image"
                      />
                    ) : (
                      <img alt="*Restaurant image" />
                    )
                  }
                  actions={[
                    <>
                      <Link
                        href={{
                          pathname: "/restaurant/[_id]",
                          query: { _id: x._id },
                        }}
                        passHref
                      >
                        <Button key="moredetails">More Details</Button>
                      </Link>
                      {x.orderOut === true ? (
                        <Button
                          key="Order"
                          disabled
                          className="ms-2 bg-primary"
                        >
                          Orders
                        </Button>
                      ) : (
                        "   "
                      )}
                      {x.reservations === true ? (
                        <Button
                          key="reservation"
                          disabled
                          className="bg-primary"
                        >
                          Reservations
                        </Button>
                      ) : (
                        "   "
                      )}
                      <br />
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={4.5}
                        style={{ fontSize: "12px" }}
                      />
                    </>,
                    // <SettingOutlined key="setting" />,
                    // <EditOutlined key="edit" />,
                    // <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={x.name}
                    description={x.address}
                  />
                </Card>
              </Link>
            </>
          ))}
        {restaurants.length === 0 && <Empty />}
      </Row>
    </>
  );
};

export default HomePage;
