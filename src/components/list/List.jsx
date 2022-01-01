import React, { useState } from "react";
import "./List.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useHistory, useLocation } from "react-router";
import InputField from "./../../common/InputField";
import instance from "./../../axios";

const List = () => {
  const history = useHistory();
  const location = useLocation();
  const [list, setList] = useState(location.list);

  const handleCreateList = () => {
    history.push("/createList");
  };
  const handelChange = ({ name, value }) => {
    setList({ ...list, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    await instance.put(`/lists/update/${list._id}`, list);
  };

  return (
    <div className="list">
      <div className="list__header">
        <h2 className="listHeaderTitle">List</h2>
        <Button variant="contained" onClick={() => handleCreateList()}>
          Create
        </Button>
      </div>

      <div className="list__feed">
        <div className="list__profile">
          <Card style={{ height: "100%", padding: "5px" }}>
            <CardContent>
              <div className="list__profileDetails">
                <table>
                  <tbody>
                    <tr>
                      <td className="list__profileDetailsItemL">Id:</td>
                      <td className="list__profileDetailsItemR">{list._id}</td>
                    </tr>
                    <tr>
                      <td className="list__profileDetailsItemL">Type:</td>
                      <td className="list__profileDetailsItemR">{list.type}</td>
                    </tr>
                    <tr>
                      <td className="list__profileDetailsItemL">Genre:</td>
                      <td className="list__profileDetailsItemR">
                        {list.genre}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="list__update">
          <Card>
            <CardContent>
              <form onSubmit={handelSubmit}>
                <h3 className="list__updateTitle">Edit List</h3>

                <div className="list__updateGroup">
                  <InputField
                    label="Movie name"
                    placeholder="movies"
                    border
                    value={list.title}
                    name="title"
                    onchange={(e) => handelChange(e)}
                  />
                  <InputField
                    label="Genre"
                    placeholder="comedy"
                    border
                    value={list.genre}
                    name="genre"
                    onchange={(e) => handelChange(e)}
                  />
                  <InputField
                    label="Type"
                    placeholder="movies"
                    border
                    value={list.type}
                    name="type"
                    onchange={(e) => handelChange(e)}
                  />

                  <div className="list__updateTitleRightBottom">
                    <Button variant="contained" type="submit">
                      Update
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default List;
