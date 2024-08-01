import  Home  from "./components/Home.jsx";
import Loginpage from "./components/Loginpage.jsx";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Pages from "./components/Pages.jsx";
import Account from "./components/Account.jsx";
import Register from "./components/Register.jsx";

import Watchvideo from "./components/Watchvideo.jsx";
import Likedvideos from "./components/Likedvideos.jsx";
import Addvideos from "./components/Addvideos.jsx";
import User from "./components/User.jsx";
import History from "./components/History.jsx";
import WatchHistory from "./components/WatchHistory.jsx";
function App() {


  return (
    <>
    <BrowserRouter>
    <Nav/>
    <Routes>
      
      <Route path="/" element={<Home/>}/>
      <Route path="/sign" element={<Loginpage/>}/>    
      <Route path="/pages" element={<Pages/>}/>
      <Route path="/channel/:type" element={<Account/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/video/:id" element={<Watchvideo/>}/>
      <Route path="/liked_videos" element={<Likedvideos/>}/>
      <Route path="/add_videos" element={<Addvideos/>}/>
      <Route path="/user" element={<User/>}/>
 
      <Route path="/watch-history" element={<WatchHistory/>}/>
    </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App
