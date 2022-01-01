import React, { useState, useEffect } from "react";
import "./CreateList.css";
import InputField from "./../../common/InputField";
import Button from "@mui/material/Button";
import instance from "./../../axios";
import { useHistory } from "react-router";

const CreateList = () => {
  const [list, setList] = useState({});
  const [movies, setMovies] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const getMovies = async () => {
      const res = await instance.get("/movies/getMovies");
      setMovies(res.data);
    };
    getMovies();
  }, []);

  const handelSelection = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handelChange = ({ name, value }) => {
    setList({ ...list, [name]: value });
  };
  const handelBackToListsList = () => {
    history.push("/lists");
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const res = await instance.post("/lists/create", list);

    if (res.data) {
      history.push("/lists");
    }
  };
  return (
    <div className="createList">
      <div className="createList__header">
        <h2 className="createList__title">New List</h2>
        <Button
          type="button"
          variant="contained"
          className="createMovie__btnBack"
          onClick={handelBackToListsList}
        >
          Back To Lists List
        </Button>
      </div>

      <form onSubmit={handelSubmit}>
        <div className="createList__group">
          <div className="createList__groupL">
            <div className="inputField">
              <InputField
                label="List name"
                placeholder="Best movies"
                border
                value={list.title ? list.title : ""}
                name="title"
                onchange={(e) => handelChange(e)}
              />
            </div>
            <div className="inputField">
              <InputField
                label="Genre"
                placeholder="comedy"
                border
                value={list.genre ? list.genre : ""}
                name="genre"
                onchange={(e) => handelChange(e)}
              />
            </div>

            <div className="createList__typeSelect">
              <label htmlFor="">Type:</label>
              <select
                name="type"
                id=""
                className="createList__typeSelectSel"
                onChange={(e) => handelChange(e.target)}
              >
                <option>Type</option>
                <option value="movie">Movie</option>
                <option value="serie">Serie</option>
              </select>
            </div>
          </div>
          <div className="createList__groupR">
            <div className="createList__select">
              <label htmlFor="">Content:</label>
              <select
                multiple
                name="content"
                id=""
                className="createList__selectSel"
                onChange={handelSelection}
              >
                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="createList__botton">
              <Button type="submit" variant="contained">
                Create
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateList;
