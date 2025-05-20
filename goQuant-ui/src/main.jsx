import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TickProvider } from "./context/TickContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TickProvider>
      <App />
    </TickProvider>
  </React.StrictMode>
);