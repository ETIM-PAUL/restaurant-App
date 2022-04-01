import { Result, Button } from "antd";
import Link from "next/link";
import Router from "next/router";
import { useContext } from "react";
import { useEffect } from "react";
import { Context } from "context";

const UnAuthorized = () => {
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user !== null) Router.push("/dashboard");
  }, [user]);

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Link href="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};

export default UnAuthorized;
