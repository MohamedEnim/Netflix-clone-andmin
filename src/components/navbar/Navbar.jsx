import React from "react";
import "./Navbar.css";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { imageUserUrl } from "./../../avatar";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/featured/userSlice";

export const Navbar = () => {
  const dispatch = useDispatch();

  const handelLogout = () => {
    dispatch(logout());
    // localStorage.removeItem("token");
  };

  return (
    <div className="navbar">
      <Paper
        elevation={3}
        square
        style={{ width: "100% !important", height: "100% !important" }}
      >
        <div className="navbar__wrapper">
          <div className="navbar__wrapperLeft">
            <Link to="/" className="link">
              <span className="navbar__wrapperLeftLogo">Netflix Admin</span>
            </Link>
          </div>
          <div className="navbar__wrapperRight">
            <IconButton onClick={handelLogout}>
              <Avatar alt="Cindy Baker" src={imageUserUrl} />
            </IconButton>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Navbar;
