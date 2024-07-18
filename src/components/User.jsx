import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import History from "./History.jsx";
const User = () => {
    const [userdetail, setUserDetail] = useState(null);

    useEffect(() => {
        getUserdetail();
    }, []);

    const getUserdetail = async () => {
        try {
            const res = await axios.get("http://localhost:5050/api/v1/users/currentuser", {
                withCredentials: true
            });
            if (res.status === 200) {
                setUserDetail(res.data.data);
                console.log(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    return (
        <div className='pt-32  mx-auto container'>
            {userdetail ? (<>
                <div className='bg-white shadow-md rounded-lg overflow-hidden md:flex md:items-center mx-auto max-w-4xl'>
                    <img src={`http://localhost:5050/${userdetail.avatar}`} alt="User Avatar" className="h-32 w-32 mx-auto  md:h-auto md:w-32 md:rounded-l-lg object-cover" />
                    <div className="p-4 md:flex md:flex-col md:justify-between w-full">
                        <div className="mb-4 md:mb-0 md:mr-4">
                            <img src={`http://localhost:5050/${userdetail.coverImg}`} alt="User Cover Image" className="w-full h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{userdetail.fullname}</h2>
                            <p className="text-gray-600"><strong>Username:</strong> {userdetail.username}</p>
                            <p className="text-gray-600"><strong>Email:</strong> {userdetail.email}</p>
                            <p className="text-gray-600"><strong>Created At:</strong> {new Date(userdetail.createdAt).toLocaleString()}</p>
                            <p className="text-gray-600"><strong>Updated At:</strong> {new Date(userdetail.updatedAt).toLocaleString()}</p>
                        </div>
                        
                    </div>
                    
                </div>
                
                </>
            ) : (
                <p>Loading...</p>
            )}
            <div className='2xl:container'>
                <Link to="/history">
                <h1 className='sm:text-3xl my-2 text-red-500'>Your Watch history</h1></Link>
                </div>
                <div className='absolute'>
                <History/>
                </div>
        </div>
    );
};

export default User;
