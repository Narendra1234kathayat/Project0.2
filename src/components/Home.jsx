import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/");
    }
  }, {});
  const logout = () => {
    localStorage.removeItem("username");
    if (!localStorage.getItem("username")) {
      navigate("/");
    }
  };
  return (
    <>
      <div className="max-w-screen-xl mx-auto pt-36 ">
        <div className=" text-5xl">Home
        </div>
        <button type="button" className="text-3xl bg-red-300 p-2 rounded-md " onClick={logout}>
          Button
        </button>
        
      </div>
    </>
  );
}

export default Home;
