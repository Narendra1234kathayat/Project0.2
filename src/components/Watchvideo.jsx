import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Status, fetchVideos } from "../Store/Slices/videoSlice";

const Watchvideo = () => {
  const [video, setVideo] = useState(null);
  const { id } = useParams();
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef([]);
  const [subscription, setSubscription] = useState(false);
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: videos, status } = useSelector((state) => state.videos);
  const { data: search } = useSelector((state) => state.search);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/v1/videos/${id}`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setVideo(res.data.data);
          console.log("fdsfa",res.data)
          setLike(res.data.data.isLiked);
          setSubscription(res.data.data.owner.isSubscribed);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideo();
    dispatch(fetchVideos(search));
  }, [id, dispatch, search]);

  const watchVideo = (id) => navigate(`/video/${id}`);

  const handleMouseEnter = (index) => {
    setActiveVideo(index);
    videoRefs.current[index].play();
  };

  const handleMouseLeave = () => {
    setActiveVideo(null);
    videoRefs.current.forEach((video) => video && video.pause());
  };

  const toggleLike = async (videoId) => {
    try {
      const res = await axios.post(`http://localhost:5050/api/v1/likes/${videoId}`, {}, {
        withCredentials: true,
      });
      setLike(res.data.data.isliked);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSubscribed = async (ownerId) => {
    try {
      const res = await axios.post(`http://localhost:5050/api/v1/subscriptions/c/${ownerId}`, {}, {
        withCredentials: true,
      });
      setSubscription(res.data.data.subscribed);
    } catch (error) {
      console.error(error);
    }
  };

  if (status === Status.loading) {
    return <h1 className="pt-48 text-red-900 text-5xl">Loading...</h1>;
  }

  return (
    <div className="h-screen bg-black w-full overflow-auto">
      <div className="sm:mt-14 md:mt-24 text-white lg:mt-20 mx-auto container lg:flex p-5">
        {video ? (
          <div className="w-full h-full">
            <div>
              <video
                src={`http://localhost:5050/${video.videoFile}`}
                className="overflow-auto rounded-md"
                controls
                autoPlay
              ></video>
            </div>
            <div className="flex my-2">
              <Link to={`/channel/${video.owner.username}`}>
                <div>
                  <img
                    className="h-9 w-9 rounded-full mx-2"
                    src={`http://localhost:5050/${video.owner?.avatar}`}
                    alt="Owner Avatar"
                  />
                  <h1 className="mt-3">{video.owner?.username?.toUpperCase()}</h1>
                </div>
              </Link>
              <div className="ms-2">
                <h1 className="font-bold">{video.title}</h1>
                <h1>
                  {video.description?.length > 100
                    ? `${video.description.substring(0, 100)}...`
                    : video.description}
                </h1>
                <div className="flex">
                  <h1 className="mx-2  p-2 rounded-md">{video.views || 0} views</h1>
                  <h2 className=" p-2 rounded-md">{video.owner?.subscribersCount || 0} subscribers</h2>
                </div>
              </div>
            </div>
            <div className="flex justify-between px-2 my-3">
              <div>
                <button
                  className={`py-1 px-4 rounded-lg me-2 ${like ? " text-red-800" : ""}`}
                  onClick={() => toggleLike(video._id)}
                >
                 {like ? "Liked":"Like"}
                </button>
                <button className=" py-1 px-4 rounded-lg me-2">Unlike</button>
              </div>
              <button
                className={`bg-red-800 font-bold py-1 px-4 rounded-lg me-2 ${subscription ? "text-black" : "text-white"}`}
                onClick={() => toggleSubscribed(video.owner?._id)}
              >
                {subscription ? "Subscribed" : "Subscribe"}
              </button>
            </div>
            <div className="flex flex-col">
              <h1 className="py-5 text-blue-gray-800 bg-white  font-bold ps-3">Comments </h1>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        <div className="video-panel ms-3 lg:ms-10 grid md:grid-cols-2 lg:grid-cols-1">
          {videos.map((video, index) => (
            <div
              key={video._id}
              onClick={() => watchVideo(video._id)}
              className="my-2 cursor-pointer md:mx-2"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative h-36 w-full">
                <img
                  src={`http://localhost:5050/${video.thumbnail}`}
                  className={`h-full w-full object-cover transition-opacity duration-500 ${activeVideo === index ? "opacity-0" : "opacity-100"}`}
                  alt="Video Thumbnail"
                />
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className={`h-full w-full rounded-lg absolute object-cover right-0 bottom-0 delay-300 top-0 left-0 transition-opacity duration-500 ${activeVideo === index ? "opacity-100 block" : "opacity-0 hidden"}`}
                  controls
                  loop
                  muted
                >
                  <source
                    src={`http://localhost:5050/${video.videoFile}`}
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className="flex flex-shrink-0">
                <div>
                  <img
                    src={`http://localhost:5050/${video?.useravatar}`}
                    className="p-2 w-14 rounded-full h-10"
                    alt="User Avatar"
                  />
                  <p>{video.owner?.username}</p>
                </div>
                <div>
                  <h1 className="desc font-bold">{video.title}</h1>
                  <p>
                    {video.description.slice(0, 40)}
                    {video.description?.length > 40 && "..."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watchvideo;
