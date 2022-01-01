import React, { useState } from "react";
import "./Movie.css";

import { imageUserUrl } from "../../avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import WidgetUser from "../widgetLeft/WidgetUser";
import { useHistory, useLocation } from "react-router";

import InputField from "../../common/InputField";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import instance from "../../axios";

const Input = styled("input")({
  display: "none",
});

const Movie = () => {
  const history = useHistory();
  const location = useLocation();
  const [movie, setMovie] = useState(location.movie);

  const handelBackToListMovie = () => {
    history.push("/movies");
  };

  const handleCreateMovie = () => {
    history.push("/createMovie");
  };
  const handelChange = ({ name, value }) => {
    setMovie({ ...movie, [name]: value });
  };

  const upload = (file) => {
    const fileName = new Date().getTime() + "imageUrl" + Math.random();
    const storageRef = ref(storage, `items/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setMovie((prev) => {
            return { ...prev, imageUrl: downloadURL };
          });
        });
      }
    );
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    await instance.put(`/movies/update/${movie._id}`, movie);
  };

  return (
    <div className="movie">
      <div className="movie__header">
        <h2 className="movieHeaderTitle">Movie</h2>
        <div className="movie__headerBtn">
          <Button
            variant="contained"
            className="movie__btnCre "
            onClick={() => handleCreateMovie()}
          >
            Create
          </Button>

          <Button
            type="button"
            variant="contained"
            className="movie__btnBack"
            onClick={handelBackToListMovie}
          >
            Back To Movies List
          </Button>
        </div>
      </div>

      <div className="movie__feed">
        <div className="movie__profile">
          <Card style={{ height: "100%", padding: "5px" }}>
            <CardContent>
              <div className="movie__profileWidget">
                <WidgetUser
                  imageUrl={movie.imageTitle}
                  username={movie.title}
                  right
                />
              </div>

              <div className="movie__profileDetails">
                <table>
                  <tbody>
                    <tr>
                      <td className="movie__profileDetailsItemL">Id:</td>
                      <td className="movie__profileDetailsItemR">
                        {movie._id}
                      </td>
                    </tr>
                    <tr>
                      <td className="movie__profileDetailsItemL">Category:</td>
                      <td className="movie__profileDetailsItemR">
                        {movie.isSeries ? "Serie" : "Movie"}
                      </td>
                    </tr>
                    <tr>
                      <td className="movie__profileDetailsItemL">Genre:</td>
                      <td className="movie__profileDetailsItemR">
                        {movie.genre}
                      </td>
                    </tr>
                    <tr>
                      <td className="movie__profileDetailsItemL">Details:</td>
                      <td className="movie__profileDetailsItemR">
                        <span style={{ marginRight: "10px" }}>
                          {movie.year}
                        </span>
                        <span style={{ marginRight: "10px" }}>
                          {movie.duration}
                        </span>
                        <span>{movie.limit}</span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="movie__profileDetailsItemL">
                        Description:
                      </td>
                      <td className="movie__profileDetailsItemR">
                        {movie.desc}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="movie__update">
        <Card>
          <CardContent>
            <form onSubmit={handelSubmit}>
              <h3 className="movie__updateTitle">Edit Movie</h3>
              <div className="movie__updateWrapper">
                <div className="movie__updateTitleLeft">
                  <div className="movie__updateGroup">
                    <InputField
                      label="movie name"
                      placeholder="The meg"
                      border
                      value={movie.title}
                      name="title"
                      onchange={(e) => handelChange(e)}
                    />

                    <InputField
                      label="Duration"
                      placeholder="1h30min"
                      border
                      value={movie.duration}
                      name="duration"
                      onchange={(e) => handelChange(e)}
                    />
                    <InputField
                      label="Year"
                      placeholder="2021"
                      border
                      value={movie.year}
                      name="year"
                      onchange={(e) => handelChange(e)}
                    />
                    <InputField
                      label="Limit"
                      placeholder="16"
                      border
                      value={movie.limit}
                      name="limit"
                      onchange={(e) => handelChange(e)}
                    />
                  </div>
                </div>

                <div className="movie__updateTitleRight">
                  <div className="movie__updateTitleRightTop">
                    <img
                      src={
                        movie.imageTitle !== " "
                          ? movie.imageTitle
                          : imageUserUrl
                      }
                      alt=""
                    />
                    <label htmlFor="icon-button-file">
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={(e) => upload(e.target.files[0])}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </div>
                  <div className="movie__updateTitleRightBottom">
                    <Button variant="contained" type="submit">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Movie;
