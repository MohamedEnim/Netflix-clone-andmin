import React, { useEffect, useState } from "react";
import "./UserList.css";
import instance from "./../../axios";
import { useHistory } from "react-router";
import Button from "@mui/material/Button";
import WidgetUser from "./../widgetLeft/WidgetUser";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const UserList = () => {
  const history = useHistory();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "user",
      headerName: "User",
      width: 180,
      renderCell: (params) => {
        return (
          <WidgetUser
            imageUrl={params.row.profileUrl}
            username={params.row.username}
            right
          />
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 130,
    },
    {
      field: "updatedAt",
      headerName: "UpdatedAt",
      width: 170,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="edit"
              onClick={() => handelNavigation(params.row)}
            >
              <EditIcon className="userList__edit" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handelDelete(params.row._id)}
            >
              <DeleteIcon className="userList__delete" />
            </IconButton>
          </>
        );
      },
    },
  ];

  const [users, setUsers] = useState([]);
  useEffect(() => {
    let canceled = false;
    const getUsers = async () => {
      const res = await instance.get("/users/getUsers");
      if (canceled) return;
      setUsers(res.data);
    };

    getUsers();

    return () => {
      canceled = true;
    };
  }, []);

  const handleCreateUser = () => {
    history.push("/createUser");
  };

  const handelDelete = async (id) => {
    const res = await instance.delete(`/users/delete/${id}`);
    setUsers(res.data);
  };

  const handelNavigation = (user) => {
    history.push({ pathname: `user/${user._id}`, user: user });
  };

  return (
    <div className="userList">
      <div className="userList__btn">
        <Button variant="contained" onClick={() => handleCreateUser()}>
          Create User
        </Button>
      </div>
      {users.length > 0 && (
        <div className="userList__table">
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(r) => r._id}
          />
        </div>
      )}
    </div>
  );
};

export default UserList;
