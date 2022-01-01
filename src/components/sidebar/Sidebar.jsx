import React, { useState } from "react";
import "./Sidebar.css";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ReportIcon from "@mui/icons-material/Report";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const Sidebar = () => {
  const [selectSel, setSelectSel] = useState("Home");

  const handelSelect = (select) => {
    setSelectSel(select);
  };

  return (
    <div className="sidebar">
      <Paper elevation={3} square>
        <div className="sidebar__wrapper">
          <div className="sidebar__wrapperMenu">
            <h3 className="sidebar__menuTitle">Dashboard</h3>
            <ul className="sidebar__menuList">
              <Link to="/" className="link">
                <li
                  className={`sidebar__menuItem ${
                    selectSel === "Home" ? " active" : ""
                  }`}
                  onClick={() => handelSelect("Home")}
                >
                  <LineStyleIcon className="sidebar__menuItemIcon" />
                  Home
                </li>
              </Link>
              <li
                className={`sidebar__menuItem ${
                  selectSel === "Analystics" ? " active" : ""
                }`}
                onClick={() => handelSelect("Analystics")}
              >
                <TimelineIcon className="sidebar__menuItemIcon" />
                Analystics
              </li>
              <li
                className={`sidebar__menuItem ${
                  selectSel === "Sales" ? " active" : ""
                }`}
                onClick={() => handelSelect("Sales")}
              >
                <TrendingUpIcon className="sidebar__menuItemIcon" />
                Sales
              </li>
            </ul>
          </div>

          <div className="sidebar__wrapperMenu">
            <h3 className="sidebar__menuTitle">Quick Menu</h3>
            <ul className="sidebar__menuList">
              <Link to="/users" className="link">
                <li
                  className={`sidebar__menuItem ${
                    selectSel === "Users" ? " active" : ""
                  }`}
                  onClick={() => handelSelect("Users")}
                >
                  <PermIdentityIcon className="sidebar__menuItemIcon" />
                  Users
                </li>
              </Link>
              <Link to="/movies" className="link">
                <li
                  className={`sidebar__menuItem ${
                    selectSel === "Movies" ? " active" : ""
                  }`}
                  onClick={() => handelSelect("Movies")}
                >
                  <PlayCircleIcon className="sidebar__menuItemIcon" />
                  Movies
                </li>
              </Link>
              <Link to="/lists" className="link">
                <li
                  className={`sidebar__menuItem ${
                    selectSel === "Lists" ? " active" : ""
                  }`}
                  onClick={() => handelSelect("Lists")}
                >
                  <FormatListBulletedIcon className="sidebar__menuItemIcon" />
                  Lists
                </li>
              </Link>
            </ul>
          </div>

          <div className="sidebar__wrapperMenu">
            <h3 className="sidebar__menuTitle">Notifications</h3>
            <ul className="sidebar__menuList">
              <li
                className={`sidebar__menuItem ${
                  selectSel === "Mail" ? " active" : ""
                }`}
                onClick={() => handelSelect("Mail")}
              >
                <MailOutlineIcon className="sidebar__menuItemIcon" />
                Mail
              </li>
              <li
                className={`sidebar__menuItem ${
                  selectSel === "Feedback" ? " active" : ""
                }`}
                onClick={() => handelSelect("Feedback")}
              >
                <DynamicFeedIcon className="sidebar__menuItemIcon" />
                Feedback
              </li>
              <li
                className={`sidebar__menuItem ${
                  selectSel === "Messages" ? " active" : ""
                }`}
                onClick={() => handelSelect("Messages")}
              >
                <ChatBubbleOutlineIcon className="sidebar__menuItemIcon" />
                Messages
              </li>
            </ul>
          </div>

          <div className="sidebar__wrapperMenu">
            <h3 className="sidebar__menuTitle">Staff</h3>
            <ul className="sidebar__menuList">
              <li
                className={`sidebar__menuItem ${
                  selectSel === "Manage" ? " active" : ""
                }`}
                onClick={() => handelSelect("Manage")}
              >
                <WorkOutlineIcon className="sidebar__menuItemIcon" />
                Manage
              </li>
              <li
                className={`sidebar__menuItem ${
                  selectSel === "Analys" ? " active" : ""
                }`}
                onClick={() => handelSelect("Analys")}
              >
                <TimelineIcon className="sidebar__menuItemIcon" />
                Analystics
              </li>
              <li
                className={`sidebar__menuItem ${
                  selectSel === "Reports" ? " active" : ""
                }`}
                onClick={() => handelSelect("Reports")}
              >
                <ReportIcon className="sidebar__menuItemIcon" />
                Reports
              </li>
            </ul>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Sidebar;
