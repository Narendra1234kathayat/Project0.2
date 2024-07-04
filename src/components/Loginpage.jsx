import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Loginpage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [formdata2,setFormData2]=useState({
    user:"",
    password:""
  })
   useEffect(()=>{
   

   },[]);

  const navigate = useNavigate();
  const changedata=(e)=> setFormData2({...formdata2,[e.target.value]:e.target.value });

  const change = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleregister = () => {
    localStorage.setItem("username", formData.username);
    localStorage.setItem("password", formData.password);
    navigate('/home');
  };

  return (
    <div className="py-32   mx-auto text-center bg-gray-400"> 
      <div className='w-fit mx-auto bg-green-50 py-6 px-8 my-10 rounded-xl'>
        <h1 className='font-extrabold text-5xl py-3 uppercase'> LOGIN /Signup</h1>
      <div className='Register my-6 '>
        <div className='flex justify-between items-center my-3 font-bold'>
        <label className=''>NAME</label>
        <input className='p-3' type='text' name="username" value={formData.username} onChange={change} />
        </div>
        <div className='flex content-center justify-between my-3 font-bold'>
        <label>Password</label>
        <input className='p-3' type='password' name="password" value={formData.password} onChange={change} />
        </div>
        <button type="button" className="btn bg-red-200 p-2 rounded-lg m-2 w-full" onClick={handleregister}>submit</button>
      </div>
      <div className='Regisyr my-3'>
       <div className='flex justify-between font-bold content-center my-3'>
       <label>User</label>
       <input type='text' className='p-3' name="user" onChange={changedata}  />
       </div>
       <div className='flex justify-between content-center font-bold my-3'>
       <label> Password</label>
       <input className='p-3' type='password' name="password" onChange={changedata} value />
       </div>
        <button  type="button" className="btn bg-green-500 p-2 rounded-lg text-center m-2 w-full">submit</button>
      </div>
      </div>
      
    </div>
  );
}

export default Loginpage;
