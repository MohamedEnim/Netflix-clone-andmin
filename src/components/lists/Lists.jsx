import React, { useEffect, useState } from "react";
import "./Lists.css";
import instance from "./../../axios";
import { useHistory } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const Lists = () => {
  const history = useHistory();
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 250,
    },

    {
      field: "title",
      headerName: "Title",
      width: 250,
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 130,
    },
    {
      field: "type",
      headerName: "type",
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
              <EditIcon className="listsList__edit" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handelDelete(params.row._id)}
            >
              <DeleteIcon className="listsList__delete" />
            </IconButton>
          </>
        );
      },
    },
  ];
  const [lists, setLists] = useState([]);
  useEffect(() => {
    let canceled = false;
    const getLists = async () => {
      const res = await instance.get("/lists/getLists");
      if (canceled) return;
      setLists(res.data);
    };
    getLists();

    return () => {
      canceled = true;
    };
  }, []);

  const handelDelete = async (id) => {
    const res = await instance.delete(`/lists/delete/${id}`);
    setLists(res.data);
  };

  const handleCreateList = () => {
    history.push("/createList");
  };

  const handelNavigation = (list) => {
    history.push({ pathname: `list/${list._id}`, list: list });
  };

  return (
    <div className="listList">
      <div className="listList__btn">
        <Button variant="contained" onClick={() => handleCreateList()}>
          Create List
        </Button>
      </div>
      {lists.length > 0 && (
        <div className="listList__table">
          <DataGrid
            rows={lists}
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

export default Lists;
