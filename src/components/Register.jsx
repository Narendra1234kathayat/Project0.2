import { useState } from 'react';
import { Button } from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullname: '',
    password: '',
    avatar: null,
    coverImg: null
  });
  const navigate=useNavigate();

  // Handler function to update form data
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    // If input is a file (avatar or cover image)
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0]  // Only take the first file for simplicity
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('fullname', formData.fullname);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('avatar', formData.avatar); // Append file
      formDataToSend.append('coverImg', formData.coverImg); // Append file

      

      // Example: Send formDataToSend to backend using fetch or axios
      const response = await axios.post("http://localhost:5050/api/v1/users/register", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        navigate("/sign"); // Redirect to another page upon successful registration
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="pt-40 pb-5 h-screen bg-black overflow-auto">
      <div className="max-w-xl min-w-fit px-5 py-5 bg-gray-200 mx-auto rounded-lg">
        <h1 className="text-5xl font-bold text-center mb-3">Register</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              <label className="text-2xl self-center">UserName</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="p-2 rounded-md border border-gray-300"
                placeholder="Username"
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              <label className="text-2xl self-center">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="p-2 rounded-md border border-gray-300"
                placeholder="Email"
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              <label className="text-2xl self-center">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="p-2 rounded-md border border-gray-300"
                placeholder="Full Name"
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              <label className="text-2xl self-center">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="p-2 rounded-md border border-gray-300"
                placeholder="Password"
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              <label className="text-2xl self-center">Avatar</label>
              <input
                type="file"
                name="avatar"
                onChange={handleInputChange}
                className="p-2 rounded-md border border-gray-300"
                placeholder="Avatar"
                autoComplete="off"
                accept="image/*"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              <label className="text-2xl self-center">Cover Image</label>
              <input
                type="file"
                name="coverImg"
                onChange={handleInputChange}
                className="p-2 rounded-md border border-gray-300"
                placeholder="Cover Image"
                autoComplete="off"
                accept="image/*"
              />
            </div>
            <div>
              <Button type="submit" className="text-center w-full bg-black p-3 text-3xl rounded-lg mt-5 text-white">Submit</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
