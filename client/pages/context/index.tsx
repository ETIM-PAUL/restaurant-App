import axios from "axios";
import Router from "next/router";
import { useReducer, createContext, useEffect } from "react";

//initial state
const initialState: object = {
  user: null,
};

//create context
const Context = createContext(initialState);

//root reducer
const rootReducer = (state, actions) => {
  switch (actions.type) {
    case "LOGIN":
      return { ...state, user: actions.payload };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
};

//context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  // axios.interceptors.response.use(
  //   function (response) {
  //     //  any status code btw 2XX, run this function
  //     return response;
  //   },
  //   function (error) {
  //     //any status code that falls outside the range of 2xx, run this function
  //     let res = error.response;
  //     if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
  //       return new Promise((resolve, reject) => {
  //         axios
  //           .get(`http://localhost:5000/authentication/logout`)
  //           .then((data) => {
  //             console.log("/401 error > logout");
  //             dispatch({ type: "LOGOUT" });
  //             window.localStorage.removeItem("user");
  //             Router.push("/login");
  //           })
  //           .catch((err) => {
  //             console.log("AXIOS INTERCEPTORS ERR", err);
  //             reject(error);
  //           });
  //       });
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  // useEffect(() => {
  //   const getCsrfToken = async () => {
  //     const { data } = await axios.get(
  //       "http://localhost:5000/authentication/csrf"
  //     );
  //     axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
  //   };
  //   getCsrfToken();
  // }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
