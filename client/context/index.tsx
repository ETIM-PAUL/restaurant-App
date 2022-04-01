import { useReducer, createContext, useEffect } from "react";

//initial state
const initialState: object = {
  user: null,
  userdetails: null,
};

//create context
const Context = createContext(initialState);

//root reducer
const rootReducer = (state: any, actions: { type: any; payload: any }) => {
  switch (actions.type) {
    case "LOGIN":
      return { ...state, user: actions.payload };
    case "SETRESTAURANTS":
      return { ...state, restaurant: actions.payload };
    case "SETKEYWORD":
      return { ...state, keyword: actions.payload };
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

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
