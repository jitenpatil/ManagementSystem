import React, { createContext, useReducer, PropsWithChildren } from "react";

export const initialValues = {
  userDetails: {
    email: "",
    phoneNumber: ""
  }
};

export const UserContext = createContext({});

function reducer(state: any, action: any) {
  switch (action.type) {
    case "SET_USER_DETAILS_DATA":
      return { ...state, userDetails: action.data };
    default:
      return state;
  }
}

export const UserContextProvider: React.FC<PropsWithChildren> = ({
  children
}: any) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  const setUserDetails = (input?: any) => {
    dispatch({ type: "SET_USER_DETAILS_DATA", data: input });
  };
  console.log("State", state);
  return (
    <UserContext.Provider value={{ userData: state, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
