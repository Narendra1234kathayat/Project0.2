import axios from 'axios';
import React, { useState } from 'react'

const Uservideos = () => {
    const[videos,setVideos]=useState([]);

    const handlesetuserVideos=async(e)=>{
        e.preventDefault();
        try {
            const res=await axios.get()


        } catch (error) {
            
        }
    }

  return (
    <div>Uservideos</div>
  )
}

export default Uservideos