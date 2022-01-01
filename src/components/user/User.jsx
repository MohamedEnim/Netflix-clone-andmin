import React, { useState } from "react";
import { imageUserUrl } from "../../avatar";
import WidgetUser from "../widgetLeft/WidgetUser";
import "./User.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import InputField from "./../../common/InputField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Option from "../../common/Option";
import { useHistory, useLocation } from "react-router";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import instance from "./../../axios";

const Input = styled("input")({
  display: "none",
});

const User = () => {
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(location.user);

  const handelChange = ({ name, value }) => {
    setUser({ ...user, [name]: value });
  };

  const upload = (file) => {
    const fileName = new Date().getTime() + "profileUrl" + Math.random();
    const storageRef = ref(storage, `users/${fileName}`);
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
          setUser((prev) => {
            return { ...prev, profileUrl: downloadURL };
          });
        });
      }
    );
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    await instance.put(`/users/update/${user._id}`, user);
  };

  const handleCreateUser = () => {
    history.push("/createUser");
  };
  return (
    <div className="user">
      <div className="user__header">
        <h2 className="userHeaderTitle">Edit User</h2>
        <Button variant="contained" onClick={() => handleCreateUser()}>
          Create
        </Button>
      </div>

      <div className="user__feed">
        <div className="user__propile">
          <Card style={{ height: "100%" }}>
            <CardContent>
              <div className="user__propileWidget">
                <WidgetUser
                  imageUrl={
                    user?.profileUrl !== " " ? user.profileUrl : imageUserUrl
                  }
                  username={user?.username}
                  right
                  update
                />
              </div>

              <div className="user__profileDetails">
                <h3 className="user__profileDetailsTitle">Account Details</h3>
                <div className="user__profileDetailsGroup">
                  <Option Icon={PermIdentityIcon} label={user?.username} />
                  <Option Icon={EmailIcon} label={user?.email} />
                  <Option Icon={PasswordIcon} label={user?.password} />
                  <div className="user__profileDetailsItem">
                    <label className="user__itemL">Admin:</label>
                    <label>{user?.isAdmin.toString()}</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="user__update">
          <Card>
            <CardContent>
              <form onSubmit={handelSubmit}>
                <h3 className="user__updateTitle">Edit User</h3>
                <div className="user__updateWrapper">
                  <div className="user__updateTitleLeft">
                    <div className="user__updateGroupe">
                      <InputField
                        label="Username"
                        placeholder="annabeck99"
                        value={user.username}
                        border
                        name="username"
                        onchange={(e) => handelChange(e)}
                      />

                      <InputField
                        label="Email"
                        placeholder="anna@gmail.com"
                        value={user.email}
                        border
                        name="email"
                        onchange={(e) => handelChange(e)}
                      />
                      <InputField
                        label="Password"
                        placeholder="password"
                        border
                        value={user.password}
                        name="password"
                        onchange={(e) => handelChange(e)}
                      />
                      <div className="createList__typeSelect">
                        <label htmlFor="">isAdmin?:</label>
                        <select
                          name="isAdmin"
                          id=""
                          value={user.isAdmin}
                          className="createList__typeSelectSel"
                          onChange={(e) => handelChange(e.target)}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="user__updateTitleRight">
                    <div className="user__updateTitleRightTop">
                      <img
                        src={
                          user?.profileUrl !== " "
                            ? user.profileUrl
                            : imageUserUrl
                        }
                        alt=""
                      />
                      <label htmlFor="icon-button-file">
                        <Input
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                          name="image"
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
                    <div className="user__updateTitleRightBottom">
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
    </div>
  );
};

export default User;
