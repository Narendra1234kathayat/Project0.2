import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
const Likedvideos = () => {
    const [videos, setLikedVideos] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const videoRefs = useRef({});
    const navigate=useNavigate();

    const handleMouseEnter = (index) => {
        setActiveVideo(index);
    };

    const handleMouseLeave = () => {
        setActiveVideo(null);
    };

    const likedVideos = async () => {
        try {
            const res = await axios.get("https://backend-5h59.onrender.com/api/v1/likes/videos", {
                withCredentials: true,
                headers:{
                    Authorization:Cookies.get("accessToken")
                }
            });
            if (res.status === 200 && res.data?.data?.[0]?.likedVideo) {
                console.log(res.data.data);
                setLikedVideos(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        likedVideos();
    }, []);

    useEffect(() => {
        Object.keys(videoRefs.current).forEach((key) => {
            const video = videoRefs.current[key];
            if (video) {
                if (parseInt(key) === activeVideo) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        });
    }, [activeVideo]);

    const handleWatchVideo=(id)=>{
        console.log(id);
        navigate(`/video/${id}`)
        
    }

    return (
        <div className='bg-black h-screen pt-28 overflow-auto text-white'>
            <h1 className="text-3xl text-center mb-2">Your Liked videos</h1>
            <div className='container mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-2'>
                {videos.length > 0 && videos.map((video, index) => (
                    <div key={video.likedVideo._id} className='px-2 py-1'>
                        <div 
                            className='relative h-52'
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave()}
                            onClick={()=>handleWatchVideo(video.likedVideo._id)}
                        >
                            <img className={`h-full w-full absolute bg-white ${activeVideo === index ? "opacity-0":"opacity-100"}`} src={`https://backend-5h59.onrender.com/${video.likedVideo.thumbnail}`} alt="" />
                            <video
                                ref={(el) => (videoRefs.current[index] = el)}
                                className={`absolute h-full rounded-lg w-full object-cover z-0 ${activeVideo === index ? "opacity-100 block" : "opacity-0 hidden"}`}
                                controls
                                loop
                                muted
                            >
                                <source src={`https://backend-5h59.onrender.com/${video.likedVideo.videoFile}`} type="video/mp4" />
                            </video>
                        </div>
                        <div className='flex'>
                            <div className='flex flex-col mx-2'>
                                <img className='h-12 w-10  rounded-full py-2' src={`https://backend-5h59.onrender.com/${video.likedVideo.ownerDetails.avatar}`} />
                                <p className='text-sm'>{video.likedVideo.ownerDetails.username.toUpperCase()}</p>
                              

                            </div>
                        <div className='my-1'>
                        <h1 className='font-bold'>{video.likedVideo.title}</h1>
                        <p>{video.likedVideo.description.slice(0,40)}
                        {video.likedVideo.description.length >0 && "..."}
                        </p>
                            </div>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Likedvideos;
