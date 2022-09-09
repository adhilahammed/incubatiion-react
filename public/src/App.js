import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./pages/Home";

import Register from "./pages/Register";
import 'react-toastify/dist/ReactToastify.css'
import UserHome from "./page/UserHome";
import UserLogin from "./page/UserLogin";
// import Token from "./store/tokenContext";
import Status from "./Components/Status/Status";
import Adminlogin from "./Components/AdminLogin/AdminLogin";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import ViewApp from "./Components/ViewApplication/ViewApplication";
import ManageRequest from "./Components/ManageRequest/ManageRequest";
import BookingSlots from "./Components/Slot/Slot";
import Token from "./store/tokenContext";


function App() {
  const userInfo = localStorage.getItem("token");
  return (
    <BrowserRouter>
   <Token>
    <Routes>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/login" element={<UserLogin/>}/>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/home" element={<UserHome />} />
      <Route path="/status" element={<Status />} />
      <Route path="/adminlogin" element={<Adminlogin />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/viewApplication" element={<ViewApp />} />
      <Route path="/manageRequest" element={<ManageRequest />} />
      <Route path="/slots" element={<BookingSlots />} />
    </Routes>
    </Token>
    </BrowserRouter>
  );
}

export default App;
