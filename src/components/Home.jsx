import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { Status, fetchVideos } from "../Store/Slices/videoSlice.js";

function Home() {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef({});
  const dispatch = useDispatch();

  const searchData = useSelector((state) => state.search.data);
  const { data: videos, status } = useSelector((state) => state.videos);

  const handleMouseEnter = (index) => {
    setActiveVideo(index);
  };

  const handleMouseLeave = () => {
    setActiveVideo(null);
  };

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
    dispatch(fetchVideos());
  }, [dispatch, searchData]); // Add searchData to the dependency array

  const navigate = useNavigate();
  const WatchVideo = (id) => {
    if (id) {
      navigate(`/video/${id}`);
    }
  };

  if (status === Status.loading) {
    return <h1 className="flex pt-48 md:text-5xl justify-center text-red-900">Loading......</h1>;
  }

  return (
    <div className="bg-blue-gray-200 h-screen overflow-auto ">
      <ToastContainer />
      {videos.length === 0 ? (
        <div className=" text-red-600 h-screen text-center w-full pt-48 text-5xl ">
          <h1>No videos found..</h1>
        </div>
      ) : (
        <div className="max-w-screen-2xl mx-auto p-2 pt-12 sm:pt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:p-0 gap-2  ">
          {videos.map((video, index) => (
            <div
              key={video._id}
              onClick={() => WatchVideo(video._id)}
              className="my-1 cursor-pointer border-0 bg-blue-gray-50 rounded-md shadow-md"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative h-52 md:h-48 w-full">
                <img
                  src={`http://localhost:5050/${video.thumbnail}`}
                  className={`h-full w-full object-fill transition-opacity duration-500 ${activeVideo === index ? "opacity-0" : "opacity-100"}`}
                  alt=""
                />
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className={`h-full w-full rounded-lg absolute object-cover right-0 bottom-0 delay-300 top-0 left-0 transition-opacity duration-500 ${activeVideo === index ? "opacity-100 block" : "opacity-0 hidden"}`}
                  controls
                  loop
                  muted
                >
                  <source src={`http://localhost:5050/${video.videoFile}`} type="video/mp4" />
                </video>
              </div>
              <div className="flex flex-shrink-0 p-1">
                <div className="me-1">
                  <img
                    src={`http://localhost:5050/${video.useravatar}`}
                    className="p-2 w-14 rounded-full h-14"
                    alt="avatar"
                  />
                  <p className="my-2 text-sm font-light">{video.username.toUpperCase()}</p>
                </div>
                <div>
                  <h1 className="desc font-bold">{video.title}</h1>
                  <p>
                    {video.description.slice(0, 40)}
                    {video.description.length > 40 && '...'}
                  </p>
                  <p>{video.views} views</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
