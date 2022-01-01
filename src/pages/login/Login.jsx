import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import * as CryptoJS from "crypto-js";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/featured/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      let user = { email: email, password: password };
      const res = await axios.post(
        "http://localhost:3001/api/auth/login",
        user
      );
      let token = {
        accessToken: res.headers["x-access-token"],
        refreshToken: res.headers["x-refresh-token"],
        user: res.data,
      };

      dispatch(login(token));

      let cryptoToken = CryptoJS.AES.encrypt(
        JSON.stringify(token),
        process.env.REACT_APP_SECRET_KEY
      ).toString();
      localStorage.setItem("token", cryptoToken);
      history.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handelSubmit}>
        <div className="login__container">
          <h2 className="login__title">Login</h2>
          <div className="login_groupItem">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="email..."
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login_groupItem">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="password..."
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login__btn">
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
