import React from "react";
import ReactDOM from "react-dom";
import Statistics from "./components/Statistics";
import "./index.css";
import createStore from "./store";
import { Provider } from "react-redux";

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Statistics />
  </Provider>,
  document.getElementById("root")
);
