import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import VerifyOtp from "./pages/auth/VerifyOtp";
import CatelogPage from "./pages/CatelogPage";
import SingleCoursePage from "./pages/SingleCoursePage";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/dashboard/MyProfile";
import Learning from "./components/core/dashboard/Learning";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-Inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/category/:catelogId" element={<CatelogPage />} />
        <Route path="/course/:courseId" element={<SingleCoursePage />} />
        <Route   element={<Dashboard/>} >
          <Route path='/dashboard/my-profile' element={<MyProfile/>}/>
          <Route path='/dashboard/my-learning' element={<Learning/>}/>
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
