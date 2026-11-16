import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { IS_DEMO_MODE } from "./demo/demoConfig";
import { installDemoFetch } from "./demo/demoApi";

if (IS_DEMO_MODE) {
  installDemoFetch();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);