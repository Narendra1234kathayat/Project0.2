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
      <div className="max-w-screen-2xl mx-auto py-10 ">
        <div className="my-24 text-5xl">Home
        </div>
        <button type="button" className="text-3xl bg-red-300 p-2 rounded-md " onClick={logout}>
          Button
        </button>
      </div>
    </>
  );
}

export default Home;
