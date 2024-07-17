import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const Account = () => {
  const { type } = useParams(); // Get 'type' parameter from the route
  const [user, setUser] = useState(type.toLowerCase()); // Initialize user state with 'type' parameter
  const [all, setAll] = useState([]); // Initialize all state as an empty array
  const [error, setError] = useState(null);
  const [userDetail, setUserDetail] = useState(null); // Initialize userDetail as null
  const [avatarForm, showAvatarForm] = useState(false); // Avatar form visibility state
  const [coverImgForm, showCoverImgForm] = useState(false); // Cover image form visibility state
  const [avatar, setAvatar] = useState(null); // State for avatar file
  const [coverImg, setCoverImg] = useState(null); // State for cover image file

  // Update 'user' state and fetch data when 'type' parameter changes
  useEffect(() => {
    if (type.trim() !== "") {
      setUser(type.toLowerCase());
      handleChannel();
      getUserDetails();
    }
  }, [type]);

  const handleChange = (e) => {
    setUser(e.target.value); // Update 'user' state with input value
  };

  const handleChannel = async () => {
    try {
      const response = await axios.get(`http://localhost:5050/api/v1/users/c/${user}`, {
        withCredentials: true
      });
      if (response.data && response.data.data) {
        setAll([response.data.data]); // Update 'all' state with response data
        setError(null); // Clear any previous errors
      } else {
        setError("User not found"); // Handle case where response data is empty or not as expected
        setAll([]); // Clear 'all' state
      }
    } catch (error) {
      setError("Error fetching user data"); // Handle network or server errors
      setAll([]); // Clear 'all' state
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/v1/users/currentuser", {
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
    setError(null); // Clear any previous errors
    if (user.trim() !== "") {
      handleChannel(); // Fetch data on form submission
    } else {
      setError("Please enter a username"); // Handle case where input is empty
      setAll([]); // Clear 'all' state
    }
  };

  // Handle update button click
  const handleUpdateClick = () => {
    showAvatarForm(true); // Show the avatar form
  };

  // Handle cover image button click
  const handleCoverImgClick = () => {
    showCoverImgForm(true); // Show the cover image form
  };

  // Handle form submission for updating avatar
  const handleUpdateAvatar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (avatar) formData.append('avatar', avatar);
    
    try {
      const response = await axios.patch(`http://localhost:5050/api/v1/users/update-avatar`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setUserDetail(response.data.data);
        showAvatarForm(false); // Hide the avatar form
        handleChannel(); // Refresh the channel data
      } else {
        console.log("Error updating avatar");
      }
    } catch (error) {
      console.log("Error updating avatar:", error.message);
    }
  };

  // Handle form submission for updating cover image
  const handleUpdateCoverImg = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (coverImg) formData.append('coverImg', coverImg);
    
    try {
      const response = await axios.patch(`http://localhost:5050/api/v1/users/cover-Image`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setUserDetail(response.data.data);
        showCoverImgForm(false); // Hide the cover image form
        handleChannel(); // Refresh the channel data
      } else {
        console.log("Error updating cover image");
      }
    } catch (error) {
      console.log("Error updating cover image:", error.message);
    }
  };

  return (
    <div className="bg-gray-300 h-screen pt-32 overflow-auto">
      <div className="container relative mx-auto sm:text-4xl font-bold">
        <div className="w-full text-center mb-4">
          <form onSubmit={handleSubmit} className="flex justify-center">
            <input 
              type="text" 
              className="sm:p-3 text-sm sm:text-2xl text-black border font-light w-fit border-gray-400 rounded relative" 
              placeholder="Search channel" 
              value={user} // Bind input value to 'user' state
              onChange={handleChange} 
            />
            <button type="submit" className="ml-4 text-sm sm:text-2xl font-light text-white p-2 bg-red-500 rounded">Search</button>
          </form>
        </div>
        <div className="userchannel relative">
          {error && <h1 className="text-red-500 text-center">{error}</h1>} {/* Display error message */}
         
          {all.length > 0 && all.map((u) => (
            <div key={u._id} className="p-4 rounded-lg shadow-lg mb-8 bg-blue-gray-100 relative">
              <img src={`http://localhost:5050/${u.coverImg}`} className="w-full h-64 object-contain bg-white rounded-t-lg cursor-pointer" alt="coverimg" onClick={handleCoverImgClick}/>
              <div className="w-24 h-24 mb-4 absolute top-32 left-20 cursor-pointer" onClick={handleUpdateClick}>
                <img src={`http://localhost:5050/${u.avatar}`} className="w-full h-full object-cover border-4 border-black rounded-full" alt={u.avatar}/>
              </div>
              <div className="userprofile w-full flex flex-col pt-2 px-4 mt-6">
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
          <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50 z-50">
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
      </div>
    </div> 
  );
};

export default Account;
