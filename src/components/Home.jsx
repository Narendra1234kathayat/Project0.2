import React, { useEffect, useRef, useState } from "react";

function Home() {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef({});

  const handleMouseEnter = (index) => {
    setActiveVideo(index);
  };

  const handleMouseLeave = () => {
    setActiveVideo(null);
  };

  useEffect(() => {
      

    Object.keys(videoRefs.current).forEach((key) => {
      const video = videoRefs.current[key];
      if (parseInt(key) === activeVideo) {
        video.currentTime = 0;
        video.play();
      } else {
        video.pause();
      }
    });
  }, [activeVideo]);

  const videos = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
  ];

  return (
    <div className="max-w-screen-xl mx-auto p-2 pt-12 sm:pt-36 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:p-0 gap-3">
      {videos.map((video, index) => (
        <div
          key={index}
          className="my-2 "
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative h-64 w-full">
            <img
              src="https://nikonrumors.com/wp-content/uploads/2014/09/Nikon-D750-sample-photo1.jpg"
              className={`h-full w-full object-cover transition-opacity duration-500  ${activeVideo === index ? "opacity-0" : "opacity-100"}`}
              alt=""
            />
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className={`h-full w-full rounded-lg absolute object-cover aspect-video right-0 bottom-0 delay-300 top-0 left-0 transition-opacity duration-500 ${activeVideo === index ? "opacity-100 block" : "opacity-0 hidden"}`}
              controls
              loop
              muted
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex flex-shrink-0">
            <img
              src="https://nikonrumors.com/wp-content/uploads/2014/09/Nikon-D750-sample-photo1.jpg"
              className="p-2 w-14 rounded-full h-14"
              alt="image"
            />
            <h1 className="desc font-bold p-1 py-3">title 1 let's gooo</h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
