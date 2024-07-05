import  Home  from "./components/Home.jsx";
import Loginpage from "./components/Loginpage.jsx";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Pages from "./components/Pages.jsx";
import Account from "./components/Account.jsx";
import Register from "./components/Register.jsx";
import Video from "./components/Video.jsx";

function App() {


  return (
    <>
    <BrowserRouter>
    <Nav/>
    <Routes>
      <Route path="/video" element={<Video/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign" element={<Loginpage/>}/>    
      <Route path="/pages" element={<Pages/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App
