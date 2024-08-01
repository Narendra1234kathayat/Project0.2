import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import History from "./History.jsx";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const User = () => {
  const [userdetail, setUserDetail] = useState(null);
  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [avatarForm, setAvatarForm] = useState(false);
  const [coverImgForm, setCoverImgForm] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [coverImg, setCoverImg] = useState(null);

  useEffect(() => {
    getUserDetail();
  }, []);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const getUserDetail = async () => {
    try {
      const res = await axios.get(
        "https://backend-2sfx.onrender.com/api/v1/users/currentuser",
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setUserDetail(res.data.data);
        setUserName(res.data.data.fullname); // Set initial name value
        setEmail(res.data.data.email); // Set initial email value
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setUserName(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.patch(
        "https://backend-2sfx.onrender.com/api/v1/users/update-account",
        { fullname: name, email: email },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setUserDetail(res.data.data);
        setShowForm(!showForm);
      }
    } catch (error) {
      console.log("Error updating user details:", error);
    }
  };

  const handleAvatarChange = () => {
    setAvatarForm(!avatarForm);
  };

  const handleCoverChange = () => {
    setCoverImgForm(!coverImgForm);
  };

  const handleUpdateAvatar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (avatar) formData.append('avatar', avatar);

    try {
      const response = await axios.patch(`https://backend-2sfx.onrender.com/api/v1/users/update-avatar`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        
        setUserDetail(response.data.data);
        setAvatarForm(false); // Hide the avatar form
        console.log(userdetail)
        getUserDetail(); // Refresh user details
      } else {
        console.log("Error updating avatar");
      }
    } catch (error) {
      console.log("Error updating avatar:", error.message);
    }
  };

  const handleUpdateCoverImg = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (coverImg) formData.append('coverImg', coverImg);

    try {
      const response = await axios.patch(`https://backend-2sfx.onrender.com/api/v1/users/cover-Image`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setUserDetail(response.data.data);
        setCoverImgForm(false); // Hide the cover image form
        getUserDetail(); // Refresh user details
      } else {
        console.log("Error updating cover image");
      }
    } catch (error) {
      console.log("Error updating cover image:", error.message);
    }
  };

  return (
    <div className="bg-black">
      <div className="pt-32 mx-auto container ">
      {userdetail ? (
        <>
          <div className="bg-black border-2 shadow-md rounded-lg overflow-hidden md:flex md:items-center mx-auto max-w-4xl">
            <img
              src={`https://backend-2sfx.onrender.com/${userdetail.avatar}`}
              onClick={handleAvatarChange}
              alt="User Avatar"
              className="h-32 w-32 mx-auto md:h-auto md:w-32 md:rounded-l-lg object-cover"
            />
            <div className="p-4 md:flex md:flex-col md:justify-between w-full">
              <div className="mb-4 md:mb-0 md:mr-4">
                <img
                  src={`https://backend-2sfx.onrender.com/${userdetail.coverImg}`}
                  onClick={handleCoverChange}
                  alt="User Cover Image"
                  className="w-full h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userdetail.fullname}</h2>
                <p className="text-gray-600">
                  <strong>Username:</strong> {userdetail.username}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {userdetail.email}
                </p>
                
                <p className="text-gray-600">
                  <strong>Created At:</strong>{" "}
                  {new Date(userdetail.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  <strong>Updated At:</strong>{" "}
                  {new Date(userdetail.updatedAt).toLocaleString()}
                </p>
                <div className="text-end me-3" onClick={handleShowForm}>
                  <p>
                    <i
                      className="fa text-white fa-pencil-square text-2xl"
                      aria-hidden="true"
                    ></i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div className="2xl:container flex gap-3 justify-between">
        <Link to="/watch-history">
          <h1 className="sm:text-xl my-2 text-red-500 underline bg-white p-3">
           Get Your Watch history
          </h1>
        </Link>
        <Link to="/liked_videos">
          <h1 className="sm:text-xl my-2 text-red-500 underline bg-white p-3">
           Get Your liked videos
          </h1>
        </Link>
      </div>
      <div className="">
        <History />
        <Link to="/watch-history">
          <h1 className="text-end text-xl my-6 underline"> show all...</h1>
        </Link>
      </div>
      {showForm && (
        <div className="updateemail bg-white">
          <Card
            className="bg-white w-fit p-6 mx-auto absolute bottom-10 right-0 left-0"
            color="transparent"
            shadow={false}
          >
            <Typography
              color="gray"
              className="mt-1 relative w-full text-2xl text-black mx-auto font-normal flex justify-between"
            >
              Update
              <p
                className="absolute right-0 ms-10 font-normal"
                onClick={handleShowForm}
              >
                cancel
              </p>
            </Typography>
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleSubmit}
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="name"
                  name="name"
                  className="!border-t-blue-gray-200 text-black focus:!border-t-gray-900"
                  value={name}
                  onChange={handleChange}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Email
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <Button type="submit" className="mt-6" fullWidth>
                Update ...
              </Button>
            </form>
          </Card>
        </div>
      )}
      {avatarForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="update bg-white p-4 rounded-lg shadow-lg text-2xl">
            <form onSubmit={handleUpdateAvatar}>
              <div className="mb-4">
                <label className="block mb-2">Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleAvatarChange}
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {coverImgForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="update bg-white p-4 rounded-lg shadow-lg text-2xl">
            <form onSubmit={handleUpdateCoverImg}>
              <div className="mb-4">
                <label className="block mb-2">Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImg(e.target.files[0])}
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleCoverChange}
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default User;
