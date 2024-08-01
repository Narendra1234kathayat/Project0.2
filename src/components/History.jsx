import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addTodo, removeTodo } from "../Store/Slices/todoSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className="prev-arrow absolute top-1/2 transform -translate-y-1/2 left-1  bg-red-600 text-blue-gray-100 rounded-full px-4 py-2 z-10"
      onClick={onClick}
    >
      &lt;
    </button>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className="next-arrow absolute top-1/2 transform -translate-y-1/2 right-1 bg-red-600 text-blue-gray-100 rounded-full px-4 py-2 z-10"
      onClick={onClick}
    >
      &gt;
    </button>
  );
};

const History = () => {
  const [todo, setTodo] = useState("");
  const [watchhistory, setWatchhistory] = useState([]);
  const dispatch = useDispatch();
  // const todoo = useSelector((state) => state.todo.todos);
  const navigate = useNavigate();

  // const handletodo = (e) => {
  //   e.preventDefault();
  //   dispatch(addTodo(todo));
  //   setTodo("");
  // };

  const handleWatchHistory = (id) => {
    navigate(`/video/${id}`);
  };

  useEffect(() => {
    getWatchhistory();
  }, []);

  const getWatchhistory = async () => {
    try {
      const res = await axios.get("https://backend-twff.onrender.com/api/v1/users/watch-history", {
        withCredentials: true,
      });
      console.log(res.data.data);
      if (res.status === 200) {
        setWatchhistory(res.data.data);
      } else {
        setWatchhistory([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" 2xl:container mx-auto px-4  text-white">
      <h1 className="text-2xl my-2 font-bold">
        Watch history
      </h1>
      <Slider {...sliderSettings}>
        {watchhistory.map((video, index) => (
          <div
            key={index}
            className="p-2 group cursor-pointer px-2"
            onClick={() => handleWatchHistory(video._id)}
          >
            <div className="relative  h-52 pb-56.25% ">
              <img
                className="absolute inset-0 w-full h-full object-cover bg-white rounded-lg transition-opacity duration-300 group-hover:opacity-0"
                src={`https://backend-twff.onrender.com/${video.thumbnail}`}
                alt={video.title}
              />
              <video
                className="absolute inset-0 w-full h-full rounded-lg object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                controls
                loop
                muted
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => e.target.pause()}
              >
                <source src={`https://backend-twff.onrender.com/${video.videoFile}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-2 flex gap-2">
              <div>
                <img src={`https://backend-twff.onrender.com/${video.owner?.avatar}` } className="h-9 rounded-full" />
              </div>
              <div>
              <p className="font-semibold">{video.title}</p>
              <p className="text-sm text-gray-600">By: {video.owner?.fullname}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {/* <form onSubmit={handletodo} className="mt-8">
        <label className="text-2xl self-center">User Name</label>
        <textarea
          type="text"
          className="p-2 rounded-md border border-gray-300 w-full"
          placeholder="Username"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <input type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-md w-full" />
      </form>

      <div className="mt-8">
        <ul>
          {todoo.map((todo) => (
            <li key={todo.id} className="mb-2 flex items-center">
              <span>{todo.text}</span>
              <button
                className="ml-auto border-2 border-black rounded-md px-2 py-1"
                onClick={() => {
                  dispatch(removeTodo(todo.id));
                }}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default History;
