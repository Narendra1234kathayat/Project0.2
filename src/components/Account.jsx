import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const Account = () => {
  const { type } = useParams();
  const [user, setUser] = useState(type.toLowerCase());
  const [all, setAll] = useState([]);
  const [error, setError] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [avatarForm, showAvatarForm] = useState(false);
  const [coverImgForm, showCoverImgForm] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    if (type.trim() !== "") {
      setUser(type.toLowerCase());
      handleChannel();
      getUserDetails();
    }
  }, [type]);

  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const video = videoRefs.current[key];
      if (video) {
        if (parseInt(key) === activeVideo) {
          video.currentTime = 0;
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }, [activeVideo]);

  useEffect(() => {
    if (all.length > 0) {
      fetchUserVideos();
    }
  }, [all]);

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const handleChannel = async () => {
    try {
      const response = await axios.get(`https://backend-twff.onrender.com/api/v1/users/c/${user}`, {
        withCredentials: true
      });
      if (response.data && response.data.data) {
        setAll([response.data.data]);
        setError(null);
      } else {
        setError("User not found");
        setAll([]);
      }
    } catch (error) {
      setError("Error fetching user data");
      setAll([]);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("https://backend-twff.onrender.com/api/v1/users/currentuser", {
        withCredentials: true
      });
      if (res.status === 200) {
        setUserDetail(res.data.data);
      } else {
        setUserDetail(null);
      }
    } catch (error) {
      console.log("Error fetching user details:", error.message);
      setUserDetail(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (user.trim() !== "") {
      handleChannel();
    } else {
      setError("Please enter a username");
      setAll([]);
    }
  };

  const fetchUserVideos = async () => {
    try {
      const { _id } = all[0];
      if (!_id) {
        throw new Error('User ID is required');
      }

      const res = await axios.get('https://backend-twff.onrender.com/api/v1/videos/', {
        params: { userId: _id },
        withCredentials: true
      });

      const userVideos = res.data.data;
      setUserVideos(userVideos);
    } catch (error) {
      console.error('Error fetching user videos:', error);
    }
  };

  const handleUpdateClick = () => {
    showAvatarForm(true);
  };

  const handleCoverImgClick = () => {
    showCoverImgForm(true);
  };

  const handleAvatar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (avatar) formData.append('avatar', avatar);

    try {
      const response = await axios.patch(`https://backend-twff.onrender.com/api/v1/users/update-avatar`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setUserDetail(response.data.data);
        showAvatarForm(false);
        handleChannel();
      } else {
        console.log("Error updating avatar");
      }
    } catch (error) {
      console.log("Error updating avatar:", error.message);
    }
  };

  const handleCoverImg = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (coverImg) formData.append('coverImg', coverImg);

    try {
      const response = await axios.patch(`https://backend-twff.onrender.com/api/v1/users/cover-Image`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setUserDetail(response.data.data);
        showCoverImgForm(false);
        handleChannel();
      } else {
        console.log("Error updating cover image");
      }
    } catch (error) {
      console.log("Error updating cover image:", error.message);
    }
  };

  const handleMouseEnter = (index) => {
    setActiveVideo(index);
  };

  const handleMouseLeave = () => {
    setActiveVideo(null);
  };

  const watchVideo = (id) => {
    // Implement the logic to watch a video by ID
  };

  return (
    <div className="bg-black h-screen pt-28 overflow-auto">
      <div className="container relative mx-auto sm:text-4xl font-bold">
        <div className="w-full text-center ">
          <form onSubmit={handleSubmit} className="flex justify-center">
            <input
              type="text"
              className="sm:p-3 text-sm sm:text-2xl text-black border font-light w-fit border-gray-400 rounded relative"
              placeholder="Search channel"
              value={user}
              onChange={handleChange}
            />
            <button type="submit" className="ml-4 text-sm sm:text-2xl font-light text-white p-2 bg-red-500 rounded">Search</button>
          </form>
        </div>
        <div className="userchannel relative">
          {error && <h1 className="text-red-500 text-center">{error}</h1>}
          {all.length > 0 && all.map((u) => (
            <div key={u._id} className="p-2 rounded-lg shadow-lg mb-8 bg-black text-white relative">
              <img src={`https://backend-twff.onrender.com/${u.coverImg}`} className="w-full h-56 object-contain bg-white rounded-t-lg cursor-pointer" alt="coverimg" onClick={handleCoverImgClick} />
              <div className="w-24 h-24 mb-4 absolute top-32 left-20 cursor-pointer" onClick={handleUpdateClick}>
                <img src={`https://backend-twff.onrender.com/${u.avatar}`} className="w-full h-full object-cover border-4 border-black rounded-full" alt={u.avatar} />
              </div>
              <div className="userprofile w-full flex flex-col  px-4 mt-3">
                <div className="mb-4">
                  <h1 className="text-sm sm:text-3xl font-bold">{u.username.toUpperCase()}</h1>
                  <h6 className="text-sm sm:text-2xl font-light">{u.email}</h6>
                </div>
                <div className="text-center mb-4 flex">
                  <p className="text-sm sm:text-2xl font-light me-3">Subscribed to <span className="font-bold">{u.subscriberCount}</span></p>
                  <p className="text-sm sm:text-2xl font-light">Subscribers: <span className="font-bold">{u.channelSubscriberTocount}</span></p>
                </div>
                <div className="flex justify-between">
                  <button className={`font-light px-4 py-2 w-fit text-sm sm:text-2xl rounded-xl ${u.isSubscribed ? "bg-green-500 text-white" : "bg-red-600 text-white"}`}>
                    {u.isSubscribed ? "Subscribed" : "Not Subscribed"}
                  </button>
                  {userDetail && userDetail.username.toLowerCase() === u.username.toLowerCase() && (
                    <button onClick={handleUpdateClick}>
                      <i className="fa fa-pencil-square" aria-hidden="true"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {avatarForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="update bg-white p-4 rounded-lg shadow-lg text-2xl">
                <form onSubmit={handleAvatar}>
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
                      onClick={() => showAvatarForm(false)}
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
                <form onSubmit={handleCoverImg}>
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
                      onClick={() => showCoverImgForm(false)}
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
        <div className="text-white mx-auto">
          <p className="text-gray-500">Channel videos</p>
          {userVideos.length === 0 ? (
            <div className="text-red-600 h-screen text-center w-full  text-5xl">
              <h1>No videos found..</h1>
            </div>
          ) : (
            <div className="max-w-screen-2xl text-white mx-auto p-2  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:p-0 gap-2">
              {userVideos.map((video, index) => (
                <div
                  key={video._id}
                  onClick={() => watchVideo(video._id)}
                  className="my-1 cursor-pointer bg-transparent rounded-md shadow-md"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="relative h-52 md:h-48 w-full">
                    <img
                      src={`https://backend-twff.onrender.com/${video.thumbnail}`}
                      className={`h-full w-full object-fill bg-white transition-opacity duration-500 ${activeVideo === index ? "opacity-0" : "opacity-100"}`}
                      alt=""
                    />
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      className={`h-full w-full rounded-lg absolute object-cover right-0 bottom-0 delay-300 top-0 left-0 transition-opacity duration-500 ${activeVideo === index ? "opacity-100 block" : "opacity-0 hidden"}`}
                      controls
                      loop
                      muted
                    >
                      <source src={`https://backend-twff.onrender.com/${video.videoFile}`} type="video/mp4" />
                    </video>
                  </div>
                  <div className="flex flex-shrink-0 p-1">
                    <div className="me-1">
                      <img
                        src={`https://backend-twff.onrender.com/${video.useravatar}`}
                        className="p-2 w-14 rounded-full h-14"
                        alt="avatar"
                      />
                      <p className="my-2 text-sm font-light text-gray-600">{video.username.toUpperCase()}</p>
                    </div>
                    <div>
                      <h1 className="desc font-bold text-sm">{video.title}</h1>
                      <p className="text-gray-600 text-sm">
                        {video.description.slice(0, 40)}
                        {video.description.length > 40 && '...'}
                      </p>
                      <p className="text-sm">{video.views} views</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
