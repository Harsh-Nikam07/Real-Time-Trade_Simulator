import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const TickContext = createContext();

const initialState = {
  tick: {},
  loading: true,
  error: null,
};

function tickReducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, tick: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { ...state, tick: {}, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const TickProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tickReducer, initialState);

  const fetchLatestTick = async () => {
    try {
      const res = await axios.get("http://localhost:8000/latest-tick");
      dispatch({ type: "FETCH_SUCCESS", payload: res.data });
    } catch {
      dispatch({ type: "FETCH_ERROR", payload: "Failed to fetch tick data" });
    }
  };

  useEffect(() => {
    fetchLatestTick(); // fetch initially
    const interval = setInterval(fetchLatestTick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TickContext.Provider value={state}>
      {children}
    </TickContext.Provider>
  );
};
