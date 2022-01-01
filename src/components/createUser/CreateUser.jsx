import React, { useState } from "react";
import "./CreateUser.css";
import InputField from "./../../common/InputField";
import Button from "@mui/material/Button";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import instance from "./../../axios";
import { useHistory } from "react-router-dom";

const CreateUser = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [profileUrl, setProfileUrl] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handelChange = ({ name, value }) => {
    setUser({ ...user, [name]: value });
  };

  const handelBackToListUser = () => {
    history.push("/users");
  };

  const upload = (item) => {
    const fileName = new Date().getTime() + item.label + Math.random();
    const storageRef = ref(storage, `users/${fileName}`);
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
          setUser((prev) => {
            return { ...prev, [item.label]: downloadURL };
          });
          setUploaded(true);
        });
      }
    );
  };

  const handelUpload = (e) => {
    e.preventDefault();
    upload({ file: profileUrl, label: "profileUrl" });
  };

  const resetForm = () => {
    setUser({});
    setProfileUrl(null);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await instance.post("/users/create", user);
    if (response.data) {
      setUploaded(false);
      resetForm();
    }
  };

  return (
    <div className="createUser">
      <div className="createUser__header">
        <h2 className="createUser__title">Create User</h2>
        <Button
          type="button"
          variant="contained"
          className="createUser__btnBack"
          onClick={handelBackToListUser}
        >
          Back To Users List
        </Button>
      </div>
      {!uploaded ? (
        <>
          <div className="createUser__image">
            <label htmlFor="">Profile image</label>
            <input
              disabled={uploaded}
              type="file"
              name="imageUrl"
              onChange={(e) => setProfileUrl(e.target.files[0])}
            />
          </div>

          <div className="createUser__botton">
            <Button variant="contained" type="button" onClick={handelUpload}>
              Upload Image
            </Button>
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handelSubmit}>
            <div className="createUser__group">
              <div className="createUser__inputField">
                <InputField
                  label="Username"
                  placeholder="annabeck99"
                  border
                  name="username"
                  value=""
                  disabled={!uploaded}
                  onchange={(e) => handelChange(e)}
                />
              </div>
              <div className="createUser__inputField">
                <InputField
                  label="Email"
                  placeholder="anna@gmail.com"
                  type="email"
                  border
                  name="email"
                  value=""
                  disabled={!uploaded}
                  onchange={(e) => handelChange(e)}
                />
              </div>
              <div className="createUser__inputField">
                <InputField
                  label="Password"
                  type="password"
                  placeholder="password"
                  border
                  name="password"
                  value=""
                  disabled={!uploaded}
                  onchange={(e) => handelChange(e)}
                />
              </div>
              <div className="createUser__select">
                <label htmlFor="">isAdmin?:</label>
                <select
                  name="isAdmin"
                  id=""
                  className="createUser__selectSel"
                  onChange={(e) => handelChange(e)}
                  disabled={!uploaded}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="createUser__botton">
                <Button variant="contained" type="submit">
                  Create
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateUser;
