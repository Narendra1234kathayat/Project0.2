import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
function Loginpage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [formdata2,setFormData2]=useState({
    user:"",
    password:""
  })
   useEffect(()=>{
   

   },[]);

  const navigate = useNavigate();
  const changedata=(e)=> setFormData2({...formdata2,[e.target.value]:e.target.value });

  const change = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleregister = () => {
    localStorage.setItem("username", formData.username);
    localStorage.setItem("password", formData.password);
    navigate('/home');
  };

  return (
    <div className="pt-40 pb-5 h-screen mx-auto bg-gray-300 overflow-auto"> 
  <div className="max-w-lg min-w-fit mx-auto bg-gray-200 pt-6 p-3 my-10 rounded-xl text-black">
    <h1 className="font-bold text-5xl p-3 uppercase text-black text-center">LOGIN / Signup</h1>
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2 mx-3">
        <label className="text-2xl self-center">User Name</label>
        <input
          type="text"
          className="p-2 rounded-md border border-gray-300"
          placeholder="Username"
          autoComplete="off"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2 mx-3">
        <label className="text-2xl self-center">Password</label>
        <input
          type="password"
          className="p-2 rounded-md border border-gray-300"
          placeholder="Password"
          autoComplete="off"
        />
      </div>
      <button className="w-full p-3 mt-5 text-2xl bg-black text-white rounded-lg">
        LOGIN
      </button>
    </div>
  </div>
</div>

  );
}

export default Loginpage;
