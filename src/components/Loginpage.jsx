import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Loginpage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const change = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleregister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5050/api/v1/users/login", formData, {
        withCredentials: true // This ensures cookies are sent and received
      });

      if (response.status === 200) {
        const accessToken = response.data.data.accesstoken;

       await  toast.success('🦄 Login successful!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        localStorage.setItem("accesstoken", accessToken);
       await navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      toast.error('Login failed. Please check your credentials and try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="pt-40 pb-5 h-screen mx-auto bg-gray-300 overflow-auto">
      <div className="max-w-lg min-w-fit mx-auto bg-gray-200 pt-6 p-3 my-10 rounded-xl text-black">
        <ToastContainer />
        <h1 className="font-bold text-5xl p-3 uppercase text-black text-center">LOGIN</h1>
        <form onSubmit={handleregister} className="flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2 mx-3">
            <label className="text-2xl self-center">Email</label>
            <input
              type="email"
              name="email"
              className="p-2 rounded-md border border-gray-300"
              placeholder="Email"
              autoComplete="off"
              onChange={change}
              value={formData.email}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2 mx-3">
            <label className="text-2xl self-center">Password</label>
            <input
              type="password"
              name="password"
              className="p-2 rounded-md border border-gray-300"
              placeholder="Password"
              autoComplete="off"
              onChange={change}
              value={formData.password}
            />
          </div>
          <button type="submit" className="w-full p-3 mt-5 text-2xl bg-black text-white rounded-lg">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Loginpage;
