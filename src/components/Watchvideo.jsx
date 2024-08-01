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
  const [comment, setComment] = useState("");
  const [updatecomment, setUpdatecomment] = useState(false);
  const [getcomments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: videos, status } = useSelector((state) => state.videos);
  const { data: search } = useSelector((state) => state.search);
  const { data } = useSelector((state) => state.user);

  const handlecommentchange = (e) => {
    setComment(e.target.value);
  };

  const handleEditCommentChange = (e) => {
    setEditCommentContent(e.target.value);
  };

  const getuserchannel = (name) => {
    navigate(`/channel/${name}`);
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(
          `https://backend-twff.onrender.com/api/v1/videos/${id}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setVideo(res.data.data);
          setLike(res.data.data.isLiked);
          setSubscription(res.data.data.owner.isSubscribed);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideo();
    getAllComment(); 
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
      const res = await axios.post(
        `https://backend-twff.onrender.com/api/v1/likes/${videoId}`,
        {},
        {
          withCredentials: true,
        }
      );
      setLike(res.data.data.isliked);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSubscribed = async (ownerId) => {
    try {
      const res = await axios.post(
        `https://backend-twff.onrender.com/api/v1/subscriptions/c/${ownerId}`,
        {},
        {
          withCredentials: true,
        }
      );
      setSubscription(res.data.data.subscribed);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllComment = async () => {
    try {
      const res = await axios.get(
        `https://backend-twff.onrender.com/api/v1/comment/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setComments(res.data.data.docs);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://backend-twff.onrender.com/api/v1/comment/${id}`,
        { content: comment },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setComments((prevComments) => [...prevComments, res.data.data]);
      }
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    try {
      console.log(editCommentId)
      const res = await axios.patch(
        `https://backend-twff.onrender.com/api/v1/comment/c/${editCommentId}`,
        { content: editCommentContent },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === editCommentId ? res.data.data : comment
          )
        );
        setEditCommentId(null);
        setEditCommentContent("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (status === Status.loading) {
    return <h1 className="pt-48 text-red-900 text-5xl">Loading...</h1>;
  }

  return (
    <div className="h-screen bg-black w-full overflow-auto">
      <div className="sm:mt-14 md:mt-24 text-white mt-10 lg:mt-20 mx-auto container lg:flex p-5">
        {video ? (
          <div className="w-full h-full">
            <div>
              <video
                src={`https://backend-twff.onrender.com/${video.videoFile}`}
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
                    src={`https://backend-twff.onrender.com/${video.owner?.avatar}`}
                    alt="Owner Avatar"
                  />
                  <h1 className="mt-3">
                    {video.owner?.username?.toUpperCase()}
                  </h1>
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
                  <h1 className="mx-2 p-2 rounded-md">
                    {video.views || 0} views
                  </h1>
                  <h2 className="p-2 rounded-md">
                    {video.owner?.subscribersCount || 0} subscribers
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex justify-between px-2 my-3">
              <div>
                <button
                  className={`py-1 px-4 rounded-lg me-2 ${
                    like ? "text-red-800" : ""
                  }`}
                  onClick={() => toggleLike(video._id)}
                >
                  {like ? "Liked" : "Like"}
                </button>
                <button className="py-1 px-4 rounded-lg me-2">Unlike</button>
              </div>
              <button
                className={`bg-red-800 font-bold py-1 px-4 rounded-lg me-2 ${
                  subscription ? "text-black" : "text-white"
                }`}
                onClick={() => toggleSubscribed(video.owner?._id)}
              >
                {subscription ? "Subscribed" : "Subscribe"}
              </button>
            </div>
            <div className="flex flex-col">
              <h1 className="py-5 text-blue-gray-800 bg-white font-bold ps-3">
                Comments
              </h1>
              <div className="rounded-sm relative">
                <form onSubmit={handleSubmitComment}>
                  <textarea
                    placeholder="Your comment"
                    className="w-full border-2 border-black p-2 text-black"
                    rows={3}
                    value={comment}
                    onChange={handlecommentchange}
                  />
                  <button
                    type="submit"
                    className="absolute bottom-0 right-1 bg-brown-200 p-2 rounded-md my-2 text-black"
                  >
                    Submit
                  </button>
                </form>
              </div>
              {getcomments.map((comm) => (
                <div className="w-full border-gray-100 border-y-2" key={comm._id}>
                  <div className="flex bg-black">
                    <img
                      src={`https://backend-twff.onrender.com/${comm.owner.avatar}`}
                      onClick={() => getuserchannel(comm.owner.username)}
                      className="h-9 w-9 my-auto rounded-full cursor-pointer"
                    />
                    <div className="p-2 my-2 text-white rounded-md w-full">
                      {editCommentId === comm._id ? (
                        <form onSubmit={handleUpdateComment}>
                          <textarea
                            value={editCommentContent}
                            onChange={handleEditCommentChange}
                            rows={3}
                            className="w-full border-2 border-black p-2 text-black"
                          />
                          <button
                            type="submit"
                            className="bg-brown-200 p-2 rounded-md my-2 text-black"
                          >
                            Update
                          </button>
                        </form>
                      ) : (
                        <>
                          <p>
                            {comm.content.length > 20
                              ? `${comm.content.slice(0, 20)}...`
                              : comm.content}
                          </p>
                          <small>
                            {new Date(comm.createdAt).toLocaleString()}
                          </small>
                        </>
                      )}
                    </div>
                    <div className="flex">
                      <i className="fa m-2 fa-thumbs-up flex-wrap" aria-hidden="true"></i>
                      <i className="fa m-2 fa-thumbs-down" aria-hidden="true"></i>
                    </div>
                    {data._id === comm.owner._id && !editCommentId && (
                      <i
                        className="fa mt-auto p-3 text-2xl fa-pencil-square cursor-pointer"
                        onClick={() => {
                          setEditCommentId(comm._id);
                          setEditCommentContent(comm.content);
                        }}
                        aria-hidden="true"
                      ></i>
                    )}
                    {editCommentId === comm._id && (
                      <i
                        className="fa mt-auto p-3 text-2xl fa-times cursor-pointer"
                        onClick={() => setEditCommentId(null)}
                        aria-hidden="true"
                      ></i>
                    )}
                  </div>
                </div>
              ))}
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
                  src={`https://backend-twff.onrender.com/${video.thumbnail}`}
                  className={`h-full w-full object-cover transition-opacity duration-500 bg-white ${
                    activeVideo === index ? "opacity-0" : "opacity-100"
                  }`}
                  alt="Video Thumbnail"
                />
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className={`h-full w-full rounded-lg absolute object-cover right-0 bottom-0 delay-300 top-0 left-0 transition-opacity duration-500 ${
                    activeVideo === index
                      ? "opacity-100 block"
                      : "opacity-0 hidden"
                  }`}
                  controls
                  loop
                  muted
                >
                  <source
                    src={`https://backend-twff.onrender.com/${video.videoFile}`}
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className="flex flex-shrink-0">
                <div>
                  <img
                    src={`https://backend-twff.onrender.com/${video?.useravatar}`}
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
