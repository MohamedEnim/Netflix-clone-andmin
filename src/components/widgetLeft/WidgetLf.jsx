import React, { useState, useEffect } from "react";
import "./WidgetLf.css";
import WidgetUser from "./WidgetUser";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import instance from "../../axios";

const WidgetLf = () => {
  const imageUserUrl =
    "https://images.unsplash.com/photo-1464863979621-258859e62245?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=386&q=80";
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let canceled = false;
    const getUsers = async () => {
      const res = await instance.get("/users/getUsers", {
        params: {
          new: 5,
        },
      });

      if (canceled) return;
      setUsers(res.data);
    };

    getUsers();

    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div className="widgetLf">
      <Card>
        <CardContent>
          <h3 className="widgetLf__title">New Join Members</h3>
          {users.map((user) => (
            <WidgetUser
              key={user._id}
              imageUrl={user.profileUrl || imageUserUrl}
              username={user.username}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default WidgetLf;
