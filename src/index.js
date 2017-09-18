import "font-awesome/css/font-awesome.min.css";
import "./index.css";
import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

render(<App />, document.getElementById("root"));

registerServiceWorker();
