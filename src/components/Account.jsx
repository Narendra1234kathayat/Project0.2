import React, { useState } from "react";
import axios from 'axios';

const Account = () => {
  const [user, setUser] = useState(""); 
  const [all, setAll] = useState([]);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    setUser(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    try {
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage
      setAll([])
      const response = await axios.get(`http://localhost:5050/api/v1/users/c/${user}`,{
        withCredentials: true // This ensures cookies are sent and received
      });
      if (response.data) {
        setAll([response.data.data]); // Assuming the response data is in response.data.data
      }
    } catch (error) {
      setError("error"); 
    }
  }
 

  return (
    <div className="bg-gray-300 h-screen py-36 overflow-auto">
      <div className="container mx-auto text-4xl font-bold">
        <div className="w-full text-center mb-8">
          <form onSubmit={handleSubmit} className="flex justify-center">
            <input 
              type="text" 
              className="p-3 text-2xl text-black border font-light w-fit border-gray-400 rounded relative" 
              placeholder="Search user" 
              value={user} 
              onChange={handleChange} 
            />
            <button type="submit" className="ml-4 text-2xl font-light  text-white p-2 bg-red-500 rounded">Search</button>
          </form>
        </div>
        <div className="userchannel">
          {error &&  <h1 className="text-red-500 text-center">channel not found</h1>}
         
          {all.length > 0 && all.map((u) => (
            <div key={u._id} className=" p-6 rounded-lg shadow-lg mb-8 relative  ">
              <img src={`http://localhost:5050/${u.coverImg}`} className="w-full h-64 object-cover rounded-t-lg" alt="coverimg"/>
              <div className="w-24 h-24 mb-4 absolute top-32 left-20">
                  <img src={`http://localhost:5050/${u.avatar}`} className="w-full h-full object-cover rounded-full " alt={u.avatar}/>
                </div>
              <div className="userprofile w-full flex flex-col p-5 mt-6  ">
                
                <div className=" mb-4">
                  <h1 className="text-3xl font-bold">{u.username}</h1>
                  <h6 className="text-2xl font-light">{u.email}</h6>
                </div>
                <div className="text-center mb-4 flex">
                  <p className="text-2xl font-light me-3  ">Subscribed to <span className="font-bold">{u.subscriberCount}</span></p>
                  <p className="text-2xl font-light">Subscribers: <span className="font-bold">{u.channelSubscriberTocount}</span></p>
                </div>
                <button className={`font-light px-4 py-2 w-fit text-2xl rounded-xl ${u.isSubscribed ? "bg-green-500 text-white" : "bg-red-600 text-white"}`}>
                  {u.isSubscribed ? "Subscribed" : "Not Subscribed"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div> 
  );
};

export default Account;
