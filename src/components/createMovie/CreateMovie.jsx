import React, { useState } from "react";
import "./CreateMovie.css";
import InputField from "../../common/InputField";
import Button from "@mui/material/Button";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import instance from "../../axios";
import { useHistory } from "react-router";

const CreateMovie = () => {
  const [movie, setMovie] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [imageTitle, setImageTitle] = useState(null);
  const [imageSm, setImageSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const history = useHistory();

  const handelChange = ({ name, value }) => {
    setMovie({ ...movie, [name]: value });
  };

  const handelBackToListMovie = () => {
    history.push("/movies");
  };
  const resetForm = () => {
    setImageUrl(" ");
    setImageTitle(" ");
    setImageSm(" ");
    setTrailer(" ");
    setVideo(" ");
  };
  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + Math.random();
      const storageRef = ref(storage, `items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
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
              return { ...prev, [item.label]: downloadURL };
            });
          });
        }
      );
    });
    setUploaded(true);
  };

  const handelUpload = (e) => {
    e.preventDefault();
    upload([
      { file: imageUrl, label: "imageUrl" },
      { file: imageTitle, label: "imageTitle" },
      { file: imageSm, label: "imageSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await instance.post("/movies/create", movie);
    if (response.data) {
      setUploaded(false);
      resetForm();
    }
  };
  return (
    <div className="createMovie">
      <div className="createMovie__header">
        <h2 className="createMovie__title">New Movie</h2>
        <Button
          type="button"
          variant="contained"
          className="createMovie__btnBack"
          onClick={handelBackToListMovie}
        >
          Back To Movies List
        </Button>
      </div>

      <form onSubmit={handelSubmit}>
        <div className="createMovie__group">
          {!uploaded ? (
            <>
              <div className="createMovie__image">
                <label htmlFor="">Image</label>
                <input
                  type="file"
                  name="imageUrl"
                  onChange={(e) => setImageUrl(e.target.files[0])}
                />
              </div>
              <div className="createMovie__image">
                <label htmlFor="">Title Image</label>
                <input
                  type="file"
                  name="imageTitle"
                  onChange={(e) => setImageTitle(e.target.files[0])}
                />
              </div>
              <div className="createMovie__image">
                <label htmlFor="">Thumnail Image</label>
                <input
                  type="file"
                  name="imageSm"
                  onChange={(e) => setImageSm(e.target.files[0])}
                />
              </div>
              <div className="createMovie__image">
                <label htmlFor="">Trailer</label>
                <input
                  type="file"
                  name="trailer"
                  onChange={(e) => setTrailer(e.target.files[0])}
                />
              </div>
              <div className="createMovie__image">
                <label htmlFor="">Video</label>
                <input
                  type="file"
                  name="video"
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              </div>
            </>
          ) : (
            <>
              <div className="inputField">
                <InputField
                  label="Movie name"
                  placeholder="The meg"
                  border
                  name="title"
                  value=""
                  onchange={(e) => handelChange(e)}
                />
              </div>
              <div className="inputField">
                <InputField
                  label="Genre"
                  placeholder="comedy"
                  border
                  name="genre"
                  value=""
                  onchange={(e) => handelChange(e)}
                />
              </div>
              <div className="inputField">
                <InputField
                  label="Duration"
                  placeholder="1h30min"
                  border
                  name="duration"
                  value=""
                  onchange={(e) => handelChange(e)}
                />
              </div>
              <div className="inputField">
                <InputField
                  label="Year"
                  placeholder="2021"
                  border
                  name="year"
                  value=""
                  onchange={(e) => handelChange(e)}
                />
              </div>
              <div className="inputField">
                <InputField
                  label="Limit"
                  placeholder="16"
                  border
                  name="limit"
                  value=""
                  onchange={(e) => handelChange(e)}
                />
              </div>
              <div className="inputField">
                <InputField
                  label="Description"
                  placeholder="the is a good movie"
                  border
                  name="desc"
                  value=""
                  onchange={(e) => handelChange(e)}
                />
              </div>

              <div className="createMovie__select">
                <label htmlFor="">isSeries?:</label>
                <select name="" id="" className="createUser__selectSel">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </>
          )}
          <div className="createMovie__Wrapperbotton">
            {!uploaded ? (
              <Button type="button" variant="contained" onClick={handelUpload}>
                Upload
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                className="createMovie__btnUpAndCre"
              >
                Create
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMovie;
