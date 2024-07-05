import { Button } from "@material-tailwind/react";
import React from "react";

const Register = () => {
  return (
    <div className="pt-40 pb-5 h-screen bg-gray-300 overflow-auto">
    <div className="max-w-xl min-w-fit px-5 py-5 bg-gray-200 mx-auto rounded-lg">
      <h1 className="text-5xl font-bold text-center mb-3">Register</h1>
      <div className="flex flex-col">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
          <label className="text-2xl self-center">Name</label>
          <input
            type="text"
            className="p-2 rounded-md border border-gray-300"
            placeholder="Name"
            autocomplete="off"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
          <label className="text-2xl self-center">Email</label>
          <input
            type="email"
            className="p-2 rounded-md border border-gray-300"
            placeholder="Email"
            autocomplete="off"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
          <label className="text-2xl self-center">Full Name</label>
          <input
            type="text"
            className="p-2 rounded-md border border-gray-300"
            placeholder="Full Name"
            autocomplete="off"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
          <label className="text-2xl self-center">Password</label>
          <input
            type="password"
            className="p-2 rounded-md border border-gray-300"
            placeholder="Password"
            autocomplete="off"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
          <label className="text-2xl self-center">Avatar</label>
          <input
            type="file"
            className="p-2 rounded-md border border-gray-300"
            placeholder="Avatar"
            autocomplete="off"
            accept="image/*"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
          <label className="text-2xl self-center">Cover Image</label>
          <input
            type="file"
            className="p-2 rounded-md border border-gray-300"
            placeholder="Cover Image"
            autocomplete="off"
            accept="image/*"
          />
        </div>
        <div className="">
          <Button type="submit" className="text-center w-full bg-black p-3 text-3xl rounded-lg mt-5 text-white">Submit</Button>
        </div>
        
      </div>
    </div>
  </div>
  
  

  );
};

export default Register;
