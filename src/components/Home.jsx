import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Home() {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef({});
  const [videos, setVideos] = useState([]);
  
  // Use selector to get the search data
  const searchData = useSelector((state) => state.search.data);

  const handleMouseEnter = (index) => {
    setActiveVideo(index);
  };

  const handleMouseLeave = () => {
    setActiveVideo(null);
  };

  // useEffect(() => {
  //   Object.keys(videoRefs.current).forEach((key) => {
  //     const video = videoRefs.current[key];
  //     if (parseInt(key) === activeVideo) {
  //       video.currentTime = 0;
  //       video.play();
  //     } else {
  //       video.pause();
  //     }
  //   });
  // }, [activeVideo]);

  useEffect(() => {
    if (searchData !== undefined && searchData !== null && searchData !== "") {
      fetchData();
    } else {
      // Handle the case when searchData is empty (e.g., show default videos or clear the videos state)
      setVideos([]); // Clearing videos when searchData is empty
    }
  }, [searchData]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/v1/videos`, {
        params: { query: searchData },
        withCredentials: true,
      });
      if (res.data) {
        console.log("data",res.data.data);
        setVideos(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-blue-gray-200">
      <div className="max-w-screen-xl mx-auto p-2 pt-12 sm:pt-36 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:p-0 gap-3 ">
        {videos.map((video, index) => (
          <div
            key={video._id}
            className="my-2 cursor-pointer"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative h-64 w-full">
              <img
                src={`http://localhost:5050/${video.thumbnail}`}
                className={`h-full w-full object-cover transition-opacity duration-500 ${activeVideo === index ? "opacity-0" : "opacity-100"}`}
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
            <div className="flex flex-shrink-0">
              <div>
                <img
                  src={`http://localhost:5050/${video.useravatar}`}
                  className="p-2 w-14 rounded-full h-14"
                  alt="avatar"
                />
                <p>{video.username}</p>
              </div>
              <div>
                <h1 className="desc font-bold">{video.title}</h1>
                <p>{video.description.slice(0, 40)}{video.description.length > 40 && '...'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
