import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import instance from "./axios";
import * as CryptoJS from "crypto-js";
import { Provider } from "react-redux";
import { store } from "./store/store";

instance.interceptors.request.use((req) => {
  let token = localStorage.getItem("token");
  if (!token) {
    if (req.url.includes("auth")) {
      return req;
    }
  }
  let bytes = CryptoJS.AES.decrypt(token, process.env.REACT_APP_SECRET_KEY);
  let decryptToken = bytes.toString(CryptoJS.enc.Utf8);

  req.headers["x-access-token"] = JSON.parse(decryptToken).accessToken;
  return req;
});

instance.interceptors.response.use((res) => {
  return res;
});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
